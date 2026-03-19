import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Toaster } from "@/components/ui/sonner";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowRight,
  ChevronRight,
  Cpu,
  Globe,
  Loader2,
  Mail,
  MapPin,
  Network,
  Phone,
  TrendingUp,
} from "lucide-react";
import { motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useSubmitRequest } from "./hooks/useQueries";

// ── Animated section wrapper ──────────────────────────────────────────────────
function FadeUp({
  children,
  delay = 0,
  className = "",
}: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ── Nav ───────────────────────────────────────────────────────────────────────
const NAV_LINKS = [
  "HOME",
  "SERVICES",
  "STRATEGY",
  "INSIGHTS",
  "CAREERS",
  "CONTACT",
];

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("HOME");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (link: string) => {
    setActive(link);
    setMobileOpen(false);
    const id = link.toLowerCase();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[oklch(0.18_0.012_250/0.97)] backdrop-blur-md shadow-lg"
          : "bg-[oklch(0.18_0.012_250/0.85)] backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2.5 shrink-0">
          <div className="w-7 h-7 relative">
            <div className="absolute inset-0 bg-brand-blue rotate-45 rounded-sm opacity-80" />
            <div className="absolute inset-1 bg-brand-cyan rotate-45 rounded-sm opacity-60" />
          </div>
          <span className="font-display font-700 text-sm tracking-[0.18em] text-foreground uppercase">
            SYNAPSE ADVISORY
          </span>
        </div>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-7">
          {NAV_LINKS.map((link) => (
            <button
              type="button"
              key={link}
              data-ocid={`nav.${link.toLowerCase()}.link`}
              onClick={() => handleNav(link)}
              className={`text-xs tracking-[0.15em] font-body font-500 transition-colors relative pb-0.5 ${
                active === link
                  ? "text-foreground after:absolute after:bottom-0 after:left-0 after:right-0 after:h-px after:bg-brand-cyan"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {link}
            </button>
          ))}
        </nav>

        {/* CTA */}
        <Button
          data-ocid="header.consultation.button"
          onClick={() => handleNav("CONTACT")}
          className="hidden lg:flex bg-brand-blue hover:bg-[oklch(0.56_0.12_248)] text-white text-xs tracking-[0.12em] font-600 uppercase px-5 py-2 h-9 rounded-none"
        >
          GET CONSULTATION
        </Button>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="lg:hidden text-foreground p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          data-ocid="nav.mobile.toggle"
        >
          <div className="space-y-1.5">
            <span
              className={`block w-6 h-0.5 bg-current transition-transform ${mobileOpen ? "rotate-45 translate-y-2" : ""}`}
            />
            <span
              className={`block w-6 h-0.5 bg-current transition-opacity ${mobileOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block w-6 h-0.5 bg-current transition-transform ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`}
            />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-[oklch(0.18_0.012_250)] border-t border-brand-divider px-6 py-4 flex flex-col gap-4">
          {NAV_LINKS.map((link) => (
            <button
              type="button"
              key={link}
              onClick={() => handleNav(link)}
              className="text-xs tracking-[0.15em] text-left text-muted-foreground hover:text-foreground transition-colors"
            >
              {link}
            </button>
          ))}
          <Button
            onClick={() => handleNav("CONTACT")}
            className="bg-brand-blue text-white text-xs tracking-[0.12em] uppercase mt-2 rounded-none h-9"
          >
            GET CONSULTATION
          </Button>
        </div>
      )}
    </header>
  );
}

// ── Hero ──────────────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* BG image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/assets/generated/hero-bg.dim_1600x800.jpg')",
        }}
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-[oklch(0.12_0.015_250/0.82)]" />
      {/* Blue tint at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-background to-transparent" />

      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="inline-flex items-center gap-2 mb-8 border border-brand-blue/40 px-4 py-1.5 rounded-full"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-pulse" />
          <span className="text-brand-cyan text-xs tracking-[0.2em] font-body uppercase">
            Elite Global Consulting
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="font-display font-800 text-5xl sm:text-6xl lg:text-7xl xl:text-8xl leading-[1.0] tracking-tight uppercase text-white mb-6"
        >
          Strategic
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-cyan">
            Excellence.
          </span>
          <br />
          Elevating Future.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.55 }}
          className="text-[oklch(0.78_0.008_250)] text-lg font-body leading-relaxed max-w-2xl mx-auto mb-10"
        >
          Bridging strategy and execution — empowering businesses through
          actionable intelligence, digital innovation, and strategic
          connections.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.72 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button
            data-ocid="hero.discover.button"
            onClick={() =>
              document
                .getElementById("services")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="bg-brand-heroLight text-brand-heroDark hover:bg-white font-display font-700 text-sm tracking-[0.15em] uppercase px-8 py-3 h-auto rounded-none group"
          >
            DISCOVER OUR IMPACT
            <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Button>
          <Button
            data-ocid="hero.contact.button"
            variant="outline"
            onClick={() =>
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="border-white/30 text-white hover:bg-white/10 hover:border-white/60 font-display font-600 text-sm tracking-[0.12em] uppercase px-8 py-3 h-auto rounded-none"
          >
            Get Consultation
          </Button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.95 }}
          className="mt-20 grid grid-cols-3 gap-8 max-w-2xl mx-auto border-t border-white/10 pt-10"
        >
          {[
            { value: "$2.4B+", label: "Assets Advised" },
            { value: "180+", label: "Global Clients" },
            { value: "24", label: "Years Excellence" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-display font-800 text-2xl sm:text-3xl text-white">
                {stat.value}
              </div>
              <div className="text-xs tracking-[0.12em] text-[oklch(0.65_0.01_250)] uppercase mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <div className="w-px h-12 bg-gradient-to-b from-transparent to-brand-blue/60" />
        <div className="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-bounce" />
      </motion.div>
    </section>
  );
}

// ── Services ──────────────────────────────────────────────────────────────────
const SERVICES = [
  {
    icon: TrendingUp,
    title: "Strategy Consulting",
    desc: "Define bold, executable strategies that align your organization for long-term competitive advantage and market leadership.",
  },
  {
    icon: Network,
    title: "M&A Advisory",
    desc: "Navigate complex mergers and acquisitions with precision — from target identification and due diligence to seamless integration.",
  },
  {
    icon: Globe,
    title: "Capital Markets",
    desc: "Optimize capital structures, access global funding, and unlock value through expert financial engineering and market intelligence.",
  },
  {
    icon: Cpu,
    title: "Digital Innovation",
    desc: "Accelerate digital transformation with cutting-edge technology strategy, AI integration, and future-proof operating models.",
  },
];

function ServicesSection() {
  return (
    <section id="services" className="py-28 bg-[oklch(0.13_0.012_250)]">
      <div className="max-w-7xl mx-auto px-6">
        <FadeUp className="text-center mb-16">
          <p className="text-brand-cyan text-xs tracking-[0.25em] uppercase font-body mb-3">
            What We Do
          </p>
          <h2 className="font-display font-800 text-4xl lg:text-5xl uppercase tracking-tight text-foreground">
            Our Services
          </h2>
          <div className="w-12 h-0.5 bg-brand-blue mx-auto mt-5" />
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 border border-brand-divider">
          {SERVICES.map((svc, i) => (
            <FadeUp key={svc.title} delay={i * 0.1}>
              <div
                data-ocid={`services.item.${i + 1}`}
                className="group p-8 border-b md:border-b-0 lg:border-r border-brand-divider last:border-r-0 last:border-b-0 hover:bg-card transition-colors duration-300 flex flex-col gap-5"
              >
                <div className="w-12 h-12 border border-brand-blue/40 flex items-center justify-center group-hover:border-brand-cyan group-hover:bg-brand-blue/10 transition-all duration-300">
                  <svc.icon className="w-5 h-5 text-brand-blue group-hover:text-brand-cyan transition-colors" />
                </div>
                <div>
                  <h3 className="font-display font-700 text-sm tracking-wide uppercase text-foreground mb-3">
                    {svc.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {svc.desc}
                  </p>
                </div>
                <button
                  type="button"
                  data-ocid={`services.learn_more.${i + 1}.button`}
                  className="mt-auto flex items-center gap-1.5 text-brand-cyan text-xs tracking-[0.1em] uppercase font-body hover:gap-3 transition-all"
                >
                  Learn More <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── About ─────────────────────────────────────────────────────────────────────
function AboutSection() {
  return (
    <section id="strategy" className="py-28 bg-[oklch(0.11_0.012_250)]">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <FadeUp>
          <p className="text-brand-cyan text-xs tracking-[0.25em] uppercase font-body mb-4">
            ABOUT SYNAPSE ADVISORY
          </p>
          <h2 className="font-display font-800 text-4xl lg:text-5xl leading-tight text-foreground mb-6">
            Where Strategy
            <br />
            Meets Execution
          </h2>
          <div className="w-10 h-0.5 bg-brand-blue mb-8" />
          <p className="text-muted-foreground text-base leading-relaxed mb-6">
            Synapse Advisory is an elite consulting firm that bridges the
            critical gap between strategic vision and real-world execution.
            Founded on the belief that intelligence drives impact, we partner
            with C-suite leaders and organizations to transform complexity into
            clarity.
          </p>
          <p className="text-muted-foreground text-base leading-relaxed mb-10">
            Our multidisciplinary teams bring together deep sector expertise,
            data-driven methodologies, and a global network of relationships —
            delivering results that define industries and shape markets.
          </p>
          <div className="grid grid-cols-2 gap-6 mb-10">
            {[
              { label: "Countries", value: "40+" },
              { label: "Transactions", value: "600+" },
              { label: "Client Retention", value: "94%" },
              { label: "Expert Advisors", value: "200+" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="border-l-2 border-brand-blue pl-4"
              >
                <div className="font-display font-800 text-2xl text-foreground">
                  {stat.value}
                </div>
                <div className="text-muted-foreground text-xs tracking-widest uppercase mt-0.5">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
          <Button
            data-ocid="about.learn_more.button"
            className="bg-brand-blue hover:bg-[oklch(0.56_0.12_248)] text-white text-xs tracking-[0.12em] uppercase px-6 py-3 h-auto rounded-none font-display font-600"
          >
            OUR STORY <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </FadeUp>

        <FadeUp delay={0.15} className="relative">
          <div className="relative">
            <img
              src="/assets/generated/about-meeting.dim_700x500.jpg"
              alt="Synapse Advisory team meeting"
              className="w-full h-auto object-cover"
            />
            {/* Decorative corner accent */}
            <div className="absolute -top-3 -right-3 w-16 h-16 border-t-2 border-r-2 border-brand-cyan opacity-60" />
            <div className="absolute -bottom-3 -left-3 w-16 h-16 border-b-2 border-l-2 border-brand-blue opacity-60" />
            {/* Floating badge */}
            <div className="absolute bottom-6 left-6 bg-[oklch(0.13_0.012_250/0.9)] backdrop-blur-sm border border-brand-divider px-5 py-4">
              <div className="font-display font-800 text-2xl text-foreground">
                24+
              </div>
              <div className="text-xs tracking-widest text-muted-foreground uppercase">
                Years of Excellence
              </div>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

// ── Strategic Connections ─────────────────────────────────────────────────────
function StrategicSection() {
  return (
    <section id="insights" className="relative py-28 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('/assets/generated/world-map-network.dim_1200x600.jpg')",
        }}
      />
      <div className="absolute inset-0 bg-[oklch(0.10_0.015_250/0.88)]" />
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="max-w-xl">
          <FadeUp>
            <p className="text-brand-cyan text-xs tracking-[0.25em] uppercase font-body mb-4">
              STRATEGIC CONNECTIONS
            </p>
            <h2 className="font-display font-800 text-4xl lg:text-5xl leading-tight text-foreground mb-6">
              Global Reach.
              <br />
              Local Impact.
            </h2>
            <div className="w-10 h-0.5 bg-brand-blue mb-8" />
            <p className="text-[oklch(0.75_0.008_250)] text-base leading-relaxed mb-8">
              Our worldwide network of senior advisors, industry leaders, and
              institutional partners gives you access to intelligence and
              relationships that transcend borders — enabling decisions that
              create lasting competitive advantage.
            </p>
            <div className="grid grid-cols-3 gap-6">
              {[
                { city: "New York", role: "Americas HQ" },
                { city: "London", role: "EMEA HQ" },
                { city: "Singapore", role: "APAC HQ" },
              ].map((office) => (
                <div
                  key={office.city}
                  className="border border-brand-divider px-4 py-3 bg-[oklch(0.13_0.012_250/0.5)]"
                >
                  <div className="font-display font-700 text-sm text-foreground">
                    {office.city}
                  </div>
                  <div className="text-xs text-brand-cyan tracking-wide mt-0.5">
                    {office.role}
                  </div>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

// ── Partner Logos ─────────────────────────────────────────────────────────────
const PARTNERS = [
  { name: "MERIDIAN GROUP", abbr: "MG" },
  { name: "ATLAS CAPITAL", abbr: "AC" },
  { name: "VERICORE", abbr: "VC" },
  { name: "NEXUS PARTNERS", abbr: "NP" },
  { name: "PINNACLE CORP", abbr: "PC" },
  { name: "STRATOS IQ", abbr: "SI" },
];

function PartnersSection() {
  return (
    <section className="py-16 bg-[oklch(0.16_0.012_250)] border-y border-brand-divider">
      <div className="max-w-7xl mx-auto px-6">
        <FadeUp className="text-center mb-10">
          <p className="text-[oklch(0.55_0.008_250)] text-xs tracking-[0.25em] uppercase font-body">
            TRUSTED BY LEADING ORGANIZATIONS
          </p>
        </FadeUp>
        <FadeUp delay={0.1}>
          <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-16">
            {PARTNERS.map((p) => (
              <div
                key={p.name}
                className="flex items-center gap-2.5 opacity-30 hover:opacity-70 transition-opacity duration-300 cursor-default group"
              >
                <div className="w-7 h-7 border border-[oklch(0.55_0.008_250)] flex items-center justify-center text-[9px] font-display font-700 text-[oklch(0.65_0.008_250)] group-hover:border-brand-blue/50 group-hover:text-brand-blue/80 transition-colors">
                  {p.abbr}
                </div>
                <span className="font-display font-600 text-xs tracking-[0.15em] text-[oklch(0.65_0.008_250)] uppercase">
                  {p.name}
                </span>
              </div>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

// ── Contact Form ──────────────────────────────────────────────────────────────
function ContactSection() {
  const { mutate, isPending, isSuccess } = useSubmitRequest();
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    serviceInterest: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.serviceInterest) {
      toast.error("Please select a service interest.");
      return;
    }
    mutate(form, {
      onSuccess: () => {
        toast.success("Thank you! We'll be in touch shortly.");
        setForm({
          name: "",
          email: "",
          company: "",
          serviceInterest: "",
          message: "",
        });
      },
      onError: () => toast.error("Failed to send. Please try again."),
    });
  };

  return (
    <section id="contact" className="py-28 bg-[oklch(0.11_0.012_250)]">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Left info */}
        <FadeUp className="flex flex-col justify-center">
          <p className="text-brand-cyan text-xs tracking-[0.25em] uppercase font-body mb-4">
            GET IN TOUCH
          </p>
          <h2 className="font-display font-800 text-4xl lg:text-5xl text-foreground mb-6 leading-tight">
            Ready to Transform
            <br />
            Your Business?
          </h2>
          <div className="w-10 h-0.5 bg-brand-blue mb-8" />
          <p className="text-muted-foreground text-base leading-relaxed mb-10">
            Engage with our senior advisors for a complimentary strategic
            consultation. Discover how Synapse Advisory can accelerate your
            growth, sharpen your competitive edge, and unlock new pathways to
            value.
          </p>
          <div className="space-y-5">
            {[
              { icon: MapPin, label: "New York | London | Singapore" },
              { icon: Mail, label: "advisory@synapse-group.com" },
              { icon: Phone, label: "+1 (212) 555-0187" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-4">
                <div className="w-9 h-9 border border-brand-blue/40 flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4 text-brand-blue" />
                </div>
                <span className="text-[oklch(0.75_0.008_250)] text-sm">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </FadeUp>

        {/* Form */}
        <FadeUp delay={0.15}>
          <form
            onSubmit={handleSubmit}
            data-ocid="contact.modal"
            className="bg-card border border-brand-divider p-8 space-y-5"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <Label
                  htmlFor="name"
                  className="text-xs tracking-widest uppercase text-muted-foreground"
                >
                  Full Name *
                </Label>
                <Input
                  id="name"
                  required
                  data-ocid="contact.name.input"
                  value={form.name}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, name: e.target.value }))
                  }
                  placeholder="John Anderson"
                  className="bg-muted border-brand-divider text-foreground placeholder:text-[oklch(0.42_0.008_250)] focus:border-brand-blue rounded-none h-11"
                />
              </div>
              <div className="space-y-1.5">
                <Label
                  htmlFor="email"
                  className="text-xs tracking-widest uppercase text-muted-foreground"
                >
                  Email *
                </Label>
                <Input
                  id="email"
                  type="email"
                  required
                  data-ocid="contact.email.input"
                  value={form.email}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, email: e.target.value }))
                  }
                  placeholder="john@company.com"
                  className="bg-muted border-brand-divider text-foreground placeholder:text-[oklch(0.42_0.008_250)] focus:border-brand-blue rounded-none h-11"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label
                htmlFor="company"
                className="text-xs tracking-widest uppercase text-muted-foreground"
              >
                Company *
              </Label>
              <Input
                id="company"
                required
                data-ocid="contact.company.input"
                value={form.company}
                onChange={(e) =>
                  setForm((p) => ({ ...p, company: e.target.value }))
                }
                placeholder="Your Organization"
                className="bg-muted border-brand-divider text-foreground placeholder:text-[oklch(0.42_0.008_250)] focus:border-brand-blue rounded-none h-11"
              />
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs tracking-widest uppercase text-muted-foreground">
                Service Interest *
              </Label>
              <Select
                value={form.serviceInterest}
                onValueChange={(v) =>
                  setForm((p) => ({ ...p, serviceInterest: v }))
                }
              >
                <SelectTrigger
                  data-ocid="contact.service.select"
                  className="bg-muted border-brand-divider text-foreground rounded-none h-11 focus:border-brand-blue"
                >
                  <SelectValue placeholder="Select a service" />
                </SelectTrigger>
                <SelectContent className="bg-popover border-brand-divider rounded-none">
                  <SelectItem value="Strategy Consulting">
                    Strategy Consulting
                  </SelectItem>
                  <SelectItem value="M&A Advisory">M&A Advisory</SelectItem>
                  <SelectItem value="Capital Markets">
                    Capital Markets
                  </SelectItem>
                  <SelectItem value="Digital Innovation">
                    Digital Innovation
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label
                htmlFor="message"
                className="text-xs tracking-widests uppercase text-muted-foreground"
              >
                Message
              </Label>
              <Textarea
                id="message"
                data-ocid="contact.message.textarea"
                value={form.message}
                onChange={(e) =>
                  setForm((p) => ({ ...p, message: e.target.value }))
                }
                placeholder="Tell us about your strategic objectives..."
                rows={4}
                className="bg-muted border-brand-divider text-foreground placeholder:text-[oklch(0.42_0.008_250)] focus:border-brand-blue rounded-none resize-none"
              />
            </div>

            <Button
              type="submit"
              disabled={isPending}
              data-ocid="contact.submit.button"
              className="w-full bg-brand-blue hover:bg-[oklch(0.56_0.12_248)] text-white font-display font-700 text-sm tracking-[0.15em] uppercase py-3 h-auto rounded-none"
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                  SENDING...
                </>
              ) : isSuccess ? (
                "MESSAGE SENT ✓"
              ) : (
                "SEND MESSAGE"
              )}
            </Button>
          </form>
        </FadeUp>
      </div>
    </section>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────────
function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined"
      ? window.location.hostname
      : "synapse-advisory";

  return (
    <footer className="bg-[oklch(0.10_0.012_250)] border-t border-brand-divider">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Logo + tagline */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-6 h-6 relative">
                <div className="absolute inset-0 bg-brand-blue rotate-45 rounded-sm opacity-80" />
                <div className="absolute inset-1 bg-brand-cyan rotate-45 rounded-sm opacity-60" />
              </div>
              <span className="font-display font-700 text-xs tracking-[0.15em] text-foreground uppercase">
                SYNAPSE ADVISORY
              </span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              Elite consulting bridging strategy and execution for global market
              leaders.
            </p>
            <div className="flex gap-3">
              {["in", "tw", "fb"].map((s) => (
                <div
                  key={s}
                  className="w-7 h-7 border border-brand-divider flex items-center justify-center hover:border-brand-blue/60 hover:text-brand-cyan transition-colors cursor-pointer"
                >
                  <span className="text-[9px] text-muted-foreground uppercase">
                    {s}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Links col 1 */}
          <div>
            <h4 className="font-display font-700 text-xs tracking-[0.2em] uppercase text-foreground mb-5">
              Company
            </h4>
            <ul className="space-y-3">
              {["Home", "About Us", "Our Team", "Careers", "Press"].map(
                (link) => (
                  <li key={link}>
                    <button
                      type="button"
                      className="text-muted-foreground text-sm hover:text-foreground transition-colors cursor-pointer bg-transparent border-0 p-0"
                    >
                      {link}
                    </button>
                  </li>
                ),
              )}
            </ul>
          </div>

          {/* Links col 2 */}
          <div>
            <h4 className="font-display font-700 text-xs tracking-[0.2em] uppercase text-foreground mb-5">
              Services
            </h4>
            <ul className="space-y-3">
              {[
                "Strategy Consulting",
                "M&A Advisory",
                "Capital Markets",
                "Digital Innovation",
                "Risk Management",
              ].map((link) => (
                <li key={link}>
                  <button
                    type="button"
                    className="text-muted-foreground text-sm hover:text-foreground transition-colors cursor-pointer bg-transparent border-0 p-0"
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-700 text-xs tracking-[0.2em] uppercase text-foreground mb-5">
              Global Offices
            </h4>
            <div className="space-y-4">
              {[
                { city: "New York", detail: "399 Park Ave, 10022" },
                { city: "London", detail: "1 Canada Square, E14" },
                { city: "Singapore", detail: "1 Raffles Place, 048616" },
              ].map((o) => (
                <div key={o.city}>
                  <div className="text-foreground text-xs font-display font-600 tracking-wide">
                    {o.city}
                  </div>
                  <div className="text-muted-foreground text-xs mt-0.5">
                    {o.detail}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-brand-divider pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-[oklch(0.45_0.008_250)] text-xs">
            © {year} Synapse Advisory. All rights reserved.
          </p>
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[oklch(0.45_0.008_250)] text-xs hover:text-muted-foreground transition-colors"
          >
            Built with ♥ using caffeine.ai
          </a>
        </div>
      </div>
    </footer>
  );
}

// ── App ───────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div className="min-h-screen bg-background">
      <Toaster position="top-right" theme="dark" />
      <Header />
      <main>
        <HeroSection />
        <ServicesSection />
        <AboutSection />
        <StrategicSection />
        <PartnersSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
