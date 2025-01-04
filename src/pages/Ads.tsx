import DashboardLayout from "@/components/layout/DashboardLayout";
import { AdsOptimizer } from "@/components/ads/AdsOptimizer";
import { GoogleLocalServices } from "@/components/ads/GoogleLocalServices";
import { AdsGuide } from "@/components/ads/AdsGuide";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

const Ads = () => {
  const openGoogleAds = () => {
    window.open('https://ads.google.com', '_blank');
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-[#222222]">Google Ads Optimization</h1>
            <p className="text-gray-600 mt-2">
              Optimize your ad campaigns with AI-powered recommendations
            </p>
          </div>
          <Button onClick={openGoogleAds} variant="outline">
            <ExternalLink className="mr-2 h-4 w-4" />
            Open Google Ads
          </Button>
        </div>

        <AdsGuide />
        <AdsOptimizer />
        <GoogleLocalServices />
      </div>
    </DashboardLayout>
  );
};

export default Ads;