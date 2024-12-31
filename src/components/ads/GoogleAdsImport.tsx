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
  const [clientId, setClientId] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [developerToken, setDeveloperToken] = useState("");
  const { toast } = useToast();

  const handleGoogleLogin = async () => {
    if (!clientId || !clientSecret || !developerToken) {
      toast({
        title: "Missing Credentials",
        description: "Please provide your Google Ads API credentials in the settings below",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      // Store credentials in localStorage for future use
      localStorage.setItem('googleAds_clientId', clientId);
      localStorage.setItem('googleAds_clientSecret', clientSecret);
      localStorage.setItem('googleAds_developerToken', developerToken);
      
      // For now, we'll just show a success message without actual data import
      toast({
        title: "Authentication Required",
        description: "Please complete the Google OAuth flow to import your data",
      });
      
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
    <div className="space-y-4">
      <Collapsible className="w-full">
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="flex-1 mr-2"
          >
            <Upload className="mr-2 h-4 w-4" />
            {isLoading ? "Importing..." : "Import from Google Ads"}
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
              Client ID
            </label>
            <Input
              type="text"
              value={clientId}
              onChange={(e) => setClientId(e.target.value)}
              placeholder="Enter your Google Ads Client ID"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Client Secret
            </label>
            <Input
              type="password"
              value={clientSecret}
              onChange={(e) => setClientSecret(e.target.value)}
              placeholder="Enter your Google Ads Client Secret"
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
              placeholder="Enter your Google Ads Developer Token"
            />
          </div>
          <p className="text-sm text-gray-500">
            Your credentials are stored locally and are never sent to our servers.
            Get your credentials from the{" "}
            <a
              href="https://developers.google.com/google-ads/api/docs/first-call/oauth-cloud"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Google Ads API Console
            </a>
          </p>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};