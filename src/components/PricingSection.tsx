import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Basic Care",
    price: "$50",
    period: "per visit",
    features: ["Professional cleaning", "Dental exam", "X-rays if needed", "Oral health report"],
    highlighted: false,
  },
  {
    name: "Smile Package",
    price: "$120",
    period: "per session",
    features: ["Teeth whitening", "Professional cleaning", "Custom tray fitting", "Touch-up kit included"],
    highlighted: true,
  },
  {
    name: "Ortho Consult",
    price: "$30",
    period: "initial visit",
    features: ["Full examination", "Treatment plan", "Cost estimate", "Follow-up included"],
    highlighted: false,
  },
];

const PricingSection = () => (
  <section id="pricing" className="py-24 bg-secondary/50">
    <div className="container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <p className="text-primary font-semibold uppercase tracking-wide text-sm mb-2">Transparent Pricing</p>
        <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground">Simple, Honest Prices</h2>
      </motion.div>
      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {plans.map((plan, i) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className={`rounded-xl p-8 border transition-shadow ${
              plan.highlighted
                ? "bg-primary text-primary-foreground border-primary shadow-lg scale-105"
                : "bg-card text-card-foreground border-border shadow-card hover:shadow-card-hover"
            }`}
          >
            <h3 className="font-heading text-xl font-semibold mb-2">{plan.name}</h3>
            <div className="mb-6">
              <span className="text-4xl font-bold">{plan.price}</span>
              <span className={`text-sm ml-1 ${plan.highlighted ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                {plan.period}
              </span>
            </div>
            <ul className="space-y-3 mb-8">
              {plan.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
            <Button
              variant={plan.highlighted ? "secondary" : "default"}
              className="w-full"
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            >
              Get Started
            </Button>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default PricingSection;
