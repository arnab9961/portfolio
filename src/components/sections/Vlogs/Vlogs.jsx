import PropTypes from "prop-types";
import Link from "next/link";
import HourMark from "../../ui/common/HourMark";
import { splitVlogBody } from "../../../utils/vlogContent";

export default function Vlogs({ posts, detail = false }) {
  return (
    <section id="vlogs" className="vlogs wrap" aria-labelledby="vlogs-heading">
      <HourMark at="late">Late. Notes from the road.</HourMark>
      <h2 id="vlogs-heading" className="sec">Vlogs</h2>
      <div className={`vlog-grid${detail ? " vlog-detail" : ""}`}>
        {posts.map((post) => (
          <article className="vlog-card" key={post.id}>
            {post.image_url && (
              // eslint-disable-next-line @next/next/no-img-element -- Supabase Storage image URL
              <img src={post.image_url} alt="" loading="lazy" />
            )}
            <div>
              <span className="vlog-category">{post.category || "uncategorized"}</span>
              <h3><Link href={`/vlogs/?post=${encodeURIComponent(post.slug)}`}>{post.title}</Link></h3>
              {detail ? (
                <>
                  {splitVlogBody(post.body).map((part, index) =>
                    part.type === "code" ? (
                      <pre className="vlog-code" key={`${post.id}-code-${index}`}>
                        <code className={part.language ? `language-${part.language}` : undefined}>{part.value}</code>
                      </pre>
                    ) : (
                      <p key={`${post.id}-text-${index}`}>{part.value}</p>
                    ),
                  )}
                  {post.code_snippet && !post.body.includes("```") && (
                    <pre className="vlog-code">
                      <code className={post.code_language ? `language-${post.code_language}` : undefined}>
                        {post.code_snippet}
                      </code>
                    </pre>
                  )}
                </>
              ) : (
                <>
                  <p className="vlog-excerpt">{post.body.replace(/```[\s\S]*?```/g, "").trim().slice(0, 180)}...</p>
                  <Link className="vlog-read" href={`/vlogs/?post=${encodeURIComponent(post.slug)}`}>Read note →</Link>
                </>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

Vlogs.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      category: PropTypes.string,
      body: PropTypes.string.isRequired,
      code_snippet: PropTypes.string,
      code_language: PropTypes.string,
      image_url: PropTypes.string,
    }),
  ).isRequired,
  detail: PropTypes.bool,
};
