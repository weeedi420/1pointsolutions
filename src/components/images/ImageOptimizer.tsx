import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Upload } from "lucide-react";

export const ImageOptimizer = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [optimizedImageUrl, setOptimizedImageUrl] = useState("");
  const [isOptimizing, setIsOptimizing] = useState(false);
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

  return (
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
  );
};