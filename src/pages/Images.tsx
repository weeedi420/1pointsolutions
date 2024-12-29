import DashboardLayout from "@/components/layout/DashboardLayout";
import { ImageOptimizer } from "@/components/images/ImageOptimizer";
import { ImageGenerator } from "@/components/images/ImageGenerator";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

const Images = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-[#222222]">Image Tools</h1>
          <p className="text-gray-600 mt-2">
            Optimize and generate images using AI
          </p>
        </div>

        <Tabs defaultValue="optimize" className="space-y-4">
          <TabsList>
            <TabsTrigger value="optimize">Optimize Image</TabsTrigger>
            <TabsTrigger value="generate">Generate Image</TabsTrigger>
          </TabsList>

          <TabsContent value="optimize">
            <ImageOptimizer />
          </TabsContent>

          <TabsContent value="generate">
            <ImageGenerator />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Images;