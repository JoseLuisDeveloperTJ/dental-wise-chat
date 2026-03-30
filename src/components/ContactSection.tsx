import { motion } from "framer-motion";
import { MapPin, Clock, Phone, Mail } from "lucide-react";

const info = [
  { icon: MapPin, label: "Location", value: "Tijuana, Baja California, Mexico" },
  { icon: Clock, label: "Hours", value: "Monday – Saturday, 9:00 AM – 6:00 PM" },
  { icon: Phone, label: "Phone", value: "+52 (664) 123-4567" },
  { icon: Mail, label: "Email", value: "hello@smileclinic.mx" },
];

const ContactSection = () => (
  <section id="contact" className="py-24 bg-background">
    <div className="container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <p className="text-primary font-semibold uppercase tracking-wide text-sm mb-2">Get In Touch</p>
        <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground">Contact Us</h2>
      </motion.div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
        {info.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="bg-card rounded-xl p-6 border border-border shadow-card text-center"
          >
            <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center mx-auto mb-4">
              <item.icon className="w-5 h-5 text-primary" />
            </div>
            <p className="text-sm text-muted-foreground mb-1">{item.label}</p>
            <p className="text-sm font-medium text-card-foreground">{item.value}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ContactSection;
