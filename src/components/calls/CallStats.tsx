import { Phone, Clock, UserCheck, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CallData {
  totalCalls: number;
  averageDuration: string;
  leadGenerated: number;
  conversions: number;
}

interface CallStatsProps {
  callStats?: CallData;
  isLoading: boolean;
}

export const CallStats = ({ callStats, isLoading }: CallStatsProps) => {
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
    {
      title: "Conversions",
      value: isLoading ? "..." : callStats?.conversions || "0",
      icon: TrendingUp,
      description: "Successful conversions",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
  );
};