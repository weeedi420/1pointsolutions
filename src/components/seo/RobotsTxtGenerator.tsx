import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Database, Download, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const RobotsTxtGenerator = () => {
  const [siteUrl, setSiteUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [robotsTxt, setRobotsTxt] = useState("");
  const { toast } = useToast();

  const generateRobotsTxt = () => {
    if (!siteUrl) {
      toast({
        title: "Error",
        description: "Please enter a website URL",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    // Simulate generation
    setTimeout(() => {
      const template = `User-agent: *
Allow: /
Disallow: /private/
Disallow: /admin/
Disallow: /wp-admin/
Disallow: /tmp/
Disallow: /cgi-bin/

# Block specific file types
Disallow: /*.pdf$
Disallow: /*.doc$
Disallow: /*.docx$
Disallow: /*.xls$
Disallow: /*.xlsx$

# Allow search engines to crawl images
Allow: /images/
Allow: /assets/img/

# Crawl delay
Crawl-delay: 10

# Sitemap location
Sitemap: ${siteUrl.replace(/\/$/, "")}/sitemap.xml`;
      
      setRobotsTxt(template);
      setLoading(false);
      toast({
        title: "Generated Successfully",
        description: "robots.txt content has been generated",
      });
    }, 1500);
  };

  const downloadRobotsTxt = () => {
    const blob = new Blob([robotsTxt], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'robots.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Robots.txt Generator</h2>
      <div className="space-y-4">
        <div className="flex gap-2">
          <Input
            placeholder="Enter your website URL..."
            value={siteUrl}
            onChange={(e) => setSiteUrl(e.target.value)}
          />
          <Button onClick={generateRobotsTxt} disabled={loading}>
            {loading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Database className="mr-2 h-4 w-4" />
            )}
            Generate
          </Button>
        </div>
        {robotsTxt && (
          <Card className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium">Generated Robots.txt</h3>
              <Button variant="outline" onClick={downloadRobotsTxt}>
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
            </div>
            <Textarea
              value={robotsTxt}
              readOnly
              className="font-mono text-sm h-[300px]"
            />
          </Card>
        )}
      </div>
    </Card>
  );
};

export default RobotsTxtGenerator;