import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Globe, BarChart3, Search } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Analytics = () => {
  const [url, setUrl] = useState("");
  const [analytics, setAnalytics] = useState<null | {
    pageViews: number;
    visitors: number;
    bounceRate: string;
    avgTimeOnSite: string;
    trafficData: Array<{ date: string; visitors: number }>;
  }>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const analyzeWebsite = async () => {
    if (!url.trim()) {
      toast({
        title: "Error",
        description: "Please enter a website URL",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      // For demo purposes, generating mock analytics data
      // In production, you'd integrate with an analytics API
      const mockAnalytics = {
        pageViews: Math.floor(Math.random() * 50000),
        visitors: Math.floor(Math.random() * 25000),
        bounceRate: `${Math.floor(Math.random() * 30 + 40)}%`,
        avgTimeOnSite: `${Math.floor(Math.random() * 3 + 1)}m ${Math.floor(
          Math.random() * 60
        )}s`,
        trafficData: Array.from({ length: 7 }, (_, i) => ({
          date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toLocaleDateString(),
          visitors: Math.floor(Math.random() * 1000 + 500),
        })).reverse(),
      };
      
      setAnalytics(mockAnalytics);
      toast({
        title: "Success",
        description: "Website analysis completed",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to analyze website",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const connectGoogleAnalytics = () => {
    window.open('https://analytics.google.com/analytics/web/', '_blank');
    toast({
      title: "Info",
      description: "Please set up Google Analytics for your website and return here with your tracking ID",
    });
  };

  const connectSearchConsole = () => {
    window.open('https://search.google.com/search-console', '_blank');
    toast({
      title: "Info",
      description: "Please verify your website in Search Console and return here to connect",
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-[#222222]">Website Analytics</h1>
          <p className="text-gray-600 mt-2">
            Analyze your website traffic and performance metrics
          </p>
        </div>

        <Card className="p-6">
          <Tabs defaultValue="basic" className="space-y-4">
            <TabsList>
              <TabsTrigger value="basic">Basic Analysis</TabsTrigger>
              <TabsTrigger value="google">Google Integration</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-4">
              <div className="flex gap-2">
                <Input
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="Enter your website URL (e.g., https://example.com)"
                  className="flex-1"
                />
                <Button
                  onClick={analyzeWebsite}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Globe className="mr-2 h-4 w-4" />
                  )}
                  Analyze
                </Button>
              </div>

              {analytics && (
                <div className="mt-6 space-y-6">
                  <div className="grid gap-4 md:grid-cols-4">
                    <Card className="p-4">
                      <h4 className="text-sm font-medium text-gray-500">Page Views</h4>
                      <p className="text-2xl font-bold mt-1">{analytics.pageViews.toLocaleString()}</p>
                    </Card>
                    <Card className="p-4">
                      <h4 className="text-sm font-medium text-gray-500">Visitors</h4>
                      <p className="text-2xl font-bold mt-1">{analytics.visitors.toLocaleString()}</p>
                    </Card>
                    <Card className="p-4">
                      <h4 className="text-sm font-medium text-gray-500">Bounce Rate</h4>
                      <p className="text-2xl font-bold mt-1">{analytics.bounceRate}</p>
                    </Card>
                    <Card className="p-4">
                      <h4 className="text-sm font-medium text-gray-500">Avg. Time on Site</h4>
                      <p className="text-2xl font-bold mt-1">{analytics.avgTimeOnSite}</p>
                    </Card>
                  </div>

                  <Card className="p-4">
                    <h3 className="text-lg font-semibold mb-4">Traffic Trend</h3>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={analytics.trafficData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="date" />
                          <YAxis />
                          <Tooltip />
                          <Line
                            type="monotone"
                            dataKey="visitors"
                            stroke="#0FA0CE"
                            strokeWidth={2}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </Card>
                </div>
              )}
            </TabsContent>

            <TabsContent value="google" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Card className="p-6">
                  <div className="flex items-center gap-4">
                    <BarChart3 className="h-8 w-8 text-[#0FA0CE]" />
                    <div>
                      <h3 className="text-lg font-semibold">Google Analytics</h3>
                      <p className="text-sm text-gray-600">Connect to view detailed visitor analytics</p>
                    </div>
                  </div>
                  <Button onClick={connectGoogleAnalytics} className="mt-4">
                    Connect Analytics
                  </Button>
                </Card>

                <Card className="p-6">
                  <div className="flex items-center gap-4">
                    <Search className="h-8 w-8 text-[#0FA0CE]" />
                    <div>
                      <h3 className="text-lg font-semibold">Search Console</h3>
                      <p className="text-sm text-gray-600">Monitor your search performance</p>
                    </div>
                  </div>
                  <Button onClick={connectSearchConsole} className="mt-4">
                    Connect Search Console
                  </Button>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Analytics;