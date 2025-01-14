import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { 
  CalendarDays, 
  Users, 
  FileText, 
  TrendingUp,
  Plus,
  Clock,
  DollarSign,
  CheckCircle 
} from "lucide-react";

const JobDashboard = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  // Mock data - will be replaced with real data from Supabase
  const metrics = [
    { label: "Active Jobs", value: "12", icon: Clock },
    { label: "Total Revenue", value: "$15,420", icon: DollarSign },
    { label: "Completed Jobs", value: "45", icon: CheckCircle },
    { label: "Total Customers", value: "28", icon: Users },
  ];

  const recentJobs = [
    { id: 1, customer: "John Doe", service: "Plumbing", status: "In Progress", date: "2024-03-20" },
    { id: 2, customer: "Jane Smith", service: "HVAC", status: "Scheduled", date: "2024-03-21" },
    { id: 3, customer: "Bob Wilson", service: "Electrical", status: "Completed", date: "2024-03-19" },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Quick Actions */}
        <div className="flex gap-4 flex-wrap">
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" /> New Job
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <FileText className="h-4 w-4" /> Create Invoice
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Users className="h-4 w-4" /> Add Customer
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4" /> Schedule Job
          </Button>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map((metric) => (
            <Card key={metric.label} className="p-6">
              <div className="flex items-center gap-4">
                <metric.icon className="h-8 w-8 text-blue-500" />
                <div>
                  <p className="text-sm text-gray-500">{metric.label}</p>
                  <p className="text-2xl font-bold">{metric.value}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Jobs */}
          <Card className="lg:col-span-2 p-6">
            <h2 className="text-xl font-semibold mb-4">Recent Jobs</h2>
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
                {recentJobs.map((job) => (
                  <TableRow key={job.id}>
                    <TableCell>{job.customer}</TableCell>
                    <TableCell>{job.service}</TableCell>
                    <TableCell>{job.status}</TableCell>
                    <TableCell>{job.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>

          {/* Calendar */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Schedule</h2>
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

export default JobDashboard;