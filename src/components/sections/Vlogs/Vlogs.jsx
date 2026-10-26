import PropTypes from "prop-types";
import HourMark from "../../ui/common/HourMark";

export default function Vlogs({ posts }) {
  return (
    <section id="vlogs" className="vlogs wrap" aria-labelledby="vlogs-heading">
      <HourMark at="late">Late. Notes from the road.</HourMark>
      <h2 id="vlogs-heading" className="sec">Vlogs</h2>
      <div className="vlog-grid">
        {posts.map((post) => (
          <article className="vlog-card" key={post.id}>
            {post.image_url && (
              // eslint-disable-next-line @next/next/no-img-element -- Supabase Storage image URL
              <img src={post.image_url} alt="" loading="lazy" />
            )}
            <div>
              <h3>{post.title}</h3>
              <p>{post.body}</p>
              {post.code_snippet && (
                <pre className="vlog-code">
                  <code className={post.code_language ? `language-${post.code_language}` : undefined}>
                    {post.code_snippet}
                  </code>
                </pre>
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
      body: PropTypes.string.isRequired,
      code_snippet: PropTypes.string,
      code_language: PropTypes.string,
      image_url: PropTypes.string,
    }),
  ).isRequired,
};
