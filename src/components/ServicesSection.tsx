import { motion } from "framer-motion";
import { Sparkles, SmilePlus, AlignVerticalSpaceAround } from "lucide-react";

const services = [
  {
    icon: Sparkles,
    title: "Dental Cleaning",
    description: "Professional cleaning to remove plaque and tartar, keeping your teeth healthy and bright.",
    price: "$50",
  },
  {
    icon: SmilePlus,
    title: "Teeth Whitening",
    description: "Advanced whitening treatments that deliver visible results in just one session.",
    price: "$120",
  },
  {
    icon: AlignVerticalSpaceAround,
    title: "Braces Consultation",
    description: "Personalized orthodontic evaluation with a treatment plan tailored to your needs.",
    price: "$30",
  },
];

const ServicesSection = () => (
  <section id="services" className="py-24 bg-background">
    <div className="container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <p className="text-primary font-semibold uppercase tracking-wide text-sm mb-2">What We Offer</p>
        <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground">Our Services</h2>
      </motion.div>
      <div className="grid md:grid-cols-3 gap-8">
        {services.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className="bg-card rounded-xl p-8 shadow-card hover:shadow-card-hover transition-shadow border border-border"
          >
            <div className="w-12 h-12 rounded-lg bg-accent flex items-center justify-center mb-6">
              <s.icon className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-heading text-xl font-semibold text-card-foreground mb-3">{s.title}</h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">{s.description}</p>
            <p className="text-2xl font-bold text-primary">{s.price}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ServicesSection;
