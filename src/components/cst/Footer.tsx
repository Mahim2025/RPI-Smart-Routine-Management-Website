import { Github, Mail, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-12 border-t border-border/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
        <div className="relative glass rounded-2xl p-6 overflow-hidden">
          <div className="absolute inset-0 grid-bg opacity-30" />
          <div className="absolute -top-24 -left-24 size-48 rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute -bottom-24 -right-24 size-48 rounded-full bg-accent/20 blur-3xl" />
          <div className="relative flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                Developed & Maintained by
              </div>
              <div className="text-2xl font-bold text-gradient-neon mt-1">Md. Mahim Hosen</div>
              <div className="text-xs text-muted-foreground mt-1 flex items-center justify-center sm:justify-start gap-1.5">
                Made with <Heart className="size-3 text-accent fill-accent" /> for CST · 1st Shift
              </div>
            </div>
            <div className="flex items-center gap-3">
              <a href="#" aria-label="GitHub" className="size-10 grid place-items-center rounded-lg glass border border-border hover:border-primary hover:glow-cyan transition">
                <Github className="size-4 text-primary" />
              </a>
              <a href="#" aria-label="Contact" className="size-10 grid place-items-center rounded-lg glass border border-border hover:border-accent hover:glow-green transition">
                <Mail className="size-4 text-accent" />
              </a>
              <div className="px-3 py-1.5 rounded-lg bg-card/60 border border-border font-mono text-[10px] text-muted-foreground">
                v1.0.0
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4 text-center text-[11px] text-muted-foreground">
          © {new Date().getFullYear()} Rajshahi Polytechnic Institute · Department of Computer Science & Technology
        </div>
      </div>
    </footer>
  );
}
