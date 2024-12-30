import DashboardLayout from "@/components/layout/DashboardLayout";
import { ContentGenerator } from "@/components/content/ContentGenerator";

const Content = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-[#222222]">Content Generator</h1>
          <p className="text-gray-600 mt-2">
            Generate unique content for your marketing needs
          </p>
        </div>

        <ContentGenerator />
      </div>
    </DashboardLayout>
  );
};

export default Content;