import SiteHeader from "@/components/SiteHeader";
import FeaturedArticle from "@/components/FeaturedArticle";
import SidebarArticle from "@/components/SidebarArticle";
import RightSidebarArticle from "@/components/RightSidebarArticle";
import { sidebarArticlesLeft, sidebarArticlesRight } from "@/data/articles";
import sidebarImg1 from "@/assets/sidebar-right-1.jpg";
import sidebarImg2 from "@/assets/sidebar-right-2.jpg";

const rightImages = [sidebarImg1, sidebarImg2];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr_240px] gap-8">
          {/* Left sidebar */}
          <aside className="hidden lg:flex flex-col gap-6">
            {sidebarArticlesLeft.map((article, i) => (
              <SidebarArticle key={article.id} article={article} showDivider={i > 0} />
            ))}
          </aside>

          {/* Featured center */}
          <div>
            <FeaturedArticle />
          </div>

          {/* Right sidebar */}
          <aside className="hidden lg:flex flex-col gap-0">
            {sidebarArticlesRight.map((article, i) => (
              <RightSidebarArticle
                key={article.id}
                article={article}
                image={rightImages[i]}
                showDivider={i > 0}
              />
            ))}
          </aside>
        </div>
      </main>
    </div>
  );
};

export default Index;
