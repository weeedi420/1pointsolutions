import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Globe } from "lucide-react";
import Vapi from "@vapi-ai/web";

interface WebCallingProps {
  assistantId: string;
  onAssistantIdChange: (value: string) => void;
  onWebCall: () => Promise<void>;
}

export const WebCalling = ({
  assistantId,
  onAssistantIdChange,
  onWebCall,
}: WebCallingProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Globe className="h-5 w-5 text-[#0FA0CE]" />
          Web Calling
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <Input
              placeholder="Assistant ID (optional)"
              className="flex-1"
              value={assistantId}
              onChange={(e) => onAssistantIdChange(e.target.value)}
            />
            <Button onClick={onWebCall}>
              Start Web Call
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};