import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Calendar as CalendarIcon, Clock, Send } from "lucide-react";
import { InstagramRepurpose } from "@/components/social/InstagramRepurpose";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const Social = () => {
  const [postContent, setPostContent] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const { toast } = useToast();

  const handlePlatformToggle = (platform: string) => {
    setSelectedPlatforms(prev => 
      prev.includes(platform) 
        ? prev.filter(p => p !== platform)
        : [...prev, platform]
    );
  };

  const handleSchedulePost = () => {
    if (!postContent) {
      toast({
        title: "Error",
        description: "Please enter post content",
        variant: "destructive",
      });
      return;
    }

    if (selectedPlatforms.length === 0) {
      toast({
        title: "Error",
        description: "Please select at least one platform",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Success",
      description: "Post scheduled successfully!",
    });

    // Reset form
    setPostContent("");
    setSelectedDate(undefined);
    setSelectedPlatforms([]);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-[#222222]">Social Media Management</h1>
          <p className="text-gray-600 mt-2">
            Schedule posts, analyze engagement, and manage your social media presence
          </p>
        </div>

        <Tabs defaultValue="compose" className="w-full">
          <TabsList>
            <TabsTrigger value="compose">Compose</TabsTrigger>
            <TabsTrigger value="repurpose">Repurpose</TabsTrigger>
            <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="compose">
            <Card className="p-6">
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Button
                    variant={selectedPlatforms.includes('facebook') ? 'default' : 'outline'}
                    onClick={() => handlePlatformToggle('facebook')}
                  >
                    <Facebook className="mr-2 h-4 w-4" />
                    Facebook
                  </Button>
                  <Button
                    variant={selectedPlatforms.includes('twitter') ? 'default' : 'outline'}
                    onClick={() => handlePlatformToggle('twitter')}
                  >
                    <Twitter className="mr-2 h-4 w-4" />
                    Twitter
                  </Button>
                  <Button
                    variant={selectedPlatforms.includes('instagram') ? 'default' : 'outline'}
                    onClick={() => handlePlatformToggle('instagram')}
                  >
                    <Instagram className="mr-2 h-4 w-4" />
                    Instagram
                  </Button>
                </div>

                <Textarea
                  placeholder="What's on your mind?"
                  value={postContent}
                  onChange={(e) => setPostContent(e.target.value)}
                  className="min-h-[150px]"
                />

                <div className="flex gap-4">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className={cn(
                        "w-[240px] justify-start text-left font-normal",
                        !selectedDate && "text-muted-foreground"
                      )}>
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>

                  <Button onClick={handleSchedulePost}>
                    <Send className="mr-2 h-4 w-4" />
                    Schedule Post
                  </Button>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="repurpose">
            <InstagramRepurpose />
          </TabsContent>

          <TabsContent value="scheduled">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Scheduled Posts</h2>
              <p className="text-gray-600">
                No posts scheduled yet. Create a new post to get started!
              </p>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Analytics Dashboard</h2>
              <p className="text-gray-600">
                Connect your social media accounts to view analytics and insights.
              </p>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Social;
