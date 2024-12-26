import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import { Phone, Clock, UserCheck, Plus, PhoneCall } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

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
      // This will be replaced with actual Vapi API call
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
      // This will be replaced with actual Vapi API call
      toast({
        title: "Purchasing Number",
        description: "Please wait while we process your request...",
      });
      
      // Simulate API call
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

  const stats = [
    {
      title: "Total Calls",
      value: isLoading ? "..." : callStats?.totalCalls || "0",
      icon: Phone,
      description: "Total calls received",
    },
    {
      title: "Average Duration",
      value: isLoading ? "..." : callStats?.averageDuration || "0:00",
      icon: Clock,
      description: "Average call duration",
    },
    {
      title: "Leads Generated",
      value: isLoading ? "..." : callStats?.leadGenerated || "0",
      icon: UserCheck,
      description: "Total leads captured",
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-[#222222]">Call Management</h1>
          <p className="text-gray-600 mt-2">
            Monitor and analyze your call performance
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-5 w-5 text-[#0FA0CE]" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-[#222222]">
                  {stat.value}
                </div>
                <p className="text-xs text-gray-600 mt-1">{stat.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Phone Numbers</CardTitle>
            <div className="flex items-center gap-4">
              <Input
                placeholder="Area code (e.g. 415)"
                className="w-40"
                value={areaCode}
                onChange={(e) => setAreaCode(e.target.value)}
                maxLength={3}
              />
              <Button onClick={handlePurchaseNumber}>
                <Plus className="mr-2 h-4 w-4" />
                Purchase Number
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {phoneNumbers.map((number) => (
                <div
                  key={number.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <PhoneCall className="h-5 w-5 text-[#0FA0CE]" />
                    <span className="font-medium">{number.number}</span>
                    <span className={`text-sm px-2 py-1 rounded-full ${
                      number.status === 'active' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {number.status}
                    </span>
                  </div>
                  <Button variant="outline" size="sm">
                    Configure
                  </Button>
                </div>
              ))}
              {phoneNumbers.length === 0 && (
                <div className="text-center text-gray-500 py-8">
                  No phone numbers found. Purchase your first number above.
                </div>
              )}
            </div>
          </CardContent>
        </Card>

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