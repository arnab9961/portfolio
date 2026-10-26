import { AT_A_GLANCE, CONTACT, HERO_CONTENT } from "../../../constants/constants";
import PropTypes from "prop-types";
import HourMark from "../../ui/common/HourMark";

const QUIET_LINKS = [
  { label: "LinkedIn", href: CONTACT.socials.linkedin },
  { label: "GitHub", href: CONTACT.socials.github },
];

export default function Hero({ profile = null }) {
  const { day: dayView } = HERO_CONTENT.view;

  return (
    <div className="wrap">
      <div className="hero">
        <div className="text">
          <HourMark at="morning">{profile?.eyebrow || HERO_CONTENT.eyebrow}</HourMark>
          <h1>{profile?.headline || HERO_CONTENT.headline}</h1>
          <p className="lede">{profile?.summary || HERO_CONTENT.summary}</p>
          <div className="actions">
            <a className="btn" href={HERO_CONTENT.resumeUrl} download="DM_Rafiun_Bin_Masud_Resume.pdf">
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
              src={profile?.hero_image_url || dayView.src}
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

Hero.propTypes = {
  profile: PropTypes.shape({
    headline: PropTypes.string,
    summary: PropTypes.string,
    eyebrow: PropTypes.string,
    hero_image_url: PropTypes.string,
  }),
};
