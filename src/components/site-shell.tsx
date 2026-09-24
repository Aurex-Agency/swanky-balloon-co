"use client";
import Link from "next/link";
import { Wordmark } from "./wordmark";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X, Camera } from "lucide-react";
import { brand, navigation, copy } from "@/data/swanky";
export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const pathname = usePathname();
  const toggle = useRef<HTMLButtonElement>(null);
  const menu = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);
  useEffect(() => {
    if (pathname !== "/") return;
    const hero = document.querySelector(".hero");
    if (!hero) return;
    const observer = new IntersectionObserver(([entry]) => {
      setPastHero(
        !entry.isIntersecting && entry.boundingClientRect.bottom <= 0,
      );
    });
    observer.observe(hero);
    return () => observer.disconnect();
  }, [pathname]);
  useEffect(() => {
    if (!open) return;
    const old = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    menu.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    return () => {
      document.body.style.overflow = old;
    };
  }, [open]);
  return (
    <>
      <div className="announcement">{copy.announcement}</div>
      <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
        <Link href="/" className="logo" aria-label="Swanky Balloon Co. home">
          <Wordmark />
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {navigation.map((item) => (
            <Link href={item.href} key={item.label}>
              {item.label}
            </Link>
          ))}
        </nav>
        <Link className="button button-ink nav-cta" href="/inquire">
          Inquire <ArrowUpRight size={18} />
        </Link>
        <button
          className="menu-toggle"
          ref={toggle}
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X /> : <Menu />}
        </button>
        {open && (
          <div
            id="mobile-menu"
            ref={menu}
            className="mobile-menu"
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                setOpen(false);
                toggle.current?.focus();
              }
              if (e.key === "Tab") {
                const links = menu.current?.querySelectorAll("a");
                if (!links?.length) return;
                if (e.shiftKey && document.activeElement === links[0]) {
                  e.preventDefault();
                  toggle.current?.focus();
                } else if (
                  !e.shiftKey &&
                  document.activeElement === links[links.length - 1]
                ) {
                  e.preventDefault();
                  toggle.current?.focus();
                }
              }
            }}
          >
            <nav aria-label="Mobile navigation">
              {navigation.map((item) => (
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  key={item.label}
                >
                  {item.label}
                  <ArrowUpRight />
                </Link>
              ))}
              <Link href="/inquire" onClick={() => setOpen(false)}>
                {copy.cta} <ArrowUpRight />
              </Link>
            </nav>
            <p>{brand.area}</p>
          </div>
        )}
      </header>
      {!["/inquire", "/thank-you", "/ops-preview"].includes(pathname) &&
        (pathname !== "/" || pastHero) && (
          <Link className="mobile-cta button button-ink" href="/inquire">
            {copy.cta} <ArrowUpRight size={18} />
          </Link>
        )}
    </>
  );
}
export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <Link href="/" className="footer-logo">
          <Wordmark />
        </Link>
        <p>
          Thoughtfully made for the moments that matter.
          <br />
          <span>{brand.area}</span>
        </p>
        <a
          href={brand.instagram}
          target="_blank"
          rel="noreferrer"
          className="social-link"
        >
          <Camera size={20} /> Find us on Instagram <ArrowUpRight size={18} />
        </a>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Swanky Balloon Co.</span>
        <div>
          <Link href="/inquire">Inquire</Link>
          <Link href="/privacy">Privacy</Link>
        </div>
        {process.env.NEXT_PUBLIC_DEMO_MODE === "true" && (
          <span>Concept website created by Aurex Business Labs</span>
        )}
      </div>
    </footer>
  );
}
