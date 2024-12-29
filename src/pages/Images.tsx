import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Upload, Wand2 } from "lucide-react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

const Images = () => {
  // Image Optimization States
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [optimizedImageUrl, setOptimizedImageUrl] = useState("");
  const [isOptimizing, setIsOptimizing] = useState(false);

  // Image Generation States
  const [prompt, setPrompt] = useState("");
  const [generatedImageUrl, setGeneratedImageUrl] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const optimizeImage = async () => {
    if (!selectedFile) {
      toast({
        title: "Error",
        description: "Please select an image first",
        variant: "destructive",
      });
      return;
    }

    setIsOptimizing(true);
    try {
      // For demo purposes, we're just creating an object URL
      const objectUrl = URL.createObjectURL(selectedFile);
      setOptimizedImageUrl(objectUrl);
      
      toast({
        title: "Success",
        description: "Image optimized successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to optimize image",
        variant: "destructive",
      });
    } finally {
      setIsOptimizing(false);
    }
  };

  const generateImage = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Error",
        description: "Please enter a prompt",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    try {
      const response = await fetch("https://api.stability.ai/v1/generation/stable-diffusion-v1-5/text-to-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer sk-YOUR-API-KEY", // Replace with actual API key
        },
        body: JSON.stringify({
          text_prompts: [{ text: prompt }],
          cfg_scale: 7,
          height: 512,
          width: 512,
          samples: 1,
          steps: 30,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate image");
      }

      const data = await response.json();
      // Assuming the API returns an image URL in the response
      setGeneratedImageUrl(data.artifacts[0].base64);
      
      toast({
        title: "Success",
        description: "Image generated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate image",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-[#222222]">Image Tools</h1>
          <p className="text-gray-600 mt-2">
            Optimize and generate images using AI
          </p>
        </div>

        <Tabs defaultValue="optimize" className="space-y-4">
          <TabsList>
            <TabsTrigger value="optimize">Optimize Image</TabsTrigger>
            <TabsTrigger value="generate">Generate Image</TabsTrigger>
          </TabsList>

          <TabsContent value="optimize">
            <Card className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload Image
                  </label>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="cursor-pointer"
                  />
                </div>

                <Button
                  onClick={optimizeImage}
                  disabled={isOptimizing || !selectedFile}
                  className="w-full"
                >
                  {isOptimizing ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Upload className="mr-2 h-4 w-4" />
                  )}
                  Optimize Image
                </Button>

                {optimizedImageUrl && (
                  <div className="mt-6">
                    <h3 className="text-lg font-medium mb-2">Optimized Image:</h3>
                    <div className="rounded-md overflow-hidden">
                      <img
                        src={optimizedImageUrl}
                        alt="Optimized"
                        className="max-w-full h-auto"
                      />
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="generate">
            <Card className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Image Description
                  </label>
                  <Textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Describe the image you want to generate..."
                    className="min-h-[100px]"
                  />
                </div>

                <Button
                  onClick={generateImage}
                  disabled={isGenerating || !prompt.trim()}
                  className="w-full"
                >
                  {isGenerating ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Wand2 className="mr-2 h-4 w-4" />
                  )}
                  Generate Image
                </Button>

                {generatedImageUrl && (
                  <div className="mt-6">
                    <h3 className="text-lg font-medium mb-2">Generated Image:</h3>
                    <div className="rounded-md overflow-hidden">
                      <img
                        src={`data:image/png;base64,${generatedImageUrl}`}
                        alt="Generated"
                        className="max-w-full h-auto"
                      />
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Images;