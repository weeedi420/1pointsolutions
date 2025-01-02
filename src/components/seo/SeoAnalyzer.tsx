import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Search, Globe, CheckCircle, XCircle, AlertCircle } from "lucide-react";

const SeoAnalyzer = () => {
  const [url, setUrl] = useState("");
  const [results, setResults] = useState<null | {
    metaTags: boolean;
    mobileResponsive: boolean;
    loadSpeed: string;
  }>(null);
  const { toast } = useToast();

  const analyzeSeo = () => {
    if (!url) {
      toast({
        title: "Error",
        description: "Please enter a URL to analyze",
        variant: "destructive",
      });
      return;
    }

    // Simulate SEO analysis
    setResults({
      metaTags: Math.random() > 0.5,
      mobileResponsive: Math.random() > 0.3,
      loadSpeed: ["Fast", "Medium", "Slow"][Math.floor(Math.random() * 3)],
    });

    toast({
      title: "Analysis Complete",
      description: "SEO analysis has been completed successfully",
    });
  };

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">SEO Analyzer</h2>
      <div className="space-y-4">
        <div className="flex gap-2">
          <Input
            placeholder="Enter URL to analyze..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <Button onClick={analyzeSeo}>
            <Search className="mr-2 h-4 w-4" />
            Analyze
          </Button>
        </div>
        {results && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-4">
              <h3 className="font-medium mb-2 flex items-center gap-2">
                Meta Tags
                {results.metaTags ? (
                  <CheckCircle className="h-4 w-4 text-green-500" />
                ) : (
                  <XCircle className="h-4 w-4 text-red-500" />
                )}
              </h3>
              <p className="text-sm text-gray-600">
                {results.metaTags
                  ? "Meta tags are properly configured"
                  : "Meta tags need improvement"}
              </p>
            </Card>
            <Card className="p-4">
              <h3 className="font-medium mb-2 flex items-center gap-2">
                Mobile Responsiveness
                {results.mobileResponsive ? (
                  <CheckCircle className="h-4 w-4 text-green-500" />
                ) : (
                  <AlertCircle className="h-4 w-4 text-yellow-500" />
                )}
              </h3>
              <p className="text-sm text-gray-600">
                {results.mobileResponsive
                  ? "Site is mobile-friendly"
                  : "Mobile optimization needed"}
              </p>
            </Card>
            <Card className="p-4">
              <h3 className="font-medium mb-2">Load Speed</h3>
              <p className="text-sm text-gray-600">Page load speed: {results.loadSpeed}</p>
            </Card>
          </div>
        )}
      </div>
    </Card>
  );
};

export default SeoAnalyzer;