import { Article } from "@/data/articles";

const SidebarArticle = ({ article, showDivider = true }: { article: Article; showDivider?: boolean }) => {
  return (
    <article className="group cursor-pointer">
      {showDivider && <div className="border-t-2 border-primary mb-4" />}
      <h3 className="font-display font-bold text-base leading-snug mb-2 group-hover:text-primary transition-colors">
        {article.title}
      </h3>
      {article.excerpt && (
        <p className="text-sm text-muted-foreground font-body leading-relaxed mb-2">
          {article.excerpt}
        </p>
      )}
      <p className="text-xs font-body tracking-wider text-muted-foreground">
        By <span className="font-bold text-foreground">{article.author}</span>
      </p>
    </article>
  );
};

export default SidebarArticle;
