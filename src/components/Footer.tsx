const Footer = () => (
  <footer className="py-8 border-t border-border bg-secondary/30">
    <div className="container text-center">
      <p className="font-heading text-lg font-bold text-foreground mb-1">
        Smile<span className="text-primary">Clinic</span>
      </p>
      <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} SmileClinic. All rights reserved.</p>
    </div>
  </footer>
);

export default Footer;
