import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Globe, List } from "lucide-react";

const SitemapGenerator = () => {
  const [url, setUrl] = useState("");
  const [pages, setPages] = useState<string[]>([]);

  const generateSitemap = () => {
    // Demo pages for illustration
    setPages([
      `${url}/home`,
      `${url}/about`,
      `${url}/products`,
      `${url}/contact`,
    ]);
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
          <Button onClick={generateSitemap}>
            <Globe className="mr-2 h-4 w-4" />
            Generate Sitemap
          </Button>
        </div>
        {pages.length > 0 && (
          <Card className="p-4">
            <h3 className="font-medium mb-2">Discovered Pages</h3>
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