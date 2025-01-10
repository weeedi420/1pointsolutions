import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Globe, Trash2, Key, ExternalLink } from "lucide-react";

const GoogleIndexing = () => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const [sitemapUrl, setSitemapUrl] = useState("");
  const [apiKey, setApiKey] = useState(localStorage.getItem("google_indexing_api_key") || "");

  const handleApiKeyChange = (newKey: string) => {
    setApiKey(newKey);
    localStorage.setItem("google_indexing_api_key", newKey);
  };

  const handleIndex = async (type: "URL_UPDATED" | "URL_DELETED") => {
    if (!url) {
      toast({
        title: "Error",
        description: "Please enter a URL",
        variant: "destructive",
      });
      return;
    }

    if (!apiKey) {
      toast({
        title: "Error",
        description: "Please enter your Google Indexing API key",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `https://indexing.googleapis.com/v3/urlNotifications:publish`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            url: url,
            type: type,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit URL for indexing");
      }

      toast({
        title: "Success",
        description:
          type === "URL_UPDATED"
            ? "URL submitted for indexing"
            : "URL submitted for removal from index",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process request",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSitemapSubmit = async () => {
    if (!sitemapUrl) {
      toast({
        title: "Error",
        description: "Please enter a sitemap URL",
        variant: "destructive",
      });
      return;
    }

    if (!apiKey) {
      toast({
        title: "Error",
        description: "Please enter your Google Indexing API key",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      // Fetch the sitemap
      const response = await fetch(sitemapUrl);
      const text = await response.text();
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(text, "text/xml");
      const urls = Array.from(xmlDoc.getElementsByTagName("loc")).map(
        (loc) => loc.textContent
      );

      // Process each URL
      let successCount = 0;
      let failCount = 0;

      for (const url of urls) {
        if (!url) continue;
        
        try {
          await fetch(
            `https://indexing.googleapis.com/v3/urlNotifications:publish`,
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${apiKey}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                url: url,
                type: "URL_UPDATED",
              }),
            }
          );
          successCount++;
        } catch {
          failCount++;
        }
      }

      toast({
        title: "Sitemap Processing Complete",
        description: `Successfully processed ${successCount} URLs. Failed: ${failCount}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process sitemap",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold">Google Indexing</h2>
          <div className="mt-2 text-sm text-gray-600 space-y-2">
            <p>To use this tool, you'll need a Google Indexing API key. Here's how to get one:</p>
            <ol className="list-decimal list-inside space-y-1">
              <li>Go to the <a href="https://console.cloud.google.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center">Google Cloud Console <ExternalLink className="ml-1 h-3 w-3" /></a></li>
              <li>Create a new project or select an existing one</li>
              <li>Enable the Indexing API for your project</li>
              <li>Create credentials (Service Account Key)</li>
              <li>Download the JSON file and copy the "private_key" value</li>
            </ol>
          </div>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="apiKey" className="text-sm font-medium">
            Google Indexing API Key
          </label>
          <div className="flex items-center gap-2">
            <Input
              id="apiKey"
              type="password"
              placeholder="Enter your Google Indexing API key..."
              value={apiKey}
              onChange={(e) => handleApiKeyChange(e.target.value)}
              className="flex-1"
            />
            <Key className="text-gray-400" size={20} />
          </div>
        </div>

        <Tabs defaultValue="url" className="space-y-4">
          <TabsList className="w-full">
            <TabsTrigger value="url" className="flex-1">Single URL</TabsTrigger>
            <TabsTrigger value="sitemap" className="flex-1">Sitemap</TabsTrigger>
          </TabsList>

          <TabsContent value="url" className="space-y-4">
            <div className="space-y-4">
              <div className="text-sm text-gray-600">
                <p>Use this section to index or remove individual URLs from Google's index.</p>
              </div>
              <Input
                placeholder="Enter URL to index/deindex..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
              <div className="grid grid-cols-2 gap-4">
                <Button
                  onClick={() => handleIndex("URL_UPDATED")}
                  disabled={loading}
                  className="w-full"
                >
                  {loading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Globe className="mr-2 h-4 w-4" />
                  )}
                  Index URL
                </Button>
                <Button
                  onClick={() => handleIndex("URL_DELETED")}
                  disabled={loading}
                  variant="destructive"
                  className="w-full"
                >
                  {loading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Trash2 className="mr-2 h-4 w-4" />
                  )}
                  Deindex URL
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="sitemap" className="space-y-4">
            <div className="space-y-4">
              <div className="text-sm text-gray-600">
                <p>Submit your sitemap URL to process multiple URLs at once. All URLs in the sitemap will be submitted for indexing.</p>
              </div>
              <Input
                placeholder="Enter sitemap URL..."
                value={sitemapUrl}
                onChange={(e) => setSitemapUrl(e.target.value)}
              />
              <Button
                onClick={handleSitemapSubmit}
                disabled={loading}
                className="w-full"
              >
                {loading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Globe className="mr-2 h-4 w-4" />
                )}
                Process Sitemap
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Card>
  );
};

export default GoogleIndexing;