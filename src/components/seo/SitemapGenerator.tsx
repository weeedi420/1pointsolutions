import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Globe, List, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SitemapGenerator = () => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [pages, setPages] = useState<string[]>([]);
  const { toast } = useToast();

  const generateSitemap = () => {
    if (!url) {
      toast({
        title: "Error",
        description: "Please enter a website URL",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    // Simulate sitemap generation
    setTimeout(() => {
      const commonPages = [
        "home",
        "about",
        "products",
        "services",
        "blog",
        "contact",
      ];

      const generatedPages = commonPages.map(
        (page) => `${url.replace(/\/$/, "")}/${page}`
      );
      setPages(generatedPages);
      setLoading(false);

      toast({
        title: "Sitemap Generated",
        description: "Your sitemap has been generated successfully",
      });
    }, 2000);
  };

  const downloadSitemap = () => {
    const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map((page) => `  <url>
    <loc>${page}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`).join('\n')}
</urlset>`;

    const blob = new Blob([xmlContent], { type: 'text/xml' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sitemap.xml';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Sitemap Generator</h2>
      <div className="space-y-4">
        <div className="flex gap-2">
          <Input
            placeholder="Enter your website URL..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <Button onClick={generateSitemap} disabled={loading}>
            {loading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Globe className="mr-2 h-4 w-4" />
            )}
            Generate Sitemap
          </Button>
        </div>
        {pages.length > 0 && (
          <Card className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium">Discovered Pages</h3>
              <Button variant="outline" onClick={downloadSitemap}>
                Download Sitemap
              </Button>
            </div>
            <ul className="space-y-2">
              {pages.map((page, index) => (
                <li key={index} className="flex items-center text-sm">
                  <List className="mr-2 h-4 w-4 text-gray-500" />
                  {page}
                </li>
              ))}
            </ul>
          </Card>
        )}
      </div>
    </Card>
  );
};

export default SitemapGenerator;