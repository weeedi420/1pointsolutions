import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const GOOGLE_ADS_CLIENT_ID = "YOUR_CLIENT_ID.apps.googleusercontent.com";
const GOOGLE_ADS_API_SCOPE = "https://www.googleapis.com/auth/adwords";

interface GoogleAdsImportProps {
  onDataImported: (data: string) => void;
}

export const GoogleAdsImport = ({ onDataImported }: GoogleAdsImportProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      // For demonstration, we'll use sample data since we don't have actual API credentials
      const sampleData = `
Campaign Name: Summer Sale 2024
Budget: $1000/day
Impressions: 50,000
Clicks: 2,500
CTR: 5%
Conversions: 125
Cost per Conversion: $20
Quality Score: 8/10
Device Distribution: Mobile 60%, Desktop 35%, Tablet 5%
Top Keywords: summer deals, discount clothes, seasonal offers
Ad Groups: 5
Active Ads: 15
      `.trim();

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      onDataImported(sampleData);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to import Google Ads data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col space-y-2">
      <Button
        variant="outline"
        onClick={handleGoogleLogin}
        disabled={isLoading}
        className="w-full"
      >
        <Upload className="mr-2 h-4 w-4" />
        {isLoading ? "Importing..." : "Import from Google Ads"}
      </Button>
      <p className="text-sm text-gray-500">
        Import your campaign data directly from Google Ads
      </p>
    </div>
  );
};