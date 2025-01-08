import DashboardLayout from "@/components/layout/DashboardLayout";
import { useState } from "react";
import { CallStats } from "@/components/calls/CallStats";
import { InboundCalling } from "@/components/calls/InboundCalling";
import { OutboundCalling } from "@/components/calls/OutboundCalling";
import { WebCalling } from "@/components/calls/WebCalling";
import { PhoneNumbersList } from "@/components/calls/PhoneNumbersList";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { purchasePhoneNumber, makeOutboundCall } from "@/services/vapi";
import { useAccess } from "@/contexts/AccessContext";
import { LockScreen } from "@/components/calls/LockScreen";

const Calls = () => {
  const [areaCode, setAreaCode] = useState("");
  const [outboundNumber, setOutboundNumber] = useState("");
  const [assistantId, setAssistantId] = useState("");
  const [accessKey, setAccessKey] = useState("");
  const { isVerified, verifyAccessKey } = useAccess();
  const { toast } = useToast();

  const { data: callStats, isLoading: isLoadingStats } = useQuery({
    queryKey: ['callStats'],
    queryFn: async () => {
      return {
        totalCalls: 0,
        averageDuration: "0:00",
        leadGenerated: 0,
        conversions: 0
      };
    }
  });

  const mockPhoneNumbers: { id: string; number: string; status: "active" | "pending" }[] = [];

  const handlePurchaseNumber = async () => {
    try {
      if (!areaCode || areaCode.length !== 3) {
        toast({
          title: "Invalid Area Code",
          description: "Please enter a valid 3-digit area code.",
          variant: "destructive",
        });
        return;
      }

      const phoneNumber = await purchasePhoneNumber(areaCode);
      toast({
        title: "Success",
        description: `Successfully purchased number: ${phoneNumber}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to purchase phone number. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleOutboundCall = async () => {
    try {
      if (!outboundNumber) {
        toast({
          title: "Invalid Number",
          description: "Please enter a valid phone number.",
          variant: "destructive",
        });
        return;
      }

      await makeOutboundCall(outboundNumber);
      toast({
        title: "Success",
        description: "Outbound call initiated successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to initiate outbound call. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (!isVerified) {
    return (
      <DashboardLayout>
        <LockScreen
          onVerify={verifyAccessKey}
          accessKey={accessKey}
          setAccessKey={setAccessKey}
          title="Calls Feature Access Required"
        />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <WebCalling
          assistantId={assistantId}
          onAssistantIdChange={setAssistantId}
        />

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

        <PhoneNumbersList phoneNumbers={mockPhoneNumbers} />
      </div>
    </DashboardLayout>
  );
};

export default Calls;