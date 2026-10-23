"use client";

// Slush's nav: logo left, pill links center, "+" and the primary CTA right. Scrolling down
// tucks the pills away with a staggered float; scrolling up or hovering "+" brings them
// back. On phones "+" opens a full menu panel.
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { navigation } from "@/data/swanky";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/swanky/gsap";
import { useReducedMotion } from "../motion/motion-provider";
import { TransitionLink } from "../motion/transition-link";

type Props = { seal: React.ReactNode };

export function SiteNav({ seal }: Props) {
  const pathname = usePathname();
  const ref = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [open, setOpen] = useState(false);
  const hidden = useRef(false);
  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;
      const pills = root.querySelectorAll(".nav-pills li");
      if (!reduced) {
        gsap.to(".nav-logo .sticker", {
          rotate: 360,
          ease: "none",
          scrollTrigger: { start: 0, end: "max", scrub: 0.6 },
        });
      }
      let last = 0;
      const onScroll = () => {
        const y = window.scrollY;
        if (Math.abs(y - last) < 10) return;
        const down = y > last;
        last = y;
        if (reduced || window.innerWidth < 1080) return;
        if (down && y > 50 && !hidden.current) {
          hidden.current = true;
          gsap.to(pills, {
            yPercent: -300,
            duration: 0.75,
            ease: "float",
            stagger: { each: 0.03, from: "start" },
          });
        } else if (!down && hidden.current) {
          hidden.current = false;
          gsap.to(pills, {
            yPercent: 0,
            duration: 0.75,
            ease: "float",
            stagger: { each: 0.03, from: "end" },
          });
        }
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => window.removeEventListener("scroll", onScroll);
    },
    { scope: ref, dependencies: [reduced] },
  );

  // Hovering "+" brings tucked-away pills back. The nav lives in the root layout and
  // never unmounts, so this tween needs no cleanup.
  const showPills = () => {
    const pills = ref.current?.querySelectorAll(".nav-pills li");
    if (!pills || !hidden.current) return;
    hidden.current = false;
    gsap.to(pills, {
      yPercent: 0,
      duration: 0.75,
      ease: "float",
      stagger: { each: 0.03, from: "end" },
    });
  };

  // Menu panel in and out; Escape closes it.
  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;
    if (open && !reduced) {
      gsap.fromTo(
        panel.querySelectorAll("li"),
        { xPercent: 40, autoAlpha: 0 },
        {
          xPercent: 0,
          autoAlpha: 1,
          duration: 0.75,
          ease: "float",
          stagger: { each: 0.04, from: "start" },
        },
      );
    }
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, reduced]);

  useEffect(() => {
    document.documentElement.classList.toggle("menu-open", open);
  }, [open]);

  useEffect(() => ScrollTrigger.refresh(), [pathname]);

  return (
    <header ref={ref} className="site-nav">
      <TransitionLink
        href="/"
        className="nav-logo"
        aria-label="Swanky Balloon Co. home"
      >
        {seal}
      </TransitionLink>
      <nav aria-label="Main">
        <ul className="nav-pills">
          {navigation.map((item) => (
            <li key={item.href}>
              <TransitionLink
                href={item.href}
                className="pill"
                aria-current={isActive(item.href) ? "page" : undefined}
              >
                {item.label}
              </TransitionLink>
            </li>
          ))}
        </ul>
      </nav>
      <div className="nav-right">
        <button
          type="button"
          className="pill plus"
          aria-expanded={open}
          aria-controls="menu-panel"
          aria-label={open ? "Close menu" : "Open menu"}
          onMouseEnter={showPills}
          onClick={() => setOpen((o) => !o)}
        >
          <span aria-hidden="true">+</span>
        </button>
        <TransitionLink href="/inquire" className="pill is-solid nav-cta">
          Inquire
        </TransitionLink>
      </div>
      <div ref={panelRef} id="menu-panel" className="menu-panel" hidden={!open}>
        <nav aria-label="Mobile navigation">
          <ul>
            {[
              { label: "Home", href: "/" },
              ...navigation,
              { label: "Inquire", href: "/inquire" },
            ].map((item) => (
              <li key={item.href}>
                <TransitionLink
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={pathname === item.href ? "page" : undefined}
                >
                  {item.label}
                </TransitionLink>
              </li>
            ))}
          </ul>
        </nav>
        <p className="label">Nashville, Brentwood + Middle Tennessee</p>
      </div>
    </header>
  );
}
