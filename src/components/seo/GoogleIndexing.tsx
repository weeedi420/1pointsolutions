import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Globe, Trash2 } from "lucide-react";

const GoogleIndexing = () => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const [sitemapUrl, setSitemapUrl] = useState("");

  const handleIndex = async (type: "URL_UPDATED" | "URL_DELETED") => {
    if (!url) {
      toast({
        title: "Error",
        description: "Please enter a URL",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const apiKey = localStorage.getItem("google_indexing_api_key");
      if (!apiKey) {
        toast({
          title: "Error",
          description: "Please set your Google Indexing API key in settings",
          variant: "destructive",
        });
        return;
      }

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

    setLoading(true);
    try {
      const apiKey = localStorage.getItem("google_indexing_api_key");
      if (!apiKey) {
        toast({
          title: "Error",
          description: "Please set your Google Indexing API key in settings",
          variant: "destructive",
        });
        return;
      }

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
      <h2 className="text-xl font-semibold mb-4">Google Indexing</h2>
      <Tabs defaultValue="url" className="space-y-4">
        <TabsList>
          <TabsTrigger value="url">Single URL</TabsTrigger>
          <TabsTrigger value="sitemap">Sitemap</TabsTrigger>
        </TabsList>

        <TabsContent value="url" className="space-y-4">
          <div className="space-y-4">
            <Input
              placeholder="Enter URL to index/deindex..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <div className="flex gap-2">
              <Button
                onClick={() => handleIndex("URL_UPDATED")}
                disabled={loading}
                className="flex-1"
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
                className="flex-1"
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
    </Card>
  );
};

export default GoogleIndexing;