import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search } from "lucide-react";

const KeywordResearch = () => {
  const [keyword, setKeyword] = useState("");
  const [results] = useState([
    { keyword: "digital marketing", volume: "10K-100K", difficulty: "Medium", cpc: "$2.50" },
    { keyword: "seo tools", volume: "1K-10K", difficulty: "Low", cpc: "$1.80" },
    { keyword: "website optimization", volume: "5K-50K", difficulty: "High", cpc: "$3.20" },
  ]);

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
          <Button>
            <Search className="mr-2 h-4 w-4" />
            Research
          </Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Keyword</TableHead>
              <TableHead>Search Volume</TableHead>
              <TableHead>Difficulty</TableHead>
              <TableHead>CPC</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {results.map((result, index) => (
              <TableRow key={index}>
                <TableCell>{result.keyword}</TableCell>
                <TableCell>{result.volume}</TableCell>
                <TableCell>{result.difficulty}</TableCell>
                <TableCell>{result.cpc}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};

export default KeywordResearch;