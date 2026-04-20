import { Link } from "react-router-dom";
import { format } from "date-fns";

type Idea = {
  name: string;
  description: string;
  links: { label: string; url: string }[];
  date: string;
  postId: string;
};

const IdeaLandingHero = ({ idea }: { idea: Idea; index?: number }) => {
  const subheadline = idea.description.split(/(?<=[.!?])\s+/)[0] || idea.description;

  return (
    <section className="relative overflow-hidden border border-border bg-card px-6 md:px-8 py-10 md:py-12 h-full">
      <div className="relative z-10 flex flex-col h-full">
        <h2 className="font-display font-black leading-[0.95] tracking-tight mb-4 text-foreground text-3xl md:text-4xl">
          {idea.name}
        </h2>
        <p className="mb-6 leading-relaxed flex-1 font-body text-muted-foreground text-sm md:text-base">
          {subheadline}
        </p>
        <div
          className="mt-6 pt-5 flex flex-col gap-3 text-xs w-full border-t border-border text-muted-foreground font-body"
        >
          <div className="flex items-center gap-2 flex-wrap">
            <span>{format(new Date(idea.date), "MMM d, yyyy")}</span>
            <span>·</span>
            <Link to={`/briefings/${idea.postId}`} className="hover:underline text-primary">
              Source briefing →
            </Link>
          </div>
          {idea.links.length > 0 && (
            <div className="flex items-start gap-2 flex-wrap">
              <span className="uppercase tracking-wider opacity-70 mt-0.5">Tweets:</span>
              {idea.links.map((l, i) => (
                <a
                  key={i}
                  href={l.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline px-2 py-0.5 text-primary border border-primary/40"
                >
                  {l.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default IdeaLandingHero;
