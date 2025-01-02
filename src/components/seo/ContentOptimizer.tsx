import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Target, List, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ContentOptimizer = () => {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<null | {
    readabilityScore: number;
    wordCount: number;
    suggestions: string[];
  }>(null);
  const { toast } = useToast();

  const analyzeContent = () => {
    if (!content) {
      toast({
        title: "Error",
        description: "Please enter some content to analyze",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    // Simulate content analysis
    setTimeout(() => {
      const words = content.split(/\s+/).length;
      const sentences = content.split(/[.!?]+/).length;
      const score = Math.min(100, Math.round((words / sentences) * 10));

      const suggestions = [
        "Use shorter sentences for better readability",
        "Include relevant keywords naturally",
        "Break content into smaller paragraphs",
        "Add subheadings to improve structure",
        "Include relevant internal and external links",
      ];

      setAnalysis({
        readabilityScore: score,
        wordCount: words,
        suggestions: suggestions.slice(0, 3 + Math.floor(Math.random() * 3)),
      });
      setLoading(false);
      toast({
        title: "Analysis Complete",
        description: "Content analysis has been completed",
      });
    }, 1500);
  };

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Content Optimizer</h2>
      <div className="space-y-4">
        <Textarea
          placeholder="Enter your content to analyze..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="min-h-[200px]"
        />
        <Button onClick={analyzeContent} disabled={loading}>
          {loading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Target className="mr-2 h-4 w-4" />
          )}
          Analyze Content
        </Button>
        {analysis && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="p-4">
              <h3 className="font-medium mb-2">Content Analysis</h3>
              <div className="space-y-2">
                <p className="text-sm">
                  Readability Score:{" "}
                  <span className="font-bold">{analysis.readabilityScore}/100</span>
                </p>
                <p className="text-sm">
                  Word Count: <span className="font-bold">{analysis.wordCount}</span>
                </p>
              </div>
            </Card>
            <Card className="p-4">
              <h3 className="font-medium mb-2">Suggestions</h3>
              <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                {analysis.suggestions.map((suggestion, index) => (
                  <li key={index}>{suggestion}</li>
                ))}
              </ul>
            </Card>
          </div>
        )}
      </div>
    </Card>
  );
};

export default ContentOptimizer;