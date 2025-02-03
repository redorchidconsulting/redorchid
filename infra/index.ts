import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

// Configuration
const config = new pulumi.Config();
const projectName = "redorchid";
const environment = pulumi.getStack();

// Create an S3 bucket for the website content
const websiteBucket = new aws.s3.Bucket(`${projectName}-${environment}`, {
    website: {
        indexDocument: "index.html",
        errorDocument: "index.html",
    },
    forceDestroy: true,
    tags: {
        Name: `${projectName}`,
    },
});

// Create an Origin Access Identity for CloudFront
const originAccessIdentity = new aws.cloudfront.OriginAccessIdentity(`${projectName}-${environment}-oai`);

// Create a bucket policy to allow CloudFront to access the S3 bucket
const bucketPolicy = new aws.s3.BucketPolicy(`${projectName}-${environment}-policy`, {
    bucket: websiteBucket.id,
    policy: pulumi.all([websiteBucket.arn, originAccessIdentity.iamArn]).apply(([bucketArn, oaiArn]) =>
        JSON.stringify({
            Version: "2012-10-17",
            Statement: [{
                Effect: "Allow",
                Principal: {
                    AWS: oaiArn
                },
                Action: ["s3:GetObject"],
                Resource: [`${bucketArn}/*`]
            }]
        })
    )
});

// Create CloudFront distribution
const cdn = new aws.cloudfront.Distribution(`${projectName}-${environment}-cdn`, {
    enabled: true,
    defaultRootObject: "index.html",
    origins: [{
        originId: websiteBucket.arn,
        domainName: websiteBucket.bucketRegionalDomainName,
        s3OriginConfig: {
            originAccessIdentity: originAccessIdentity.cloudfrontAccessIdentityPath,
        },
    }],
    defaultCacheBehavior: {
        targetOriginId: websiteBucket.arn,
        viewerProtocolPolicy: "redirect-to-https",
        allowedMethods: ["GET", "HEAD", "OPTIONS"],
        cachedMethods: ["GET", "HEAD", "OPTIONS"],
        forwardedValues: {
            queryString: false,
            cookies: {
                forward: "none",
            },
        },
        minTtl: 0,
        defaultTtl: 3600,
        maxTtl: 86400,
    },
    restrictions: {
        geoRestriction: {
            restrictionType: "none",
        },
    },
    viewerCertificate: {
        cloudfrontDefaultCertificate: true,
    },
    customErrorResponses: [{
        errorCode: 404,
        responseCode: 200,
        responsePagePath: "/index.html",
    }],
    tags: {
        Name: `${projectName}`,
    },
});

// // Create secrets for API keys and email
// const resendApiKey = new aws.secretsmanager.Secret(`resend-key`, {tags: {Name: `${projectName}`}});
// const recipientEmail = new aws.secretsmanager.Secret(`${projectName}-${environment}-recipient-email`, {tags: {Name: `${projectName}`}});

// // Store the secret values
// const resendApiKeyVersion = new aws.secretsmanager.SecretVersion(`resend-key-val`, {
//     secretId: resendApiKey.id,
//     secretString: config.requireSecret("resendApiKey"),
// });

// const recipientEmailVersion = new aws.secretsmanager.SecretVersion(`${projectName}-recipient-email-val`, {
//     secretId: recipientEmail.id,
//     secretString: config.requireSecret("recipientEmail"),
// });

// // Create Lambda role with permissions
// const lambdaRole = new aws.iam.Role(`${projectName}-${environment}-lambda-role`, {
//     assumeRolePolicy: JSON.stringify({
//         Version: "2012-10-17",
//         Statement: [{
//             Action: "sts:AssumeRole",
//             Effect: "Allow",
//             Principal: {
//                 Service: "lambda.amazonaws.com",
//             },
//         }],
//     }),
//     tags: { Name: `${projectName}` },
// });

// // Custom policy for Secrets Manager access
// const lambdaCustomPolicy = new aws.iam.RolePolicy(`${projectName}-${environment}-lambda-custom-policy`, {
//     role: lambdaRole.name,
//     policy: pulumi.all([resendApiKey.arn, recipientEmail.arn])
//         .apply(([resendKeyArn, recipientEmailArn]) => JSON.stringify({
//             Version: "2012-10-17",
//             Statement: [
//                 {
//                     Effect: "Allow",
//                     Action: [
//                         "secretsmanager:GetSecretValue"
//                     ],
//                     Resource: [resendKeyArn, recipientEmailArn],
//                 }
//             ],
//         })),
// });

// // Attach basic Lambda execution policy
// const lambdaRolePolicy = new aws.iam.RolePolicyAttachment(`${projectName}-${environment}-lambda-policy`, {
//     role: lambdaRole.name,
//     policyArn: "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
// });

// // Create Lambda function
// const apiLambda = new aws.lambda.Function(`${projectName}-${environment}-api`, {
//     runtime: "nodejs18.x",
//     handler: "index.handler",
//     role: lambdaRole.arn,
//     code: new pulumi.asset.AssetArchive({
//         ".": new pulumi.asset.FileArchive("./api"),
//     }),
//     timeout: 30,
//     memorySize: 128,
//     environment: {
//         variables: {
//             RESEND_API_KEY_SECRET_ID: resendApiKey.id,
//             RECIPIENT_EMAIL_SECRET_ID: recipientEmail.id,
//         },
//     },
//     tags: { Name: `${projectName}` },
// });

// // Create API Gateway REST API
// const restApi = new aws.apigateway.RestApi(`${projectName}-${environment}-rest-api`, {
//     endpointConfiguration: {
//         types: "REGIONAL",
//     },
//     tags: { Name: `${projectName}` },
// });

// // Create API Gateway resource and method
// const apiResource = new aws.apigateway.Resource(`${projectName}-${environment}-resource`, {
//     restApi: restApi.id,
//     parentId: restApi.rootResourceId,
//     pathPart: "contact",
// });

// const apiMethod = new aws.apigateway.Method(`${projectName}-${environment}-method`, {
//     restApi: restApi.id,
//     resourceId: apiResource.id,
//     httpMethod: "POST",
//     authorization: "NONE",
// });

// // Create API Gateway integration with Lambda
// const apiIntegration = new aws.apigateway.Integration(`${projectName}-${environment}-integration`, {
//     restApi: restApi.id,
//     resourceId: apiResource.id,
//     httpMethod: apiMethod.httpMethod,
//     integrationHttpMethod: "POST",
//     type: "AWS_PROXY",
//     uri: apiLambda.invokeArn,
// });

// // Create CORS options method
// const corsMethod = new aws.apigateway.Method(`${projectName}-${environment}-cors`, {
//     restApi: restApi.id,
//     resourceId: apiResource.id,
//     httpMethod: "OPTIONS",
//     authorization: "NONE",
// });

// const corsIntegration = new aws.apigateway.Integration(`${projectName}-${environment}-cors-integration`, {
//     restApi: restApi.id,
//     resourceId: apiResource.id,
//     httpMethod: corsMethod.httpMethod,
//     type: "MOCK",
//     requestTemplates: {
//         "application/json": `{"statusCode": 200}`,
//     },
// });

// // Create method response for CORS
// const corsMethodResponse = new aws.apigateway.MethodResponse(`${projectName}-${environment}-cors-response`, {
//     restApi: restApi.id,
//     resourceId: apiResource.id,
//     httpMethod: corsMethod.httpMethod,
//     statusCode: "200",
//     responseParameters: {
//         "method.response.header.Access-Control-Allow-Headers": true,
//         "method.response.header.Access-Control-Allow-Methods": true,
//         "method.response.header.Access-Control-Allow-Origin": true,
//     },
// });

// // Create integration response for CORS
// const corsIntegrationResponse = new aws.apigateway.IntegrationResponse(`${projectName}-${environment}-cors-integration-response`, {
//     restApi: restApi.id,
//     resourceId: apiResource.id,
//     httpMethod: corsMethod.httpMethod,
//     statusCode: corsMethodResponse.statusCode,
//     responseParameters: {
//         "method.response.header.Access-Control-Allow-Headers": "'Content-Type,Authorization'",
//         "method.response.header.Access-Control-Allow-Methods": "'OPTIONS,POST'",
//         "method.response.header.Access-Control-Allow-Origin": "'*'", // Restrict in production
//     },
// });

// // Create API Gateway deployment
// const deployment = new aws.apigateway.Deployment(`${projectName}-${environment}-deployment`, {
//     restApi: restApi.id,
// }, {dependsOn: [apiIntegration, corsIntegration]});

// // Create API Gateway stage
// const stage = new aws.apigateway.Stage(`${projectName}-${environment}-stage`, {
//     deployment: deployment.id,
//     restApi: restApi.id,
//     stageName: environment,
//     tags: { Name: `${projectName}` },
// });

// // Create usage plan with throttling
// const usagePlan = new aws.apigateway.UsagePlan(`${projectName}-${environment}-usage-plan`, {
//     description: "Usage plan for contact form API",
//     apiStages: [{
//         apiId: restApi.id,
//         stage: stage.stageName,
//     }],
//     throttleSettings: {
//         burstLimit: 5,
//         rateLimit: 10,
//     },
//     quotaSettings: {
//         limit: 50,
//         period: "DAY",
//     },
//     tags: { Name: `${projectName}` },
// });

// // Grant Lambda permission to be invoked by API Gateway
// const lambdaPermission = new aws.lambda.Permission(`${projectName}-${environment}-lambda-permission`, {
//     action: "lambda:InvokeFunction",
//     function: apiLambda.name,
//     principal: "apigateway.amazonaws.com",
//     sourceArn: pulumi.interpolate`${restApi.executionArn}/*/*`,
// });

// Exports
export const websiteUrl = cdn.domainName;
// export const apiUrl = pulumi.interpolate`${stage.invokeUrl}/contact`;