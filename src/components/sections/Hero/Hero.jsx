import { AT_A_GLANCE, CONTACT, HERO_CONTENT } from "../../../constants/constants";
import { useLight } from "../../../hooks/useLight";
import HourMark from "../../ui/common/HourMark";

const QUIET_LINKS = [
  { label: "LinkedIn", href: CONTACT.socials.linkedin },
  { label: "GitHub", href: CONTACT.socials.github },
];

export default function Hero() {
  const { light } = useLight();
  const night = light === "night";
  const { day: dayView } = HERO_CONTENT.view;

  return (
    <div className="wrap">
      <div className="hero">
        <div className="text">
          <HourMark at="morning">{HERO_CONTENT.eyebrow}</HourMark>
          <h1>{HERO_CONTENT.headline}</h1>
          <p className="lede">{HERO_CONTENT.summary}</p>
          <div className="actions">
            <a className="btn" href={HERO_CONTENT.resumeUrl} download="DM-Rafiun-Bin-Masud-CV.pdf">
              Download résumé
            </a>
            {QUIET_LINKS.map((link) => (
              <a
                key={link.label}
                className="quiet"
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <figure className="view">
          <div className="frame">
            {/* eslint-disable-next-line @next/next/no-img-element -- static export, pre-sized local asset */}
            <img
              src={dayView.src}
              alt={dayView.alt}
              width="1200"
              height="800"
              fetchPriority="high"
            />
          </div>
          <figcaption className="cap">
            {dayView.caption}
          </figcaption>
        </figure>
      </div>

      <dl className="glance" aria-label="At a glance">
        {AT_A_GLANCE.map((item) => (
          <div key={item.label}>
            <dt>{item.label}</dt>
            <dd>
              <b>{item.title}</b>
              {item.detail}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
