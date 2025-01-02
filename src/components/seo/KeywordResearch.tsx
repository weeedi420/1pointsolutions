import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const KeywordResearch = () => {
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Array<{
    keyword: string;
    volume: string;
    difficulty: string;
    cpc: string;
  }>>([]);
  const { toast } = useToast();

  const searchKeywords = () => {
    if (!keyword) {
      toast({
        title: "Error",
        description: "Please enter a keyword to research",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      const variations = [
        keyword,
        `best ${keyword}`,
        `${keyword} guide`,
        `${keyword} tutorial`,
        `how to ${keyword}`,
      ];

      const newResults = variations.map((kw) => ({
        keyword: kw,
        volume: `${Math.floor(Math.random() * 10000)}`,
        difficulty: ["Easy", "Medium", "Hard"][Math.floor(Math.random() * 3)],
        cpc: `$${(Math.random() * 5).toFixed(2)}`,
      }));

      setResults(newResults);
      setLoading(false);
      toast({
        title: "Research Complete",
        description: "Keyword research results are ready",
      });
    }, 1500);
  };

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Keyword Research</h2>
      <div className="space-y-4">
        <div className="flex gap-2">
          <Input
            placeholder="Enter keyword to research..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <Button onClick={searchKeywords} disabled={loading}>
            {loading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Search className="mr-2 h-4 w-4" />
            )}
            Research
          </Button>
        </div>
        {results.length > 0 && (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Keyword</TableHead>
                <TableHead>Monthly Volume</TableHead>
                <TableHead>Difficulty</TableHead>
                <TableHead>CPC</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {results.map((result, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{result.keyword}</TableCell>
                  <TableCell>{result.volume}</TableCell>
                  <TableCell>{result.difficulty}</TableCell>
                  <TableCell>{result.cpc}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </Card>
  );
};

export default KeywordResearch;