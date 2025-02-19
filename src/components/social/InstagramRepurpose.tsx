import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Download, Wand2, Instagram } from "lucide-react";
import { useContentGeneration } from "@/hooks/useContentGeneration";

interface InstagramPost {
  id: string;
  caption: string;
  mediaUrl: string;
  timestamp: string;
}

export const InstagramRepurpose = () => {
  const [username, setUsername] = useState("");
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [selectedPost, setSelectedPost] = useState<InstagramPost | null>(null);
  const [repurposedContent, setRepurposedContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { generateContent } = useContentGeneration();

  const fetchInstagramAccount = async (username: string) => {
    setIsLoading(true);
    try {
      // Mock data for demonstration
      const mockPosts: InstagramPost[] = [
        {
          id: '1',
          caption: 'Check out our latest plumbing work! #PlumbingServices',
          mediaUrl: 'https://example.com/image1.jpg',
          timestamp: new Date().toISOString(),
        },
        {
          id: '2',
          caption: 'Emergency repairs available 24/7 #EmergencyPlumbing',
          mediaUrl: 'https://example.com/image2.jpg',
          timestamp: new Date().toISOString(),
        },
      ];

      setPosts(mockPosts);
      toast({
        title: "Account Retrieved",
        description: `Successfully downloaded ${mockPosts.length} posts from ${username}`,
      });
    } catch (error) {
      console.error("Instagram fetch error:", error);
      toast({
        title: "Error",
        description: "Failed to retrieve Instagram account data. Please check the username and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const repurposeContent = async (post: InstagramPost) => {
    setIsLoading(true);
    try {
      const prompt = `Rewrite the following Instagram caption to make it more professional and business-focused, while maintaining the core message: "${post.caption}"`;
      
      const newContent = await generateContent(prompt);
      if (newContent) {
        setRepurposedContent(newContent);
        toast({
          title: "Success",
          description: "Caption has been repurposed successfully",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to repurpose caption",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Instagram Account Content Repurpose</h2>
        <p className="text-sm text-gray-600">
          Enter an Instagram username to download and repurpose all posts for your business
        </p>

        <div className="flex gap-2">
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter Instagram username..."
            className="flex-1"
          />
          <Button
            onClick={() => fetchInstagramAccount(username)}
            disabled={isLoading || !username.trim()}
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Download className="mr-2 h-4 w-4" />
            )}
            Download Account
          </Button>
        </div>

        {posts.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Available Posts</h3>
            <div className="grid gap-4">
              {posts.map((post) => (
                <Card key={post.id} className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <p className="text-sm text-gray-600">
                        {new Date(post.timestamp).toLocaleDateString()}
                      </p>
                      <p className="text-sm">{post.caption}</p>
                    </div>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSelectedPost(post);
                        repurposeContent(post);
                      }}
                      disabled={isLoading}
                    >
                      <Wand2 className="mr-2 h-4 w-4" />
                      Repurpose
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {selectedPost && repurposedContent && (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Repurposed Caption
            </label>
            <Textarea
              value={repurposedContent}
              className="min-h-[100px]"
              onChange={(e) => setRepurposedContent(e.target.value)}
            />
            <Button
              className="w-full"
              onClick={() => {
                toast({
                  title: "Success",
                  description: "Caption ready to be reposted to Instagram",
                });
              }}
            >
              <Instagram className="mr-2 h-4 w-4" />
              Prepare for Repost
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
};
