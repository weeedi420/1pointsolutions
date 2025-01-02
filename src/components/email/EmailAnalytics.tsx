import { Card } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const EmailAnalytics = () => {
  // Sample data for demonstration
  const data = [
    { name: "Campaign 1", opens: 65, clicks: 40 },
    { name: "Campaign 2", opens: 45, clicks: 25 },
    { name: "Campaign 3", opens: 85, clicks: 55 },
    { name: "Campaign 4", opens: 55, clicks: 30 },
  ];

  const stats = [
    { label: "Total Subscribers", value: "150" },
    { label: "Average Open Rate", value: "62.5%" },
    { label: "Average Click Rate", value: "37.5%" },
    { label: "Total Campaigns", value: "4" },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="p-4">
            <p className="text-sm text-gray-500">{stat.label}</p>
            <p className="text-2xl font-bold mt-1">{stat.value}</p>
          </Card>
        ))}
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-6">Campaign Performance</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="opens" fill="#0FA0CE" name="Opens" />
              <Bar dataKey="clicks" fill="#82ca9d" name="Clicks" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
};

export default EmailAnalytics;