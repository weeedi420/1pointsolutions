import DashboardLayout from "@/components/layout/DashboardLayout";
import { useState } from "react";
import { CallStats } from "@/components/calls/CallStats";
import { InboundCalling } from "@/components/calls/InboundCalling";
import { OutboundCalling } from "@/components/calls/OutboundCalling";
import { WebCalling } from "@/components/calls/WebCalling";
import { PhoneNumbersList } from "@/components/calls/PhoneNumbersList";
import { useToast } from "@/hooks/use-toast";
import { vapiClient } from "@/services/vapi";

const Calls = () => {
  const [areaCode, setAreaCode] = useState("");
  const [outboundNumber, setOutboundNumber] = useState("");
  const [assistantId, setAssistantId] = useState("");
  const { toast } = useToast();

  // Since Vapi Web SDK is primarily for web calling, we'll show placeholders for other features
  const mockCallStats = {
    totalCalls: 0,
    averageDuration: "0:00",
    leadGenerated: 0
  };

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

        <CallStats callStats={mockCallStats} isLoading={false} />

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