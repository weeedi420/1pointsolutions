import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Sparkles } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const AdsOptimizer = () => {
  const [apiKey, setApiKey] = useState("");
  const [campaignData, setCampaignData] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [recommendations, setRecommendations] = useState<string>("");
  const [selectedMetric, setSelectedMetric] = useState("conversions");
  const { toast } = useToast();

  const metrics = [
    { value: "conversions", label: "Conversions" },
    { value: "ctr", label: "Click-Through Rate" },
    { value: "cost", label: "Cost Optimization" },
    { value: "quality", label: "Quality Score" },
  ];

  const analyzeAds = async () => {
    if (!campaignData) {
      toast({
        title: "Error",
        description: "Please enter your campaign data",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: `Analyze this Google Ads campaign data and provide specific recommendations to improve ${selectedMetric}. Focus on actionable insights. Campaign data: ${campaignData}`
              }]
            }]
          })
        }
      );

      if (!response.ok) {
        throw new Error("Failed to get recommendations");
      }

      const data = await response.json();
      const suggestions = data.candidates?.[0]?.content?.parts?.[0]?.text || "No recommendations generated";
      setRecommendations(suggestions);
      
      toast({
        title: "Success",
        description: "Analysis complete! Check the recommendations below.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to analyze campaign data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <Card className="p-6 space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-4">Google Ads Optimizer</h2>
        <p className="text-gray-600">
          Get AI-powered recommendations to improve your Google Ads performance
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Gemini API Key
          </label>
          <Input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Enter your Gemini API key"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Optimization Focus
          </label>
          <Select
            value={selectedMetric}
            onValueChange={setSelectedMetric}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select metric to optimize" />
            </SelectTrigger>
            <SelectContent>
              {metrics.map((metric) => (
                <SelectItem key={metric.value} value={metric.value}>
                  {metric.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Campaign Data
          </label>
          <textarea
            value={campaignData}
            onChange={(e) => setCampaignData(e.target.value)}
            placeholder="Paste your Google Ads campaign data here..."
            className="w-full min-h-[150px] p-3 border rounded-md"
          />
        </div>

        <Button
          onClick={analyzeAds}
          disabled={isAnalyzing}
          className="w-full"
        >
          {isAnalyzing ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Sparkles className="mr-2 h-4 w-4" />
          )}
          {isAnalyzing ? "Analyzing..." : "Get Recommendations"}
        </Button>

        {recommendations && (
          <div className="mt-6">
            <h3 className="text-lg font-medium mb-2">Recommendations:</h3>
            <div className="p-4 bg-gray-50 rounded-md whitespace-pre-wrap">
              {recommendations}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};