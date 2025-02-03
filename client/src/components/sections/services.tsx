import { motion } from "framer-motion";
import { Calculator, TrendingUp, GraduationCap, FileText } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { GridPattern, CirclePattern } from "@/components/ui/background-patterns";

const services = [
  {
    icon: Calculator,
    title: "Accounting & Bookkeeping",
    description: "Comprehensive financial record-keeping and accounting services tailored to your business needs."
  },
  {
    icon: TrendingUp,
    title: "Business Consulting",
    description: "Strategic advice and guidance to help your business grow and optimize operations."
  },
  {
    icon: GraduationCap,
    title: "Training & Education",
    description: "Custom training programs to empower your team with financial knowledge and skills."
  },
  {
    icon: FileText,
    title: "Tax Planning",
    description: "Strategic tax planning and compliance services to optimize your financial position."
  }
];

export default function Services() {
  return (
    <section id="services" className="relative py-20 overflow-hidden">
      {/* Background Patterns */}
      <GridPattern className="opacity-50" />
      <CirclePattern className="opacity-30 rotate-45" />

      <div className="container relative mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">Our Services</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Comprehensive financial solutions designed to meet your business needs
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow backdrop-blur-sm bg-background/60">
                <CardHeader>
                  <service.icon className="h-12 w-12 text-primary mb-4" />
                  <CardTitle>{service.title}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}