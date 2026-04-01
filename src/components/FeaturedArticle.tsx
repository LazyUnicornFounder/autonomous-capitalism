import { featuredArticle } from "@/data/articles";
import heroImage from "@/assets/hero-featured.jpg";

const FeaturedArticle = () => {
  return (
    <article className="group cursor-pointer text-center">
      <img
        src={heroImage}
        alt={featuredArticle.title}
        className="w-full aspect-[4/3] object-cover mb-4"
        width={1024}
        height={768}
      />
      <span className="inline-block bg-primary text-primary-foreground text-xs font-body font-bold tracking-widest px-3 py-1 mb-4">
        {featuredArticle.category}
      </span>
      <h2 className="font-display font-black text-3xl md:text-4xl lg:text-5xl leading-none tracking-tight mb-4 group-hover:text-primary transition-colors">
        {featuredArticle.title}
      </h2>
      <p className="text-muted-foreground font-body text-base leading-relaxed max-w-2xl mx-auto mb-3">
        {featuredArticle.excerpt}
      </p>
      <p className="text-xs font-body tracking-wider text-muted-foreground">
        By <span className="font-bold text-foreground">{featuredArticle.author}</span>
      </p>
    </article>
  );
};

export default FeaturedArticle;
