import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Briefcase,
  Users,
  Calendar as CalendarIcon,
  DollarSign,
} from "lucide-react";

const Index = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  // Mock data - replace with actual API calls later
  const { data: recentJobs } = useQuery({
    queryKey: ["recentJobs"],
    queryFn: async () => [
      {
        id: 1,
        customer: "John Doe",
        service: "Plumbing Repair",
        status: "In Progress",
        date: "2024-03-20",
      },
      {
        id: 2,
        customer: "Jane Smith",
        service: "HVAC Maintenance",
        status: "Scheduled",
        date: "2024-03-21",
      },
    ],
  });

  const metrics = [
    {
      title: "Active Jobs",
      value: "12",
      icon: Briefcase,
      trend: "+2 from last week",
    },
    {
      title: "Total Customers",
      value: "156",
      icon: Users,
      trend: "+5 this month",
    },
    {
      title: "Scheduled Jobs",
      value: "8",
      icon: CalendarIcon,
      trend: "Next 7 days",
    },
    {
      title: "Revenue",
      value: "$12,450",
      icon: DollarSign,
      trend: "+15% vs last month",
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500">Welcome to your field service dashboard</p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric) => (
            <Card key={metric.title} className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <metric.icon className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {metric.title}
                  </p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {metric.value}
                  </p>
                  <p className="text-sm text-gray-500">{metric.trend}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Jobs */}
          <Card className="lg:col-span-2 p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold">Recent Jobs</h2>
              <Button variant="outline">View All</Button>
            </div>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Service</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentJobs?.map((job) => (
                    <TableRow key={job.id}>
                      <TableCell>{job.customer}</TableCell>
                      <TableCell>{job.service}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            job.status === "In Progress"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {job.status}
                        </span>
                      </TableCell>
                      <TableCell>{job.date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>

          {/* Calendar Card */}
          <Card className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold">Schedule</h2>
              <Button variant="outline">Add Job</Button>
            </div>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
            />
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;