const { SecretsManager } = require('aws-sdk');
const { Resend } = require('resend');

const secretsManager = new SecretsManager();

async function getSecret(secretId) {
    const data = await secretsManager.getSecretValue({ SecretId: secretId }).promise();
    return data.SecretString;
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

function sanitizeInput(str) {
    return str.replace(/<[^>]*>?/gm, '');
}

exports.handler = async (event) => {
    try {
        const body = JSON.parse(event.body);
        const { name, email, phone, message } = body;

        // Validation
        if (!name || !email || !message) {
            return {
                statusCode: 400,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: 'Name, email, and message are required',
                }),
            };
        }

        if (!validateEmail(email)) {
            return {
                statusCode: 400,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: 'Invalid email format',
                }),
            };
        }

        // Spam prevention
        const sanitizedMessage = sanitizeInput(message);
        if (sanitizedMessage.includes('http') || sanitizedMessage.includes('www')) {
            return {
                statusCode: 400,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: 'Links are not allowed in messages',
                }),
            };
        }

        // Get secrets
        const resendApiKey = await getSecret(process.env.RESEND_API_KEY_SECRET_ID);
        const recipientEmail = await getSecret(process.env.RECIPIENT_EMAIL_SECRET_ID);

        // Initialize Resend
        const resend = new Resend(resendApiKey);

        // Send email
        await resend.emails.send({
            from: 'RedOrchid <contact@redorchid.com>',
            to: recipientEmail,
            subject: `New Contact Form Submission from ${sanitizeInput(name)}`,
            html: `
                <h2>New Contact Form Submission</h2>
                <p><strong>Name:</strong> ${sanitizeInput(name)}</p>
                <p><strong>Email:</strong> ${sanitizeInput(email)}</p>
                <p><strong>Phone:</strong> ${sanitizeInput(phone || 'Not provided')}</p>
                <h3>Message:</h3>
                <p>${sanitizedMessage}</p>
            `,
        });

        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',  // Restrict in production
            },
            body: JSON.stringify({
                message: 'Message sent successfully',
            }),
        };
    } catch (error) {
        console.error('Contact form error:', error);
        return {
            statusCode: 500,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',  // Restrict in production
            },
            body: JSON.stringify({
                message: 'Failed to send message',
            }),
        };
    }
};