import { Lock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface LockScreenProps {
  onVerify: (key: string) => void;
  accessKey: string;
  setAccessKey: (key: string) => void;
  title?: string;
}

export const LockScreen = ({ 
  onVerify, 
  accessKey, 
  setAccessKey,
  title = "Access Required"
}: LockScreenProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] bg-gradient-to-br from-blue-950 via-blue-900 to-teal-900 rounded-xl p-8 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-[url('/aurora.png')] opacity-30 mix-blend-screen" />
      
      <div className="relative z-10 text-center space-y-6 max-w-md w-full">
        <Lock className="w-16 h-16 text-teal-400 mx-auto" />
        <h1 className="text-3xl font-bold text-white">{title}</h1>
        <p className="text-gray-200">
          Please enter your access key to use this feature.
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
            onClick={() => onVerify(accessKey)}
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
};