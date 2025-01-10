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
          <TabsList className="flex flex-wrap gap-2">
            <TabsTrigger value="analyzer">SEO Analyzer</TabsTrigger>
            <TabsTrigger value="keywords">Keyword Research</TabsTrigger>
            <TabsTrigger value="backlinks">Backlink Checker</TabsTrigger>
            <TabsTrigger value="content">Content Optimizer</TabsTrigger>
            <TabsTrigger value="sitemap">Sitemap Generator</TabsTrigger>
            <TabsTrigger value="robots">Robots.txt Generator</TabsTrigger>
            <TabsTrigger value="indexing">Google Indexing</TabsTrigger>
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