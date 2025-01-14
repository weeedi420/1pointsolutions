import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import QuickInvoice from "@/components/invoicing/QuickInvoice";
import BatchInvoicing from "@/components/invoicing/BatchInvoicing";
import InvoiceReminders from "@/components/invoicing/InvoiceReminders";
import DispatchMap from "@/components/dispatch/DispatchMap";
import TeamList from "@/components/dispatch/TeamList";

const JobDashboard = () => {
  // Mock data for demonstration
  const teamMembers = [
    {
      id: "1",
      name: "John Smith",
      status: "available",
      location: "Downtown Area",
      phone: "(555) 123-4567"
    },
    {
      id: "2",
      name: "Sarah Johnson",
      status: "busy",
      location: "North District",
      phone: "(555) 234-5678"
    },
    {
      id: "3",
      name: "Mike Wilson",
      status: "offline",
      location: "South District",
      phone: "(555) 345-6789"
    }
  ] as const;

  const locations = [
    { lat: 40.7128, lng: -74.0060, title: "New York Job Site" },
    { lat: 34.0522, lng: -118.2437, title: "Los Angeles Job Site" },
    { lat: 41.8781, lng: -87.6298, title: "Chicago Job Site" }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <Tabs defaultValue="dispatch" className="w-full">
          <TabsList>
            <TabsTrigger value="dispatch">Dispatch</TabsTrigger>
            <TabsTrigger value="invoicing">Invoicing</TabsTrigger>
          </TabsList>
          
          <TabsContent value="dispatch">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Service Locations</h2>
                  <DispatchMap locations={locations} />
                </Card>
              </div>
              <div className="lg:col-span-1">
                <Card className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Team Members</h2>
                  <TeamList members={teamMembers} />
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="invoicing">
            <Card className="p-6">
              <Tabs defaultValue="quick" className="w-full">
                <TabsList>
                  <TabsTrigger value="quick">Quick Invoice</TabsTrigger>
                  <TabsTrigger value="batch">Batch Invoicing</TabsTrigger>
                  <TabsTrigger value="reminders">Payment Reminders</TabsTrigger>
                </TabsList>
                <TabsContent value="quick">
                  <QuickInvoice />
                </TabsContent>
                <TabsContent value="batch">
                  <BatchInvoicing />
                </TabsContent>
                <TabsContent value="reminders">
                  <InvoiceReminders />
                </TabsContent>
              </Tabs>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default JobDashboard;