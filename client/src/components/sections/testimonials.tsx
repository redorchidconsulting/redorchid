import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { WavePattern } from "@/components/ui/background-patterns";
import { Users, Award, Building2, TrendingUp } from "lucide-react";

const metrics = [
  {
    icon: Award,
    stat: "15+",
    label: "Years of Excellence",
    description: "Providing expert financial guidance since 2010"
  },
  {
    icon: Users,
    stat: "500+",
    label: "Clients Served",
    description: "Trusted by businesses across multiple industries"
  },
  {
    icon: Building2,
    stat: "12",
    label: "Industry Specializations",
    description: "Deep expertise in diverse business sectors"
  },
  {
    icon: TrendingUp,
    stat: "98%",
    label: "Client Retention",
    description: "Long-term partnerships built on trust"
  }
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="relative py-20 overflow-hidden">
      <WavePattern className="opacity-30" />

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">Our Impact</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Delivering measurable results and building lasting partnerships
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {metrics.map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full bg-background/60 backdrop-blur-sm">
                <CardContent className="pt-6 text-center">
                  <div className="mb-4 inline-flex p-3 bg-primary/10 rounded-full">
                    <metric.icon className="h-6 w-6 text-primary" />
                  </div>
                  <motion.div
                    initial={{ scale: 0.5 }}
                    whileInView={{ scale: 1 }}
                    transition={{ 
                      type: "spring",
                      stiffness: 200,
                      damping: 10,
                      delay: index * 0.1 
                    }}
                    viewport={{ once: true }}
                    className="text-3xl font-bold mb-2"
                  >
                    {metric.stat}
                  </motion.div>
                  <h3 className="text-lg font-semibold mb-2">{metric.label}</h3>
                  <p className="text-sm text-muted-foreground">{metric.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}