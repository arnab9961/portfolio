import { PROJECTS, TOOLBOX } from "../../../constants/constants";
import HourMark from "../../ui/common/HourMark";

export default function Work() {
  return (
    <div className="wrap">
      <HourMark at="midday">Selected work and experiments.</HourMark>
      <h2 className="sec">Projects</h2>
      <div className="project-grid">
        {PROJECTS.map((project) => (
          <article key={project.name} className="project-card">
            <p className="kicker">{project.category}</p>
            <h3>{project.name}</h3>
            <h4>{project.headline}</h4>
            <p>{project.summary}</p>
            <p className="aside">{project.stack}</p>
            {project.href && (
              <a className="quiet" href={project.href} target="_blank" rel="noopener noreferrer">
                View project
              </a>
            )}
          </article>
        ))}
      </div>

      <dl className="kit" aria-label="Tools">
        {TOOLBOX.map((group) => (
          <div key={group.label}>
            <dt>{group.label}</dt>
            <dd>{group.tools.join(", ")}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
