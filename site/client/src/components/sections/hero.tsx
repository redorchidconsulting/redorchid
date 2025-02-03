import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { ButtonScroll } from "@/components/ui/button-scroll";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-16">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1497366754035-f200968a6e72')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.1
        }}
      />

      <div className="container mx-auto px-4 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
            Expert Accounting Services for Your Success
          </h1>
          <p className="text-xl mb-8 text-muted-foreground">
            Redorchid provides bespoke accounting solutions, consulting, and training to help your business flourish.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <ButtonScroll
              targetId="services"
              className="text-lg px-8 py-6"
            >
              Explore Our Services
              <ArrowRight className="ml-2 h-5 w-5" />
            </ButtonScroll>
            <ButtonScroll
              targetId="contact"
              variant="outline"
              className="text-lg px-8 py-6"
            >
              Get in Touch
            </ButtonScroll>
          </div>
        </motion.div>
      </div>
    </section>
  );
}