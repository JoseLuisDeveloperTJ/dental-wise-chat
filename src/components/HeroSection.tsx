import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-accent via-background to-secondary" />
      <div className="absolute top-20 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      
      <div className="container relative z-10 py-20">
        <div className="max-w-2xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-primary font-semibold mb-4 tracking-wide uppercase text-sm"
          >
            Dental Care in Tijuana
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-foreground mb-6"
          >
            Your Smile,{" "}
            <span className="text-primary">Our Passion</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed"
          >
            Experience world-class dental care at affordable prices. From routine cleanings to advanced treatments, we're here for every smile.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap gap-4"
          >
            <Button variant="hero" size="lg" onClick={scrollToContact}>
              Book Appointment
            </Button>
            <Button variant="outline" size="lg" onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}>
              Our Services
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
