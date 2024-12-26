import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Phone, MessageSquare, Image, Search } from "lucide-react";

const Index = () => {
  const stats = [
    { label: "Total Calls", value: "0", icon: Phone },
    { label: "Content Generated", value: "0", icon: MessageSquare },
    { label: "Images Optimized", value: "0", icon: Image },
    { label: "Keywords Tracked", value: "0", icon: Search },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Welcome back!</h1>
          <p className="text-gray-600 mt-2">
            Here's an overview of your marketing activities
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <Card key={stat.label} className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-marketing-50 rounded-lg">
                  <stat.icon className="h-6 w-6 text-marketing-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {stat.label}
                  </p>
                  <p className="text-2xl font-semibold text-gray-900">
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
              No calls recorded yet
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