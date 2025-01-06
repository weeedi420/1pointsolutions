import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mic, MicOff, Volume2, VolumeX, Loader2 } from "lucide-react";
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
            className="w-32 h-32 rounded-full bg-teal-500/20 flex items-center justify-center cursor-pointer hover:bg-teal-500/30 transition-all duration-300 mx-auto animate-[pulse_6s_ease-in-out_infinite]"
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