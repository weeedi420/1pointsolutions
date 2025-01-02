import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link2, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const BacklinkChecker = () => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<null | {
    totalBacklinks: number;
    domainAuthority: number;
    referringDomains: number;
  }>(null);
  const { toast } = useToast();

  const checkBacklinks = () => {
    if (!url) {
      toast({
        title: "Error",
        description: "Please enter a URL to check backlinks",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setResults({
        totalBacklinks: Math.floor(Math.random() * 1000),
        domainAuthority: Math.floor(Math.random() * 100),
        referringDomains: Math.floor(Math.random() * 100),
      });
      setLoading(false);
      toast({
        title: "Analysis Complete",
        description: "Backlink analysis has been completed",
      });
    }, 2000);
  };

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Backlink Checker</h2>
      <div className="space-y-4">
        <div className="flex gap-2">
          <Input
            placeholder="Enter URL to check backlinks..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <Button onClick={checkBacklinks} disabled={loading}>
            {loading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Link2 className="mr-2 h-4 w-4" />
            )}
            Check Backlinks
          </Button>
        </div>
        {results && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-4">
              <h3 className="font-medium mb-2">Total Backlinks</h3>
              <p className="text-2xl font-bold">{results.totalBacklinks}</p>
            </Card>
            <Card className="p-4">
              <h3 className="font-medium mb-2">Domain Authority</h3>
              <p className="text-2xl font-bold">{results.domainAuthority}</p>
            </Card>
            <Card className="p-4">
              <h3 className="font-medium mb-2">Referring Domains</h3>
              <p className="text-2xl font-bold">{results.referringDomains}</p>
            </Card>
          </div>
        )}
      </div>
    </Card>
  );
};

export default BacklinkChecker;