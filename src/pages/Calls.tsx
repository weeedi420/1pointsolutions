import DashboardLayout from "@/components/layout/DashboardLayout";
import { useState } from "react";
import { CallStats } from "@/components/calls/CallStats";
import { InboundCalling } from "@/components/calls/InboundCalling";
import { OutboundCalling } from "@/components/calls/OutboundCalling";
import { WebCalling } from "@/components/calls/WebCalling";
import { PhoneNumbersList } from "@/components/calls/PhoneNumbersList";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { vapiClient } from "@/services/vapi";

const Calls = () => {
  const [areaCode, setAreaCode] = useState("");
  const [outboundNumber, setOutboundNumber] = useState("");
  const [assistantId, setAssistantId] = useState("");
  const { toast } = useToast();

  // Fetch call statistics using react-query
  const { data: callStats, isLoading: isLoadingStats } = useQuery({
    queryKey: ['callStats'],
    queryFn: async () => {
      try {
        const response = await vapiClient.calls.list();
        const calls = response.data || [];
        
        // Calculate statistics from calls
        const totalCalls = calls.length;
        const totalDuration = calls.reduce((acc, call) => acc + (call.duration || 0), 0);
        const avgDuration = totalCalls > 0 ? Math.floor(totalDuration / totalCalls) : 0;
        const minutes = Math.floor(avgDuration / 60);
        const seconds = avgDuration % 60;
        
        return {
          totalCalls,
          averageDuration: `${minutes}:${seconds.toString().padStart(2, '0')}`,
          leadGenerated: calls.filter(call => call.status === 'completed').length
        };
      } catch (error) {
        console.error('Error fetching call stats:', error);
        throw error;
      }
    }
  });

  const mockPhoneNumbers: { id: string; number: string; status: "active" | "pending" }[] = [];

  const handlePurchaseNumber = async () => {
    toast({
      title: "Feature Not Available",
      description: "Phone number purchasing is not available in the web SDK. Please use the Vapi Dashboard.",
      variant: "destructive",
    });
  };

  const handleOutboundCall = async () => {
    toast({
      title: "Feature Not Available",
      description: "Outbound calling is not available in the web SDK. Please use the Vapi Dashboard.",
      variant: "destructive",
    });
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

        <CallStats callStats={callStats} isLoading={isLoadingStats} />

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
        />

        <PhoneNumbersList phoneNumbers={mockPhoneNumbers} />
      </div>
    </DashboardLayout>
  );
};

export default Calls;