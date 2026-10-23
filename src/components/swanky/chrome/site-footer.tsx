import { brand, navigation } from "@/data/swanky";
import { Sticker } from "../brand/sticker";
import { TransitionLink } from "../motion/transition-link";
import { MotionToggle } from "./motion-toggle";

export function SiteFooter() {
  return (
    <footer className="site-footer band band-olive scallop-top">
      <div className="band-inner footer-inner">
        <div className="footer-sign">
          <Sticker
            name="logo-primary-ivory"
            label="Swanky Balloon Co."
            className="footer-logo"
          />
          <p className="footer-title">
            Celebrate <em>beautifully.</em>
          </p>
          <TransitionLink href="/inquire" className="btn footer-cta">
            Tell us what you’re celebrating
          </TransitionLink>
        </div>
        <nav aria-label="Footer" className="footer-links">
          <p className="label">Explore</p>
          <ul>
            {navigation.map((item) => (
              <li key={item.href}>
                <TransitionLink href={item.href}>{item.label}</TransitionLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className="footer-links">
          <p className="label">Say hello</p>
          <ul>
            <li>
              <TransitionLink href="/inquire">Start an inquiry</TransitionLink>
            </li>
            <li>
              <a href={brand.instagram} target="_blank" rel="noreferrer">
                Instagram <span className="sr-only">(opens in a new tab)</span>
              </a>
            </li>
          </ul>
          <p className="footer-area">{brand.area}</p>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Swanky Balloon Co.</span>
        <TransitionLink href="/privacy">Privacy</TransitionLink>
        <MotionToggle />
        {process.env.NEXT_PUBLIC_DEMO_MODE === "true" && (
          <span>Website by Aurex Business Labs</span>
        )}
      </div>
    </footer>
  );
}
