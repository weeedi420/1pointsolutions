import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Users } from "lucide-react";

const Social = () => {
  const [username, setUsername] = useState("");
  const [analysis, setAnalysis] = useState<null | {
    followers: number;
    engagement: string;
    sentiment: string;
  }>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const analyzeSocial = async () => {
    if (!username.trim()) {
      toast({
        title: "Error",
        description: "Please enter a username",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      // For demo purposes, we're generating mock social analysis data
      // In production, you'd want to use a social media analysis API
      const mockAnalysis = {
        followers: Math.floor(Math.random() * 10000),
        engagement: Math.random() > 0.5 ? "High" : "Medium",
        sentiment: Math.random() > 0.5 ? "Positive" : "Neutral",
      };
      
      setAnalysis(mockAnalysis);
      toast({
        title: "Success",
        description: "Social analysis completed",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to analyze social profile",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-[#222222]">Social Analysis</h1>
          <p className="text-gray-600 mt-2">
            Analyze social media profiles and engagement
          </p>
        </div>

        <Card className="p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Enter username
              </label>
              <div className="flex gap-2">
                <Input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter a social media username..."
                  className="flex-1"
                />
                <Button
                  onClick={analyzeSocial}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Users className="mr-2 h-4 w-4" />
                  )}
                  Analyze
                </Button>
              </div>
            </div>

            {analysis && (
              <div className="mt-6 grid gap-4 md:grid-cols-3">
                <Card className="p-4">
                  <h4 className="text-sm font-medium text-gray-500">Followers</h4>
                  <p className="text-2xl font-bold mt-1">{analysis.followers.toLocaleString()}</p>
                </Card>
                <Card className="p-4">
                  <h4 className="text-sm font-medium text-gray-500">Engagement</h4>
                  <p className="text-2xl font-bold mt-1">{analysis.engagement}</p>
                </Card>
                <Card className="p-4">
                  <h4 className="text-sm font-medium text-gray-500">Sentiment</h4>
                  <p className="text-2xl font-bold mt-1">{analysis.sentiment}</p>
                </Card>
              </div>
            )}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Social;