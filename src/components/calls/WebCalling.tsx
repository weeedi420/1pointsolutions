import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mic, MicOff, Volume2, VolumeX, Loader2, Lock } from "lucide-react";
import { startWebCall } from "@/services/vapi";
import { useToast } from "@/hooks/use-toast";

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
  const [accessKey, setAccessKey] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const { toast } = useToast();

  // The demo access key - in a real app, this would be managed securely
  const DEMO_ACCESS_KEY = "DEMO-AI-CALL-2024";

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

  const verifyAccessKey = () => {
    if (accessKey === DEMO_ACCESS_KEY) {
      setIsVerified(true);
      toast({
        title: "Access Granted",
        description: "You now have access to the AI Call Agent.",
      });
    } else {
      toast({
        title: "Invalid Key",
        description: "Please enter a valid access key.",
        variant: "destructive",
      });
    }
  };

  const handleStartCall = async () => {
    try {
      setIsConnecting(true);
      await startWebCall("27d3e2c3-a384-4ee7-b185-6475d7b9d4b8");
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

  if (!isVerified) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] bg-gradient-to-br from-blue-950 via-blue-900 to-teal-900 rounded-xl p-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/aurora.png')] opacity-30 mix-blend-screen" />
        
        <div className="relative z-10 text-center space-y-6 max-w-md w-full">
          <Lock className="w-16 h-16 text-teal-400 mx-auto" />
          <h1 className="text-3xl font-bold text-white">Access Required</h1>
          <p className="text-gray-200">
            Please enter your access key to use the AI Call Agent.
          </p>
          <div className="space-y-4">
            <Input
              type="text"
              placeholder="Enter access key"
              value={accessKey}
              onChange={(e) => setAccessKey(e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
            />
            <Button 
              onClick={verifyAccessKey}
              className="w-full bg-teal-500 hover:bg-teal-600"
            >
              Verify Access
            </Button>
          </div>
          <p className="text-sm text-gray-400">
            Contact support to obtain an access key.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] bg-gradient-to-br from-blue-950 via-blue-900 to-teal-900 rounded-xl p-8 relative overflow-hidden">
      <h1 className="text-5xl font-bold text-white mb-4 relative z-10">Voice AI Demo</h1>
      <p className="text-xl text-gray-200 mb-8 max-w-2xl relative z-10">
        Experience our voice AI technology firsthand. Click the microphone to start a conversation with our AI assistant.
      </p>
      
      <div className="absolute top-0 left-0 w-full h-full bg-[url('/aurora.png')] opacity-30 mix-blend-screen" />
      
      <div className="relative z-10 text-center space-y-6">
        {!isCallActive ? (
          <div 
            className="w-32 h-32 rounded-full bg-teal-500/20 flex items-center justify-center cursor-pointer hover:bg-teal-500/30 transition-all duration-300 mx-auto"
            onClick={!isConnecting ? handleStartCall : undefined}
          >
            {isConnecting ? (
              <Loader2 className="w-12 h-12 text-teal-400 animate-spin" />
            ) : (
              <Mic className="w-12 h-12 text-teal-400" />
            )}
          </div>
        ) : (
          <div className="space-y-8">
            <div className="text-4xl font-mono text-teal-400">
              {formatDuration(callDuration)}
            </div>
            
            <div className="flex justify-center gap-6">
              <Button
                variant="outline"
                size="lg"
                onClick={toggleMute}
                className={`rounded-full p-6 ${isMuted ? 'bg-red-500/20 border-red-500' : 'bg-teal-500/20 border-teal-500'}`}
              >
                {isMuted ? (
                  <MicOff className="h-6 w-6 text-red-500" />
                ) : (
                  <Mic className="h-6 w-6 text-teal-400" />
                )}
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                onClick={handleEndCall}
                className="rounded-full p-6 bg-red-500/20 border-red-500 hover:bg-red-500/30"
              >
                <span className="text-red-500 font-semibold">End Call</span>
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                onClick={toggleSpeaker}
                className={`rounded-full p-6 ${!isSpeakerOn ? 'bg-red-500/20 border-red-500' : 'bg-teal-500/20 border-teal-500'}`}
              >
                {isSpeakerOn ? (
                  <Volume2 className="h-6 w-6 text-teal-400" />
                ) : (
                  <VolumeX className="h-6 w-6 text-red-500" />
                )}
              </Button>
            </div>
          </div>
        )}

        {!isCallActive && (
          <p className="text-gray-300 mt-8">
            Click the microphone to give it a try!
          </p>
        )}
      </div>
    </div>
  );
};