import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Globe, Phone } from "lucide-react";
import { useState } from "react";
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
  const [isCallActive, setIsCallActive] = useState(false);

  const handleStartCall = async () => {
    try {
      setIsCallActive(true);
      await onWebCall();
    } catch (error) {
      console.error("Error starting web call:", error);
    } finally {
      setIsCallActive(false);
    }
  };

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
              disabled={isCallActive}
            />
            <Button 
              onClick={handleStartCall} 
              disabled={isCallActive}
              className="min-w-[120px]"
            >
              <Phone className="mr-2 h-4 w-4" />
              {isCallActive ? "Calling..." : "Start Call"}
            </Button>
          </div>
          <p className="text-sm text-gray-500">
            Enter an Assistant ID to start a web call. Leave empty to use the default assistant.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};