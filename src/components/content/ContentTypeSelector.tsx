import { useEffect } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const contentTypes = {
  blog: {
    label: "Blog Post",
    prompt: "Write a comprehensive blog post about",
  },
  social: {
    label: "Social Media Post",
    prompt: "Create an engaging social media post about",
  },
  website: {
    label: "Website Content",
    prompt: "Generate professional website content about",
  },
  adCopy: {
    label: "Ad Copy",
    prompt: "Write compelling ad copy for",
  }
};

interface ContentTypeSelectorProps {
  topic: string;
  setTopic: (topic: string) => void;
  setPrompt: (prompt: string) => void;
}

export const ContentTypeSelector = ({
  topic,
  setTopic,
  setPrompt,
}: ContentTypeSelectorProps) => {
  const [contentType, setContentType] = useState("blog");

  const getAdditionalInstructions = (type: string) => {
    switch (type) {
      case "blog":
        return "Include an introduction, 3-4 main points with subheadings, and a conclusion. Make it informative and engaging.";
      case "social":
        return "Keep it concise, include hashtags, and make it attention-grabbing. Optimize for engagement.";
      case "website":
        return "Focus on benefits, use clear headings, and maintain a professional tone. Include a call-to-action.";
      case "adCopy":
        return "Highlight unique selling points, create urgency, and include a clear call-to-action. Keep it persuasive and concise.";
      default:
        return "";
    }
  };

  useEffect(() => {
    if (topic && contentType) {
      const selectedType = contentTypes[contentType as keyof typeof contentTypes];
      setPrompt(`${selectedType.prompt} ${topic}. ${getAdditionalInstructions(contentType)}`);
    }
  }, [topic, contentType, setPrompt]);

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Content Type
        </label>
        <Select
          value={contentType}
          onValueChange={setContentType}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select content type" />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(contentTypes).map(([key, value]) => (
              <SelectItem key={key} value={key}>
                {value.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Topic
        </label>
        <Input
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Enter your topic..."
          className="w-full"
        />
      </div>
    </div>
  );
};