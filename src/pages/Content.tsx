import { useState, useEffect } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Key } from "lucide-react";

const Content = () => {
  const [prompt, setPrompt] = useState("");
  const [generatedContent, setGeneratedContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const { toast } = useToast();

  // Load API key from localStorage on component mount
  useEffect(() => {
    const savedApiKey = localStorage.getItem("gemini_api_key");
    if (savedApiKey) {
      setApiKey(savedApiKey);
    }
  }, []);

  // Save API key to localStorage when it changes
  const handleApiKeyChange = (newKey: string) => {
    setApiKey(newKey);
    localStorage.setItem("gemini_api_key", newKey);
  };

  const generateContent = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Error",
        description: "Please enter a prompt",
        variant: "destructive",
      });
      return;
    }

    if (!apiKey) {
      toast({
        title: "Error",
        description: "Please enter your Gemini API key",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
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
                text: prompt
              }]
            }]
          })
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text || "No content generated";
      setGeneratedContent(generatedText);
      
      toast({
        title: "Success",
        description: "Content generated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate content. Please check your API key and try again.",
        variant: "destructive",
      });
      console.error("Content generation error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-[#222222]">Content Generator</h1>
          <p className="text-gray-600 mt-2">
            Generate unique content using Google's Gemini AI
          </p>
        </div>

        <Card className="p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gemini API Key
              </label>
              <div className="flex gap-2">
                <Input
                  type="password"
                  value={apiKey}
                  onChange={(e) => handleApiKeyChange(e.target.value)}
                  placeholder="Enter your Gemini API key"
                  className="flex-1"
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => window.open("https://makersuite.google.com/app/apikey", "_blank")}
                  title="Get API Key"
                >
                  <Key className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Enter your prompt
              </label>
              <Textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Enter what kind of content you want to generate..."
                className="min-h-[100px]"
              />
            </div>

            <Button
              onClick={generateContent}
              disabled={isLoading}
              className="w-full"
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Generate Content
            </Button>

            {generatedContent && (
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-2">Generated Content:</h3>
                <div className="p-4 bg-gray-50 rounded-md whitespace-pre-wrap">
                  {generatedContent}
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Content;