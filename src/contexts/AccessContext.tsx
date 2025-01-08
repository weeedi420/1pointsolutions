import { createContext, useContext, useState, ReactNode } from "react";
import { useToast } from "@/hooks/use-toast";

interface AccessContextType {
  isVerified: boolean;
  verifyAccessKey: (key: string) => boolean;
}

const AccessContext = createContext<AccessContextType | undefined>(undefined);

export const AccessProvider = ({ children }: { children: ReactNode }) => {
  const [isVerified, setIsVerified] = useState(false);
  const { toast } = useToast();
  const DEMO_ACCESS_KEY = "DEMO-AI-CALL-2024";

  const verifyAccessKey = (key: string) => {
    if (key === DEMO_ACCESS_KEY) {
      setIsVerified(true);
      toast({
        title: "Access Granted",
        description: "You now have access to all features.",
      });
      return true;
    } else {
      toast({
        title: "Invalid Key",
        description: "Please enter a valid access key.",
        variant: "destructive",
      });
      return false;
    }
  };

  return (
    <AccessContext.Provider value={{ isVerified, verifyAccessKey }}>
      {children}
    </AccessContext.Provider>
  );
};

export const useAccess = () => {
  const context = useContext(AccessContext);
  if (context === undefined) {
    throw new Error("useAccess must be used within an AccessProvider");
  }
  return context;
};