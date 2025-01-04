import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Globe, Phone, PhoneOff, Mic, MicOff, Volume2, VolumeX } from "lucide-react";
import { startWebCall } from "@/services/vapi";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

interface WebCallingProps {
  assistantId: string;
  onAssistantIdChange: (value: string) => void;
}

export const WebCalling = ({
  assistantId,
  onAssistantIdChange,
}: WebCallingProps) => {
  const [isCallActive, setIsCallActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeakerOn, setIsSpeakerOn] = useState(true);
  const [isConnecting, setIsConnecting] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isCallActive) {
      interval = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isCallActive]);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartCall = async () => {
    try {
      setIsConnecting(true);
      await startWebCall(assistantId);
      setIsCallActive(true);
      toast({
        title: "Call Connected",
        description: "Your web call has been initiated successfully.",
      });
    } catch (error) {
      console.error("Error starting web call:", error);
      toast({
        title: "Connection Failed",
        description: "Failed to start web call. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsConnecting(false);
    }
  };

  const handleEndCall = () => {
    setIsCallActive(false);
    setCallDuration(0);
    toast({
      title: "Call Ended",
      description: "Your web call has been terminated.",
    });
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    toast({
      title: isMuted ? "Microphone Unmuted" : "Microphone Muted",
      description: `Your microphone is now ${isMuted ? "unmuted" : "muted"}.`,
    });
  };

  const toggleSpeaker = () => {
    setIsSpeakerOn(!isSpeakerOn);
    toast({
      title: isSpeakerOn ? "Speaker Off" : "Speaker On",
      description: `Speaker is now ${isSpeakerOn ? "off" : "on"}.`,
    });
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Globe className="h-5 w-5 text-[#0FA0CE]" />
          Web Calling
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <Input
              placeholder="Assistant ID (optional)"
              className="flex-1"
              value={assistantId}
              onChange={(e) => onAssistantIdChange(e.target.value)}
              disabled={isCallActive || isConnecting}
            />
            <Button 
              onClick={isCallActive ? handleEndCall : handleStartCall}
              disabled={isConnecting}
              variant={isCallActive ? "destructive" : "default"}
              className="min-w-[120px]"
            >
              {isConnecting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : isCallActive ? (
                <>
                  <PhoneOff className="mr-2 h-4 w-4" />
                  End Call
                </>
              ) : (
                <>
                  <Phone className="mr-2 h-4 w-4" />
                  Start Call
                </>
              )}
            </Button>
          </div>

          {isCallActive && (
            <div className="space-y-4">
              <div className="flex justify-center text-2xl font-mono">
                {formatDuration(callDuration)}
              </div>
              
              <div className="flex justify-center gap-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={toggleMute}
                  className={isMuted ? "bg-red-50" : ""}
                >
                  {isMuted ? (
                    <MicOff className="h-4 w-4 text-red-500" />
                  ) : (
                    <Mic className="h-4 w-4" />
                  )}
                </Button>
                
                <Button
                  variant="outline"
                  size="icon"
                  onClick={toggleSpeaker}
                  className={!isSpeakerOn ? "bg-red-50" : ""}
                >
                  {isSpeakerOn ? (
                    <Volume2 className="h-4 w-4" />
                  ) : (
                    <VolumeX className="h-4 w-4 text-red-500" />
                  )}
                </Button>
              </div>
            </div>
          )}

          <div className="text-sm text-gray-500">
            <p>Tips:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Use a headset for better audio quality</li>
              <li>Ensure your microphone permissions are enabled</li>
              <li>Speak clearly and at a normal pace</li>
              <li>Stay in a quiet environment for optimal experience</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};