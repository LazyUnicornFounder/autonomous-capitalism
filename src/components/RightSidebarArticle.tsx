import { Article } from "@/data/articles";

type Props = {
  article: Article;
  image: string;
  showDivider?: boolean;
};

const RightSidebarArticle = ({ article, image, showDivider = false }: Props) => {
  return (
    <article className="group cursor-pointer">
      {showDivider && <div className="border-t border-border my-6" />}
      <img
        src={image}
        alt={article.title}
        className="w-full aspect-[4/3] object-cover mb-3"
        loading="lazy"
        width={640}
        height={512}
      />
      <span className="inline-block bg-primary text-primary-foreground text-xs font-body font-bold tracking-widest px-2 py-0.5 mb-2">
        {article.category}
      </span>
      <h3 className="font-display font-black text-sm leading-snug mb-2 group-hover:text-primary transition-colors">
        {article.title}
      </h3>
      <p className="text-xs font-body tracking-wider text-muted-foreground">
        By <span className="font-bold text-foreground">{article.author}</span>
      </p>
    </article>
  );
};

export default RightSidebarArticle;
