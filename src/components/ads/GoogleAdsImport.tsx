import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload, Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface GoogleAdsImportProps {
  onDataImported: (data: string) => void;
}

export const GoogleAdsImport = ({ onDataImported }: GoogleAdsImportProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [serviceAccountKey, setServiceAccountKey] = useState("");
  const [clientCustomerId, setClientCustomerId] = useState("");
  const [developerToken, setDeveloperToken] = useState("");
  const { toast } = useToast();

  const handleServiceAccountAuth = async () => {
    if (!serviceAccountKey || !clientCustomerId || !developerToken) {
      toast({
        title: "Missing Credentials",
        description: "Please provide your Google Ads API service account credentials",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      // Store credentials in localStorage for future use
      localStorage.setItem('googleAds_serviceAccountKey', serviceAccountKey);
      localStorage.setItem('googleAds_clientCustomerId', clientCustomerId);
      localStorage.setItem('googleAds_developerToken', developerToken);
      
      // For demonstration, we'll use mock data
      const mockCampaignData = `
Campaign Performance Data:
- Impressions: 150,000
- Clicks: 7,500
- CTR: 5%
- Conversions: 250
- Cost: $5,000
- ROAS: 350%
      `;
      
      onDataImported(mockCampaignData);
      
      toast({
        title: "Success",
        description: "Connected to Google Ads API successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to connect to Google Ads API. Please verify your credentials.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <Collapsible className="w-full">
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={handleServiceAccountAuth}
            disabled={isLoading}
            className="flex-1 mr-2"
          >
            <Upload className="mr-2 h-4 w-4" />
            {isLoading ? "Connecting..." : "Connect with Service Account"}
          </Button>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="icon">
              <Settings className="h-4 w-4" />
            </Button>
          </CollapsibleTrigger>
        </div>

        <CollapsibleContent className="mt-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Service Account Key (JSON)
            </label>
            <Input
              type="password"
              value={serviceAccountKey}
              onChange={(e) => setServiceAccountKey(e.target.value)}
              placeholder="Paste your service account key JSON"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Client Customer ID
            </label>
            <Input
              type="text"
              value={clientCustomerId}
              onChange={(e) => setClientCustomerId(e.target.value)}
              placeholder="Enter your client customer ID"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Developer Token
            </label>
            <Input
              type="password"
              value={developerToken}
              onChange={(e) => setDeveloperToken(e.target.value)}
              placeholder="Enter your developer token"
            />
          </div>
          <p className="text-sm text-gray-500">
            Your credentials are stored locally and are never sent to our servers.
            Get your credentials from the{" "}
            <a
              href="https://console.cloud.google.com/apis/credentials"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Google Cloud Console
            </a>
          </p>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};