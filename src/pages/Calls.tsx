import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { CallStats } from "@/components/calls/CallStats";
import { InboundCalling } from "@/components/calls/InboundCalling";
import { OutboundCalling } from "@/components/calls/OutboundCalling";
import { WebCalling } from "@/components/calls/WebCalling";
import { PhoneNumbersList } from "@/components/calls/PhoneNumbersList";
import Vapi from "@vapi-ai/web";

const VAPI_API_KEY = "3fa8e663-5960-4fb6-9637-ac96e864a340";

interface CallData {
  totalCalls: number;
  averageDuration: string;
  leadGenerated: number;
}

interface PhoneNumber {
  id: string;
  number: string;
  status: "active" | "pending";
}

const Calls = () => {
  const [areaCode, setAreaCode] = useState("");
  const [outboundNumber, setOutboundNumber] = useState("");
  const [assistantId, setAssistantId] = useState("");
  const { toast } = useToast();
  
  const { data: callStats, isLoading } = useQuery({
    queryKey: ['callStats'],
    queryFn: async (): Promise<CallData> => {
      console.log("Using Vapi API Key:", VAPI_API_KEY);
      return {
        totalCalls: 125,
        averageDuration: "3:45",
        leadGenerated: 45,
      };
    },
  });

  const { data: phoneNumbers = [], refetch: refetchPhoneNumbers } = useQuery({
    queryKey: ['phoneNumbers'],
    queryFn: async (): Promise<PhoneNumber[]> => {
      return [
        { id: "1", number: "+1 (555) 123-4567", status: "active" },
        { id: "2", number: "+1 (555) 987-6543", status: "active" },
      ];
    },
  });

  const handlePurchaseNumber = async () => {
    if (!areaCode.match(/^\d{3}$/)) {
      toast({
        title: "Invalid Area Code",
        description: "Please enter a valid 3-digit area code",
        variant: "destructive",
      });
      return;
    }

    try {
      toast({
        title: "Purchasing Number",
        description: "Please wait while we process your request...",
      });
      
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Success!",
        description: "Phone number purchased successfully",
      });
      
      refetchPhoneNumbers();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to purchase phone number. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleOutboundCall = async () => {
    if (!outboundNumber.match(/^\+?1?\d{10}$/)) {
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid phone number",
        variant: "destructive",
      });
      return;
    }

    try {
      toast({
        title: "Initiating Call",
        description: "Starting outbound call...",
      });
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Success!",
        description: "Outbound call initiated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to initiate call. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleWebCall = async () => {
    try {
      toast({
        title: "Starting Web Call",
        description: "Initializing web call interface...",
      });
      
      const vapi = new Vapi(VAPI_API_KEY);
      await vapi.start(assistantId || "default-assistant-id");
      
      toast({
        title: "Success!",
        description: "Web call interface ready",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to start web call. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-[#222222]">Call Management</h1>
          <p className="text-gray-600 mt-2">
            Monitor and analyze your call performance
          </p>
        </div>

        <CallStats callStats={callStats} isLoading={isLoading} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InboundCalling
            areaCode={areaCode}
            onAreaCodeChange={setAreaCode}
            onPurchaseNumber={handlePurchaseNumber}
          />
          <OutboundCalling
            outboundNumber={outboundNumber}
            onOutboundNumberChange={setOutboundNumber}
            onOutboundCall={handleOutboundCall}
          />
        </div>

        <WebCalling
          assistantId={assistantId}
          onAssistantIdChange={setAssistantId}
          onWebCall={handleWebCall}
        />

        <PhoneNumbersList phoneNumbers={phoneNumbers} />

        <Card>
          <CardHeader>
            <CardTitle>Recent Calls</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center text-gray-500 py-8">
              Call history will be implemented in the next iteration
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Calls;
