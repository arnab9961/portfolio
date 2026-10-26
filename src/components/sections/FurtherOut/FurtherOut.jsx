import { FURTHER_OUT } from "../../../constants/constants";
import HourMark from "../../ui/common/HourMark";
export default function FurtherOut() {
  return (
    <div className="wrap">
      <HourMark at="golden">{FURTHER_OUT.hour}</HourMark>
      <h2 className="sec">{FURTHER_OUT.heading}</h2>
      <p className="standfirst">{FURTHER_OUT.standfirst}</p>
      <div className="research-grid" role="list" aria-label={FURTHER_OUT.stripLabel}>
        {FURTHER_OUT.places.map(({ place, detail, link }) => (
          <article key={place} className="research-card" role="listitem">
            <h3>{place}</h3>
            <p>{detail}</p>
            {link && (
              <a className="quiet" href={link.href} target="_blank" rel="noopener noreferrer">
                {link.label}
              </a>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}
