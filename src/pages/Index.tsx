import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Phone, MessageSquare, Image, Search, Users, LineChart } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

const VAPI_API_KEY = "3fa8e663-5960-4fb6-9637-ac96e864a340";

const Index = () => {
  const { data: callStats, isLoading } = useQuery({
    queryKey: ['callStats'],
    queryFn: async () => {
      // This is a placeholder for the Vapi API call
      // We'll implement the actual API integration in the next iteration
      return {
        totalCalls: 0,
        averageDuration: '0:00',
        leadGenerated: 0,
      };
    },
  });

  const stats = [
    { label: "Total Calls", value: isLoading ? "..." : callStats?.totalCalls || "0", icon: Phone },
    { label: "Content Generated", value: "0", icon: MessageSquare },
    { label: "Images Optimized", value: "0", icon: Image },
    { label: "Keywords Tracked", value: "0", icon: Search },
    { label: "Social Mentions", value: "0", icon: Users },
    { label: "Lead Conversion", value: "0%", icon: LineChart },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-[#222222]">Welcome to 1Point Solutions</h1>
          <p className="text-gray-600 mt-2">
            Your all-in-one marketing and call management solution
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat) => (
            <Card key={stat.label} className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-[#0FA0CE]/10 rounded-lg">
                  <stat.icon className="h-6 w-6 text-[#0FA0CE]" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {stat.label}
                  </p>
                  <p className="text-2xl font-semibold text-[#222222]">
                    {stat.value}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Recent Calls</h2>
            <div className="text-center text-gray-500 py-8">
              {isLoading ? "Loading call data..." : "No calls recorded yet"}
            </div>
          </Card>
          
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Latest Content</h2>
            <div className="text-center text-gray-500 py-8">
              No content generated yet
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;