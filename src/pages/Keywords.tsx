import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Search } from "lucide-react";

const Keywords = () => {
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const searchKeywords = async () => {
    if (!keyword.trim()) {
      toast({
        title: "Error",
        description: "Please enter a keyword",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      // For demo purposes, we're generating mock related keywords
      // In production, you'd want to use a keyword research API
      const mockResults = [
        keyword + " examples",
        keyword + " tutorial",
        keyword + " guide",
        "best " + keyword,
        keyword + " tips",
      ];
      
      setResults(mockResults);
      toast({
        title: "Success",
        description: "Keywords found successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to search keywords",
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
          <h1 className="text-3xl font-bold text-[#222222]">Keyword Research</h1>
          <p className="text-gray-600 mt-2">
            Find relevant keywords for your content
          </p>
        </div>

        <Card className="p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Enter a keyword
              </label>
              <div className="flex gap-2">
                <Input
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  placeholder="Enter a keyword to research..."
                  className="flex-1"
                />
                <Button
                  onClick={searchKeywords}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Search className="mr-2 h-4 w-4" />
                  )}
                  Search
                </Button>
              </div>
            </div>

            {results.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-2">Related Keywords:</h3>
                <div className="space-y-2">
                  {results.map((result, index) => (
                    <div
                      key={index}
                      className="p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors"
                    >
                      {result}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Keywords;