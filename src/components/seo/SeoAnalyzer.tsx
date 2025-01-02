import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Search, Globe } from "lucide-react";

const SeoAnalyzer = () => {
  const [url, setUrl] = useState("");
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

    toast({
      title: "Analysis Started",
      description: "Analyzing your URL for SEO metrics...",
    });
    // Here you would typically make an API call to analyze the URL
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card className="p-4">
            <h3 className="font-medium mb-2">Meta Tags</h3>
            <p className="text-sm text-gray-600">Check title, description, and other meta tags</p>
          </Card>
          <Card className="p-4">
            <h3 className="font-medium mb-2">Content Analysis</h3>
            <p className="text-sm text-gray-600">Analyze content quality and structure</p>
          </Card>
          <Card className="p-4">
            <h3 className="font-medium mb-2">Mobile Friendliness</h3>
            <p className="text-sm text-gray-600">Test mobile responsiveness</p>
          </Card>
        </div>
      </div>
    </Card>
  );
};

export default SeoAnalyzer;