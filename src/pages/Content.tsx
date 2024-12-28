import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

const Content = () => {
  const [prompt, setPrompt] = useState("");
  const [generatedContent, setGeneratedContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const generateContent = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Error",
        description: "Please enter a prompt",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      // Using JSONPlaceholder API for demo purposes
      const response = await fetch("https://jsonplaceholder.typicode.com/posts/1");
      const data = await response.json();
      
      // Format the content nicely
      const formattedContent = `Title: ${data.title}\n\n${data.body}\n\nGenerated based on prompt: "${prompt}"`;
      setGeneratedContent(formattedContent);
      
      toast({
        title: "Success",
        description: "Content generated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate content. Please try again.",
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
            Generate unique content for your marketing needs
          </p>
        </div>

        <Card className="p-6">
          <div className="space-y-4">
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