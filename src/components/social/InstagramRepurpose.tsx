import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Download, Wand2 } from "lucide-react";
import { useContentGeneration } from "@/hooks/useContentGeneration";

export const InstagramRepurpose = () => {
  const [instagramUrl, setInstagramUrl] = useState("");
  const [originalContent, setOriginalContent] = useState("");
  const [repurposedContent, setRepurposedContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { generateContent } = useContentGeneration();

  const extractInstagramContent = async (url: string) => {
    setIsLoading(true);
    try {
      // Note: This is a mock implementation. In a real app, you'd need to use Instagram's API
      // or a third-party service to fetch the actual content
      const mockContent = "This is a placeholder for the Instagram content. In a real implementation, you would fetch the actual content from the Instagram post.";
      setOriginalContent(mockContent);
      toast({
        title: "Content Retrieved",
        description: "Instagram content has been downloaded successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to retrieve Instagram content",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const repurposeContent = async () => {
    if (!originalContent) {
      toast({
        title: "Error",
        description: "Please download Instagram content first",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const prompt = `Rewrite the following social media content to make it more professional and business-focused, while maintaining the core message: "${originalContent}"`;
      
      const newContent = await generateContent(prompt);
      if (newContent) {
        setRepurposedContent(newContent);
        toast({
          title: "Success",
          description: "Content has been repurposed successfully",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to repurpose content",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Instagram Content Repurpose</h2>
        <p className="text-sm text-gray-600">
          Enter an Instagram post URL to download and repurpose its content for your business
        </p>

        <div className="flex gap-2">
          <Input
            value={instagramUrl}
            onChange={(e) => setInstagramUrl(e.target.value)}
            placeholder="Enter Instagram post URL..."
            className="flex-1"
          />
          <Button
            onClick={() => extractInstagramContent(instagramUrl)}
            disabled={isLoading || !instagramUrl.trim()}
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Download className="mr-2 h-4 w-4" />
            )}
            Download
          </Button>
        </div>

        {originalContent && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Original Content
              </label>
              <Textarea
                value={originalContent}
                readOnly
                className="min-h-[100px] bg-gray-50"
              />
            </div>

            <Button
              onClick={repurposeContent}
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Wand2 className="mr-2 h-4 w-4" />
              )}
              Repurpose Content
            </Button>

            {repurposedContent && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Repurposed Content
                </label>
                <Textarea
                  value={repurposedContent}
                  className="min-h-[100px]"
                  onChange={(e) => setRepurposedContent(e.target.value)}
                />
              </div>
            )}
          </>
        )}
      </div>
    </Card>
  );
};