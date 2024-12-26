import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { Phone, Clock, UserCheck } from "lucide-react";

const VAPI_API_KEY = "3fa8e663-5960-4fb6-9637-ac96e864a340";

interface CallData {
  totalCalls: number;
  averageDuration: string;
  leadGenerated: number;
}

const Calls = () => {
  const { data: callStats, isLoading } = useQuery({
    queryKey: ['callStats'],
    queryFn: async (): Promise<CallData> => {
      // This is a placeholder for the actual Vapi API call
      // We'll implement the full API integration in the next iteration
      console.log("Using Vapi API Key:", VAPI_API_KEY);
      return {
        totalCalls: 125,
        averageDuration: "3:45",
        leadGenerated: 45,
      };
    },
  });

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