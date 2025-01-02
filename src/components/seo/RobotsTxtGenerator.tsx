import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Database } from "lucide-react";

const RobotsTxtGenerator = () => {
  const [siteUrl, setSiteUrl] = useState("");
  const [robotsTxt, setRobotsTxt] = useState("");

  const generateRobotsTxt = () => {
    const template = `User-agent: *
Allow: /
Disallow: /private/
Disallow: /admin/
Disallow: /wp-admin/

Sitemap: ${siteUrl}/sitemap.xml`;
    
    setRobotsTxt(template);
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
          <Button onClick={generateRobotsTxt}>
            <Database className="mr-2 h-4 w-4" />
            Generate Robots.txt
          </Button>
        </div>
        {robotsTxt && (
          <Card className="p-4">
            <h3 className="font-medium mb-2">Generated Robots.txt</h3>
            <Textarea
              value={robotsTxt}
              readOnly
              className="font-mono text-sm h-[200px]"
            />
          </Card>
        )}
      </div>
    </Card>
  );
};

export default RobotsTxtGenerator;