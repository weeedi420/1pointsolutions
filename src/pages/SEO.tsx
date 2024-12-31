import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/card";

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

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Coming Soon</h2>
          <p className="text-gray-600">
            SEO analysis and optimization tools are currently in development. Check back soon for updates!
          </p>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default SEO;