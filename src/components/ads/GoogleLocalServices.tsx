
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Settings, Upload, Sparkles } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useContentGeneration } from "@/hooks/useContentGeneration";

interface LocalServicesData {
  impressions: number;
  clicks: number;
  conversions: number;
  cost: number;
  leadQualityScore: string;
}

const MOCK_LOCAL_SERVICES_DATA: LocalServicesData = {
  impressions: 15789,
  clicks: 823,
  conversions: 142,
  cost: 3567,
  leadQualityScore: "Excellent"
};

const MOCK_OPTIMIZATION_TIPS = `Based on your Local Services Ads performance:

1. Increase budget allocation during peak hours (8-10 AM, 4-6 PM)
2. Focus on responding to leads within 5 minutes to improve lead quality score
3. Update business hours to capture more emergency service requests
4. Add more service categories to expand reach
5. Improve response rate to maintain "Excellent" quality score`;

export const GoogleLocalServices = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [accountId, setAccountId] = useState("");
  const [localServicesData, setLocalServicesData] = useState<LocalServicesData | null>(null);
  const [optimizationTips, setOptimizationTips] = useState<string>("");
  const { toast } = useToast();

  const handleConnect = async () => {
    if (!apiKey || !accountId) {
      toast({
        title: "Missing Credentials",
        description: "Please provide your Google Local Services API credentials",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      localStorage.setItem('localServices_apiKey', apiKey);
      localStorage.setItem('localServices_accountId', accountId);
      
      setLocalServicesData(MOCK_LOCAL_SERVICES_DATA);
      setOptimizationTips(MOCK_OPTIMIZATION_TIPS);
      
      toast({
        title: "Success",
        description: "Connected to Google Local Services Ads",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to connect to Google Local Services Ads",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleTestData = () => {
    setLocalServicesData(MOCK_LOCAL_SERVICES_DATA);
    setOptimizationTips(MOCK_OPTIMIZATION_TIPS);
    toast({
      title: "Test Data Loaded",
      description: "Mock Local Services data has been loaded successfully",
    });
  };

  return (
    <Card className="p-6 space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-4">Google Local Services Ads</h2>
        <p className="text-gray-600">
          Connect your Local Services Ads account to get AI-powered optimization recommendations
        </p>
      </div>

      <Collapsible className="w-full">
        <div className="flex items-center justify-between gap-2">
          <Button
            variant="outline"
            onClick={handleConnect}
            disabled={isLoading}
            className="flex-1"
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Upload className="mr-2 h-4 w-4" />
            )}
            {isLoading ? "Connecting..." : "Connect Local Services Ads"}
          </Button>
          <Button
            variant="secondary"
            onClick={handleTestData}
            className="flex-none"
          >
            <Sparkles className="mr-2 h-4 w-4" />
            Test Data
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
              API Key
            </label>
            <Input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Enter your Google Local Services API Key"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Account ID
            </label>
            <Input
              type="text"
              value={accountId}
              onChange={(e) => setAccountId(e.target.value)}
              placeholder="Enter your Account ID"
            />
          </div>
        </CollapsibleContent>
      </Collapsible>

      {localServicesData && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-4">
              <h3 className="text-sm font-medium text-gray-500">Impressions</h3>
              <p className="text-2xl font-bold mt-1">{localServicesData.impressions.toLocaleString()}</p>
            </Card>
            <Card className="p-4">
              <h3 className="text-sm font-medium text-gray-500">Clicks</h3>
              <p className="text-2xl font-bold mt-1">{localServicesData.clicks.toLocaleString()}</p>
            </Card>
            <Card className="p-4">
              <h3 className="text-sm font-medium text-gray-500">Conversions</h3>
              <p className="text-2xl font-bold mt-1">{localServicesData.conversions.toLocaleString()}</p>
            </Card>
          </div>

          {optimizationTips && (
            <Card className="p-4">
              <h3 className="text-lg font-semibold mb-2">AI Optimization Recommendations</h3>
              <div className="prose prose-sm max-w-none whitespace-pre-line">
                {optimizationTips}
              </div>
            </Card>
          )}
        </div>
      )}
    </Card>
  );
};
