import DashboardLayout from "@/components/layout/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SeoAnalyzer from "@/components/seo/SeoAnalyzer";
import KeywordResearch from "@/components/seo/KeywordResearch";
import BacklinkChecker from "@/components/seo/BacklinkChecker";
import ContentOptimizer from "@/components/seo/ContentOptimizer";
import SitemapGenerator from "@/components/seo/SitemapGenerator";
import RobotsTxtGenerator from "@/components/seo/RobotsTxtGenerator";
import GoogleIndexing from "@/components/seo/GoogleIndexing";

const SEO = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-[#222222]">SEO Tools</h1>
          <p className="text-gray-600 mt-2">
            Comprehensive tools to optimize your website's search engine performance
          </p>
        </div>

        <Tabs defaultValue="analyzer" className="space-y-4">
          <TabsList className="inline-flex h-auto flex-wrap gap-2 bg-transparent p-0">
            <TabsTrigger value="analyzer" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              SEO Analyzer
            </TabsTrigger>
            <TabsTrigger value="keywords" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Keyword Research
            </TabsTrigger>
            <TabsTrigger value="backlinks" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Backlink Checker
            </TabsTrigger>
            <TabsTrigger value="content" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Content Optimizer
            </TabsTrigger>
            <TabsTrigger value="sitemap" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Sitemap Generator
            </TabsTrigger>
            <TabsTrigger value="robots" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Robots.txt Generator
            </TabsTrigger>
            <TabsTrigger value="indexing" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Google Indexing
            </TabsTrigger>
          </TabsList>

          <TabsContent value="analyzer">
            <SeoAnalyzer />
          </TabsContent>

          <TabsContent value="keywords">
            <KeywordResearch />
          </TabsContent>

          <TabsContent value="backlinks">
            <BacklinkChecker />
          </TabsContent>

          <TabsContent value="content">
            <ContentOptimizer />
          </TabsContent>

          <TabsContent value="sitemap">
            <SitemapGenerator />
          </TabsContent>

          <TabsContent value="robots">
            <RobotsTxtGenerator />
          </TabsContent>

          <TabsContent value="indexing">
            <GoogleIndexing />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default SEO;