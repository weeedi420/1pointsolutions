import DashboardLayout from "@/components/layout/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SeoAnalyzer from "@/components/seo/SeoAnalyzer";
import KeywordResearch from "@/components/seo/KeywordResearch";
import BacklinkChecker from "@/components/seo/BacklinkChecker";

const SEO = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-[#222222]">SEO Tools</h1>
          <p className="text-gray-600 mt-2">
            Optimize your website's search engine performance
          </p>
        </div>

        <Tabs defaultValue="analyzer" className="space-y-4">
          <TabsList>
            <TabsTrigger value="analyzer">SEO Analyzer</TabsTrigger>
            <TabsTrigger value="keywords">Keyword Research</TabsTrigger>
            <TabsTrigger value="backlinks">Backlink Checker</TabsTrigger>
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
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default SEO;