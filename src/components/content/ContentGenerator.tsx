import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { ContentTypeSelector } from "./ContentTypeSelector";
import { useContentGeneration } from "@/hooks/useContentGeneration";

export const ContentGenerator = () => {
  const [prompt, setPrompt] = useState("");
  const [generatedContent, setGeneratedContent] = useState("");
  const [topic, setTopic] = useState("");
  const { toast } = useToast();
  const { generateContent, isLoading } = useContentGeneration();

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Error",
        description: "Please enter a topic and select a content type",
        variant: "destructive",
      });
      return;
    }

    const content = await generateContent(prompt);
    if (content) {
      setGeneratedContent(content);
      toast({
        title: "Success",
        description: "Content generated successfully",
      });
    }
  };

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <ContentTypeSelector
          topic={topic}
          setTopic={setTopic}
          setPrompt={setPrompt}
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Generated Prompt
          </label>
          <Textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Your prompt will appear here..."
            className="min-h-[100px]"
          />
        </div>

        <Button
          onClick={handleGenerate}
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
  );
};