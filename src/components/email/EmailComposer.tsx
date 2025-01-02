import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";
import { Send, Image as ImageIcon } from "lucide-react";

const EmailComposer = () => {
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const { toast } = useToast();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject || !content) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Success",
      description: "Email campaign created successfully",
    });

    // Reset form
    setSubject("");
    setContent("");
    setPreviewImage(null);
  };

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Subject Line</label>
          <Input
            placeholder="Enter email subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Email Content</label>
          <Textarea
            placeholder="Write your email content here..."
            className="min-h-[200px]"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Add Image</label>
          <div className="flex items-center gap-4">
            <Input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="cursor-pointer"
            />
          </div>
          {previewImage && (
            <img
              src={previewImage}
              alt="Preview"
              className="mt-4 max-w-full h-auto rounded-lg"
            />
          )}
        </div>

        <div className="flex justify-end">
          <Button type="submit">
            <Send className="mr-2 h-4 w-4" />
            Send Campaign
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default EmailComposer;