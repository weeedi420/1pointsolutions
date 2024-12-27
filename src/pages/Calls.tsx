import DashboardLayout from "@/components/layout/DashboardLayout";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
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
  
  // Initialize Vapi client
  const vapi = new Vapi(VAPI_API_KEY);
  
  const { data: callStats, isLoading: isStatsLoading } = useQuery({
    queryKey: ['callStats'],
    queryFn: async () => {
      try {
        // Fetch call statistics from Vapi API
        const stats = await vapi.getCallStats();
        return {
          totalCalls: stats?.totalCalls || 0,
          averageDuration: stats?.averageDuration || "0:00",
          leadGenerated: stats?.leadGenerated || 0,
        };
      } catch (error) {
        console.error("Error fetching call stats:", error);
        return {
          totalCalls: 0,
          averageDuration: "0:00",
          leadGenerated: 0,
        };
      }
    },
  });

  const { data: phoneNumbers = [], refetch: refetchPhoneNumbers } = useQuery({
    queryKey: ['phoneNumbers'],
    queryFn: async () => {
      try {
        // Fetch phone numbers from Vapi API
        const numbers = await vapi.getPhoneNumbers();
        return numbers.map((num: any) => ({
          id: num.id,
          number: num.phoneNumber,
          status: num.status,
        }));
      } catch (error) {
        console.error("Error fetching phone numbers:", error);
        return [];
      }
    },
  });

  const purchaseNumberMutation = useMutation({
    mutationFn: async (areaCode: string) => {
      return await vapi.purchasePhoneNumber({ areaCode });
    },
    onSuccess: () => {
      toast({
        title: "Success!",
        description: "Phone number purchased successfully",
      });
      refetchPhoneNumbers();
      setAreaCode("");
    },
    onError: (error) => {
      console.error("Error purchasing number:", error);
      toast({
        title: "Error",
        description: "Failed to purchase phone number. Please try again.",
        variant: "destructive",
      });
    },
  });

  const outboundCallMutation = useMutation({
    mutationFn: async (phoneNumber: string) => {
      return await vapi.createCall({
        phoneNumber,
        direction: "outbound",
      });
    },
    onSuccess: () => {
      toast({
        title: "Success!",
        description: "Outbound call initiated successfully",
      });
      setOutboundNumber("");
    },
    onError: (error) => {
      console.error("Error initiating call:", error);
      toast({
        title: "Error",
        description: "Failed to initiate call. Please try again.",
        variant: "destructive",
      });
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

    purchaseNumberMutation.mutate(areaCode);
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

    outboundCallMutation.mutate(outboundNumber);
  };

  const handleWebCall = async () => {
    try {
      toast({
        title: "Starting Web Call",
        description: "Initializing web call interface...",
      });
      
      await vapi.start(assistantId || undefined);
      
      toast({
        title: "Success!",
        description: "Web call interface ready",
      });
    } catch (error) {
      console.error("Web call error:", error);
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

        <CallStats callStats={callStats} isLoading={isStatsLoading} />

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
      </div>
    </DashboardLayout>
  );
};

export default Calls;