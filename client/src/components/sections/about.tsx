import { motion } from "framer-motion";
import { Check } from "lucide-react";

export default function About() {
  const benefits = [
    "Over 15 years of industry experience",
    "Personalized service approach",
    "Expert team of certified professionals",
    "Modern accounting technology integration"
  ];

  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="relative aspect-square w-full max-w-xl mx-auto"
          >
            {/* Professional geometric pattern background */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl overflow-hidden">
              <div className="absolute inset-0">
                {/* Grid pattern representing spreadsheets */}
                <svg className="absolute w-full h-full" viewBox="0 0 100 100">
                  <defs>
                    <pattern id="grid" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
                      <path
                        d="M 10 0 L 0 0 0 10"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="0.5"
                        className="text-primary/10"
                      />
                    </pattern>
                  </defs>
                  <rect width="100" height="100" fill="url(#grid)" />
                </svg>

                {/* Growth chart elements */}
                <svg
                  className="absolute w-full h-full"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                >
                  {/* Ascending line chart */}
                  <path
                    d="M10,90 Q25,70 40,60 T70,40 T90,20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    className="text-primary/20"
                  />

                  {/* Circular progress indicators */}
                  {[25, 50, 75].map((pos, i) => (
                    <circle
                      key={i}
                      cx={pos}
                      cy={50}
                      r={5 - i}
                      className="fill-primary/10"
                    />
                  ))}
                </svg>

                {/* Decorative bar chart */}
                <div className="absolute bottom-8 left-8 right-8 h-32 flex items-end justify-around">
                  {[60, 80, 40, 90, 70].map((height, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      whileInView={{ height: `${height}%` }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      className="w-4 bg-primary/10 rounded-t"
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6">About Redorchid</h2>
            <p className="text-muted-foreground mb-6">
              Redorchid is a premier accounting firm dedicated to helping businesses
              achieve their financial goals through expert guidance and personalized
              service. We combine traditional accounting expertise with modern
              technology to deliver exceptional results.
            </p>

            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center space-x-3"
                >
                  <div className="bg-primary/10 p-1 rounded-full">
                    <Check className="h-5 w-5 text-primary" />
                  </div>
                  <span>{benefit}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}