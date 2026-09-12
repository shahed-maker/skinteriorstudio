import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState, type FormEvent, type PointerEvent } from "react";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Facebook,
  Instagram,
  Mail,
  Menu,
  MessageCircle,
  Phone,
  Play,
  Quote,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SK Interior Studio | Interior Design Bangladesh" },
      { name: "description", content: "Premium residential and commercial interior design, custom furniture, and turnkey interior solutions in Bangladesh." },
      { property: "og:title", content: "SK Interior Studio | Spaces Designed to Feel Like Yours" },
      { property: "og:description", content: "Modern, thoughtful interior design and build services in Bangladesh." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const services = [
  ["01", "Residential Interiors", "Homes shaped around the rhythms, rituals and character of the people living in them."],
  ["02", "Commercial Interiors", "Distinctive workspaces and customer environments built around brand and purpose."],
  ["03", "Living Spaces", "Layered, inviting living rooms that balance comfort with quiet sophistication."],
  ["04", "Kitchen & Wardrobe", "Highly considered storage, fitted joinery and refined everyday functionality."],
  ["05", "Custom Furniture", "Purpose-made pieces designed for the exact proportions and material language of your space."],
  ["06", "Turnkey Interior Solutions", "One cohesive journey from first conversation through construction and final styling."],
];

const process = [
  ["01", "Discover", "We listen closely to your needs, lifestyle and ambitions."],
  ["02", "Concept", "A clear creative direction gives the project its identity."],
  ["03", "Design", "Plans, palettes and spatial ideas bring the vision into focus."],
  ["04", "Detail", "Every junction, finish and custom element is resolved."],
  ["05", "Build", "Skilled makers execute the design with care and discipline."],
  ["06", "Handover", "Your finished space is prepared, reviewed and revealed."],
];

const projects = [
  { name: "The Courtyard Residence", type: "Residential", location: "Dhaka · Sample Project", tone: "warm", description: "A calm family home imagined through natural texture, crafted timber and filtered light." },
  { name: "Studio House", type: "Living Spaces", location: "Bangladesh · Sample Project", tone: "stone", description: "An open, expressive interior where sculptural forms meet practical everyday living." },
  { name: "The Quiet Office", type: "Commercial", location: "Dhaka · Sample Project", tone: "dark", description: "A focused workplace concept defined by strong lines, soft acoustics and warm illumination." },
];

const materials = ["Wood", "Stone", "Marble", "Metal", "Fabric", "Lighting", "Custom Furniture", "Finishes"];

const reels = [
  ["A Living Room in Layers", "Material study · Reel 01"],
  ["From Concept to Calm", "Design process · Reel 02"],
  ["Details Make the Space", "Craftsmanship · Reel 03"],
];

function Placeholder({ label, className = "", tone = "warm" }: { label: string; className?: string; tone?: string }) {
  return (
    <div className={cn("placeholder-art group relative overflow-hidden", `placeholder-${tone}`, className)} role="img" aria-label={`${label} image placeholder`}>
      <div className="placeholder-architecture" aria-hidden="true" />
      <span className="absolute bottom-5 left-5 z-10 font-label text-[10px] uppercase tracking-[0.2em] text-surface-foreground/70">{label} · Replace image</span>
    </div>
  );
}

function SectionTitle({ eyebrow, title, copy, light = false }: { eyebrow: string; title: string; copy?: string; light?: boolean }) {
  return (
    <div className="section-heading reveal">
      <p className={cn("eyebrow", light && "text-bronze-light")}>{eyebrow}</p>
      <h2 className={cn("display-title", light && "text-charcoal-foreground")}>{title}</h2>
      {copy ? <p className={cn("mt-5 max-w-xl text-base leading-7", light ? "text-charcoal-muted" : "text-muted-foreground")}>{copy}</p> : null}
    </div>
  );
}

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const links = [["Studio", "#studio"], ["Services", "#services"], ["Process", "#process"], ["Projects", "#projects"], ["Contact", "#contact"]];
  return (
    <header className={cn("fixed inset-x-0 top-0 z-50 border-b transition-all duration-500", scrolled || open ? "border-charcoal-border bg-charcoal/95 backdrop-blur-xl" : "border-transparent bg-transparent")}>
      <div className="mx-auto grid h-20 max-w-[1480px] grid-cols-[minmax(0,1fr)_auto] items-center px-5 sm:px-8 lg:h-24 lg:grid-cols-[1fr_auto_1fr] lg:px-12">
        <a href="#top" className="min-w-0 font-display text-lg uppercase tracking-[0.08em] text-charcoal-foreground sm:text-xl">SK <span className="text-bronze-light">Interior</span> Studio</a>
        <nav className="hidden items-center gap-8 lg:flex" aria-label="Main navigation">
          {links.map(([label, href]) => <a className="nav-link" href={href} key={href}>{label}</a>)}
        </nav>
        <div className="hidden justify-end lg:flex">
          <a href="#contact" className="btn-bronze">Start a project <ArrowUpRight /></a>
        </div>
        <Button className="h-11 w-11 justify-self-end rounded-none border border-charcoal-border bg-transparent text-charcoal-foreground hover:bg-charcoal-surface lg:hidden" size="icon" onClick={() => setOpen((value) => !value)} aria-label={open ? "Close menu" : "Open menu"}>
          {open ? <X /> : <Menu />}
        </Button>
      </div>
      <div className={cn("grid overflow-hidden transition-[grid-template-rows] duration-500 lg:hidden", open ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
        <nav className="min-h-0 border-t border-charcoal-border px-5" aria-label="Mobile navigation">
          <div className="flex flex-col py-5">
            {links.map(([label, href]) => <a className="border-b border-charcoal-border py-4 font-display text-3xl text-charcoal-foreground" href={href} key={href} onClick={() => setOpen(false)}>{label}</a>)}
          </div>
        </nav>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="hero relative flex min-h-[94svh] items-end overflow-hidden bg-charcoal text-charcoal-foreground">
      <div className="absolute inset-0">
        <div className="hero-placeholder" aria-label="Replaceable interior background video placeholder">
          <video className="absolute inset-0 h-full w-full object-cover opacity-0" autoPlay muted loop playsInline aria-label="Interior design showreel" />
          <div className="hero-lines" />
          <span className="absolute right-5 top-28 font-label text-[9px] uppercase tracking-[0.28em] text-charcoal-muted sm:right-10">Background video placeholder</span>
        </div>
        <div className="absolute inset-0 bg-hero-overlay" />
      </div>
      <div className="relative z-10 mx-auto w-full max-w-[1480px] px-5 pb-14 sm:px-8 sm:pb-16 lg:px-12 lg:pb-20">
        <p className="mb-6 flex items-center gap-3 font-label text-[10px] uppercase tracking-[0.25em] text-bronze-light animate-fade-in"><span className="h-px w-10 bg-bronze" /> Interior design & build · Bangladesh</p>
        <h1 className="max-w-5xl font-display text-[clamp(3.5rem,8.7vw,8.5rem)] leading-[0.82] text-charcoal-foreground animate-fade-in">Spaces Designed<br /><em className="font-normal text-bronze-light">to Feel Like Yours.</em></h1>
        <div className="mt-8 grid gap-8 border-t border-charcoal-border pt-6 md:grid-cols-[1fr_auto] md:items-end">
          <p className="max-w-lg text-sm leading-6 text-charcoal-muted sm:text-base">Thoughtful interiors where architecture, material and everyday life come together with quiet confidence.</p>
          <div className="flex flex-wrap gap-3">
            <a href="#projects" className="btn-light">Explore our work <ArrowDown /></a>
            <a href="#contact" className="btn-outline-light">Start your project <ArrowUpRight /></a>
          </div>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="studio" className="section-pad bg-background">
      <div className="page-grid">
        <div className="lg:col-span-5"><Placeholder label="Studio / About" className="aspect-[4/5]" tone="stone" /></div>
        <div className="flex flex-col justify-between lg:col-span-6 lg:col-start-7 lg:py-8">
          <SectionTitle eyebrow="The studio" title="Interiors with a sense of belonging." />
          <div className="mt-10 lg:mt-16">
            <Quote className="mb-5 h-8 w-8 text-bronze" strokeWidth={1} />
            <p lang="bn" className="max-w-2xl font-bengali text-2xl leading-relaxed text-foreground sm:text-3xl">“আধুনিক রুচিশীল এবং ক্রিয়েটিভ ইন্টেরিয়র ডিজাইনের জন্য যোগাযোগ করুন।”</p>
            <div className="mt-8 grid gap-6 border-t border-border pt-7 sm:grid-cols-2">
              <p className="text-sm leading-7 text-muted-foreground">SK Interior Studio creates considered spaces that feel personal, functional and enduring. Our work begins with how you want to live, work and feel.</p>
              <p className="text-sm leading-7 text-muted-foreground">From spatial planning to custom details and execution, we bring every layer into one clear, cohesive design language.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="section-pad bg-soft">
      <div className="page-shell">
        <SectionTitle eyebrow="What we build" title="From the room to the smallest detail." copy="Comprehensive interior design and build services, shaped as one seamless experience." />
        <div className="mt-14 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
          {services.map(([number, name, copy], index) => (
            <article className="service-card group bg-soft" key={name}>
              <Placeholder label={name} className="aspect-[5/4]" tone={index % 3 === 0 ? "warm" : index % 3 === 1 ? "stone" : "dark"} />
              <div className="p-6 sm:p-7">
                <div className="mb-8 flex items-start justify-between"><span className="font-label text-[10px] tracking-[0.18em] text-bronze">{number}</span><ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" /></div>
                <h3 className="font-display text-3xl text-foreground">{name}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{copy}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Process() {
  return (
    <section id="process" className="section-pad bg-charcoal text-charcoal-foreground">
      <div className="page-shell">
        <SectionTitle eyebrow="Design process" title="Clarity at every stage." copy="A considered six-step journey from your first idea to a fully realised interior." light />
        <div className="mt-16 border-t border-charcoal-border">
          {process.map(([number, name, copy]) => (
            <article className="process-row reveal grid gap-4 border-b border-charcoal-border py-7 sm:grid-cols-[100px_1fr_1fr_auto] sm:items-center lg:py-9" key={name}>
              <span className="font-label text-xs tracking-[0.2em] text-bronze-light">{number}</span>
              <h3 className="font-display text-4xl sm:text-5xl">{name}</h3>
              <p className="max-w-md text-sm leading-6 text-charcoal-muted">{copy}</p>
              <span className="hidden h-8 w-8 items-center justify-center border border-charcoal-border text-bronze-light sm:flex">+</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section id="projects" className="section-pad bg-background">
      <div className="page-shell">
        <SectionTitle eyebrow="Selected work" title="Spaces, thoughtfully composed." copy="A sample portfolio layout ready for your real project photography and stories." />
        <div className="mt-14 space-y-20 lg:space-y-28">
          {projects.map((project, index) => (
            <article className={cn("grid gap-7 lg:grid-cols-12 lg:items-end", index % 2 === 1 && "lg:[&_.project-visual]:order-2")} key={project.name}>
              <Placeholder label={project.name} className={cn("project-visual lg:col-span-8", index === 0 ? "aspect-[16/9]" : "aspect-[4/3]")} tone={project.tone} />
              <div className="lg:col-span-4 lg:px-4 lg:pb-5">
                <p className="eyebrow">{project.type}</p>
                <h3 className="mt-3 font-display text-4xl sm:text-5xl">{project.name}</h3>
                <p className="mt-3 font-label text-[10px] uppercase tracking-[0.16em] text-muted-foreground">{project.location}</p>
                <p className="mt-6 text-sm leading-7 text-muted-foreground">{project.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Materials() {
  return (
    <section className="section-pad overflow-hidden bg-bronze-pale">
      <div className="page-grid">
        <div className="lg:col-span-5 lg:sticky lg:top-32 lg:self-start">
          <SectionTitle eyebrow="Materials & craftsmanship" title="The beauty is in what you can feel." copy="Natural character, precise workmanship and a thoughtful dialogue between every surface." />
          <Placeholder label="Material Library" className="mt-10 aspect-[4/3]" tone="warm" />
        </div>
        <div className="mt-12 lg:col-span-6 lg:col-start-7 lg:mt-0">
          {materials.map((material, index) => (
            <div className="group grid grid-cols-[3rem_1fr_auto] items-center border-b border-border py-6 sm:py-8" key={material}>
              <span className="font-label text-[10px] text-bronze">0{index + 1}</span>
              <h3 className="font-display text-4xl transition-transform duration-300 group-hover:translate-x-2 sm:text-5xl">{material}</h3>
              <div className={cn("material-swatch", `swatch-${(index % 4) + 1}`)} aria-hidden="true" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Reels() {
  const [active, setActive] = useState(1);
  const dragStart = useRef<number | null>(null);
  const move = useCallback((direction: number) => setActive((current) => (current + direction + reels.length) % reels.length), []);
  return (
    <section className="section-pad bg-charcoal text-charcoal-foreground">
      <div className="page-shell">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <SectionTitle eyebrow="Facebook reels" title="See ideas in motion." light />
          <div className="flex gap-2">
            <Button variant="outline" size="icon" onClick={() => move(-1)} className="reel-control" aria-label="Previous reel"><ArrowLeft /></Button>
            <Button variant="outline" size="icon" onClick={() => move(1)} className="reel-control" aria-label="Next reel"><ArrowRight /></Button>
          </div>
        </div>
        <div className="reels-stage mt-14" onPointerDown={(event) => { dragStart.current = event.clientX; }} onPointerUp={(event) => { if (dragStart.current !== null && Math.abs(event.clientX - dragStart.current) > 45) move(event.clientX < dragStart.current ? 1 : -1); dragStart.current = null; }}>
          {reels.map(([title, meta], index) => {
            const relative = (index - active + reels.length) % reels.length;
            const position = relative === 0 ? "active" : relative === 1 ? "right" : "left";
            return (
              <article className={cn("reel-card", `reel-${position}`)} key={title} onClick={() => setActive(index)}>
                <div className="reel-video">
                  <div className="placeholder-architecture" />
                  <span className="absolute left-4 top-4 font-label text-[9px] uppercase tracking-[0.15em] text-charcoal-muted">Video placeholder</span>
                  <Button size="icon" className="absolute left-1/2 top-1/2 h-14 w-14 -translate-x-1/2 -translate-y-1/2 rounded-full bg-bronze text-primary-foreground hover:bg-bronze-light" aria-label={`Play ${title}`}><Play className="ml-0.5 fill-current" /></Button>
                  <Facebook className="absolute right-4 top-4 h-5 w-5" />
                </div>
                <div className="p-5"><p className="font-display text-2xl">{title}</p><p className="mt-1 text-xs text-charcoal-muted">{meta}</p></div>
              </article>
            );
          })}
        </div>
        <div className="mt-12 text-center"><a className="story-link text-sm text-charcoal-foreground" href="https://www.facebook.com/" target="_blank" rel="noreferrer">Watch on Facebook →</a></div>
      </div>
    </section>
  );
}

function BeforeAfter() {
  const [value, setValue] = useState(50);
  const container = useRef<HTMLDivElement>(null);
  const update = (event: PointerEvent<HTMLDivElement>) => {
    const rect = container.current?.getBoundingClientRect();
    if (!rect) return;
    setValue(Math.max(0, Math.min(100, ((event.clientX - rect.left) / rect.width) * 100)));
  };
  return (
    <section className="section-pad bg-soft">
      <div className="page-shell">
        <SectionTitle eyebrow="Before / after" title="Drag to reveal the transformation." copy="Replace these placeholders with matching photographs of your completed projects." />
        <div ref={container} className="comparison mt-12 aspect-[4/3] cursor-ew-resize touch-none sm:aspect-[16/9]" onPointerDown={(event) => { event.currentTarget.setPointerCapture(event.pointerId); update(event); }} onPointerMove={(event) => { if (event.currentTarget.hasPointerCapture(event.pointerId)) update(event); }}>
          <div className="before-layer"><div className="placeholder-architecture" /><span className="compare-label left-4">Before · replace image</span></div>
          <div className="after-layer" style={{ clipPath: `inset(0 0 0 ${value}%)` }}><div className="placeholder-architecture" /><span className="compare-label right-4">After · replace image</span></div>
          <div className="comparison-line" style={{ left: `${value}%` }}><div className="comparison-handle"><ArrowLeft /><ArrowRight /></div></div>
        </div>
      </div>
    </section>
  );
}

function WhyUs() {
  const points = [
    ["01", "Thoughtful Design", "Every decision begins with people, place and purpose."],
    ["02", "Creative Direction", "A coherent vision guides the project from first sketch to final styling."],
    ["03", "Quality Craftsmanship", "Careful detailing and skilled making define every finished space."],
    ["04", "Functional Luxury", "Beautiful materials and effortless practicality belong together."],
    ["05", "Complete Design & Build", "One connected team carries the idea through design and execution."],
    ["06", "Client Focused", "Clear listening and close collaboration keep your needs at the centre."],
  ];
  return (
    <section className="section-pad bg-background">
      <div className="page-grid">
        <div className="lg:col-span-4"><SectionTitle eyebrow="Why SK" title="Designed with intent. Built with care." /></div>
        <div className="mt-10 lg:col-span-7 lg:col-start-6 lg:mt-0">
          {points.map(([number, name, copy]) => <article className="grid gap-4 border-t border-border py-7 sm:grid-cols-[3rem_1fr_1fr]" key={name}><span className="font-label text-[10px] text-bronze">{number}</span><h3 className="font-display text-2xl sm:text-3xl">{name}</h3><p className="text-sm leading-6 text-muted-foreground">{copy}</p></article>)}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = encodeURIComponent(`Project enquiry: ${String(data.get("type") || "Interior project")}`);
    const body = encodeURIComponent(`Name: ${data.get("name")}\nPhone: ${data.get("phone")}\nProject type: ${data.get("type")}\n\n${data.get("message")}`);
    window.location.href = `mailto:skinteriorstudio2026@gmail.com?subject=${subject}&body=${body}`;
  };
  return (
    <section id="contact" className="section-pad bg-charcoal text-charcoal-foreground">
      <div className="page-grid">
        <div className="lg:col-span-5">
          <p className="eyebrow text-bronze-light">Begin a conversation</p>
          <h2 className="mt-4 font-display text-[clamp(3.5rem,7vw,7rem)] leading-[0.88]">Let’s Build<br /><em className="text-bronze-light">Your Space.</em></h2>
          <p className="mt-8 max-w-md text-sm leading-7 text-charcoal-muted">Tell us what you are imagining. We’ll start with a thoughtful conversation about your space, needs and direction.</p>
          <div className="mt-10 space-y-4 text-sm">
            <a className="contact-line" href="tel:+8801326160559"><Phone /> 01326-160559</a>
            <a className="contact-line" href="https://wa.me/8801326160559" target="_blank" rel="noreferrer"><MessageCircle /> +880 1326-160559</a>
            <a className="contact-line break-all" href="mailto:skinteriorstudio2026@gmail.com"><Mail /> skinteriorstudio2026@gmail.com</a>
          </div>
        </div>
        <form onSubmit={submit} className="mt-14 lg:col-span-6 lg:col-start-7 lg:mt-0">
          <div className="grid gap-x-6 sm:grid-cols-2">
            <label className="form-field"><span>Name</span><input required name="name" placeholder="Your name" /></label>
            <label className="form-field"><span>Phone</span><input required name="phone" type="tel" placeholder="Phone number" /></label>
            <label className="form-field"><span>Email</span><input required name="email" type="email" placeholder="Email address" /></label>
            <label className="form-field"><span>Project type</span><select required name="type" defaultValue=""><option value="" disabled>Select type</option>{services.map(([, name]) => <option key={name}>{name}</option>)}</select></label>
          </div>
          <label className="form-field"><span>Message</span><textarea required name="message" rows={4} placeholder="Tell us a little about your space" /></label>
          <Button type="submit" className="mt-8 h-13 rounded-none bg-bronze px-7 font-label text-xs uppercase tracking-[0.14em] text-primary-foreground hover:bg-bronze-light">Send enquiry <ArrowUpRight /></Button>
        </form>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-charcoal-border bg-charcoal px-5 py-10 text-charcoal-foreground sm:px-8 lg:px-12">
      <div className="mx-auto max-w-[1480px]">
        <div className="grid gap-10 lg:grid-cols-[2fr_1fr_1fr]">
          <div><p className="font-display text-3xl uppercase tracking-[0.06em]">SK Interior Studio</p><p className="mt-4 max-w-sm text-sm leading-6 text-charcoal-muted">Modern, thoughtful interiors created for the way you live and work.</p></div>
          <div><p className="footer-label">Navigate</p><div className="mt-4 grid gap-2 text-sm"><a href="#studio">Studio</a><a href="#services">Services</a><a href="#process">Process</a><a href="#projects">Projects</a><a href="#contact">Contact</a></div></div>
          <div><p className="footer-label">Connect</p><div className="mt-4 grid gap-2 text-sm"><a href="https://www.instagram.com/skinteriorstudio2026" target="_blank" rel="noreferrer">Instagram</a><a href="https://tiktok.com/@sk.interior.studi" target="_blank" rel="noreferrer">TikTok</a><a href="https://www.facebook.com/" target="_blank" rel="noreferrer">Facebook</a><a href="tel:+8801326160559">01326-160559</a></div></div>
        </div>
        <div className="mt-12 flex flex-col justify-between gap-3 border-t border-charcoal-border pt-6 font-label text-[9px] uppercase tracking-[0.18em] text-charcoal-muted sm:flex-row"><span>© 2026 SK Interior Studio</span><span>Dhaka · Bangladesh</span></div>
      </div>
    </footer>
  );
}

function Index() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) entry.target.classList.add("is-visible"); }), { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);
  return <><Header /><main><Hero /><About /><Services /><Process /><Projects /><Materials /><Reels /><BeforeAfter /><WhyUs /><Contact /></main><Footer /></>;
}