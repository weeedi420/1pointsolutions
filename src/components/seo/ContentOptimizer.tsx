import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Target, List } from "lucide-react";

const ContentOptimizer = () => {
  const [content, setContent] = useState("");
  const [readabilityScore, setReadabilityScore] = useState(0);

  const analyzeContent = () => {
    // Simple readability score calculation (for demonstration)
    const words = content.split(/\s+/).length;
    const sentences = content.split(/[.!?]+/).length;
    const score = Math.round((words / sentences) * 10);
    setReadabilityScore(score);
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
        <Button onClick={analyzeContent}>
          <Target className="mr-2 h-4 w-4" />
          Analyze Content
        </Button>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="p-4">
            <h3 className="font-medium mb-2">Readability Score</h3>
            <p className="text-2xl font-bold">{readabilityScore}</p>
          </Card>
          <Card className="p-4">
            <h3 className="font-medium mb-2">Suggestions</h3>
            <ul className="list-disc list-inside text-sm text-gray-600">
              <li>Use shorter sentences for better readability</li>
              <li>Include relevant keywords naturally</li>
              <li>Break content into smaller paragraphs</li>
            </ul>
          </Card>
        </div>
      </div>
    </Card>
  );
};

export default ContentOptimizer;