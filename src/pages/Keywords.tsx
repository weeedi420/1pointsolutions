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

  const generateKeywordPrompt = (keyword: string) => {
    return `Generate a comprehensive list of 10 highly relevant SEO keywords and search terms related to "${keyword}". 
    Include:
    - Long-tail variations
    - Related search terms
    - Common questions people ask
    - Commercial intent variations
    Format each keyword on a new line.`;
  };

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
      const apiKey = localStorage.getItem("gemini_api_key");
      if (!apiKey) {
        toast({
          title: "Error",
          description: "Please set your Gemini API key in the Content Generator page",
          variant: "destructive",
        });
        return;
      }

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
                text: generateKeywordPrompt(keyword)
              }]
            }]
          })
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
      
      // Split the response into individual keywords and clean them up
      const keywordList = generatedText
        .split('\n')
        .map(k => k.trim())
        .filter(k => k && !k.startsWith('-')); // Remove empty lines and bullet points

      setResults(keywordList);
      
      toast({
        title: "Success",
        description: "Keywords generated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate keywords. Please check your API key and try again.",
        variant: "destructive",
      });
      console.error("Keyword generation error:", error);
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
            Generate relevant keywords using Google's Gemini AI
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