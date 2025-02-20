import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import QuickInvoice from "@/components/invoicing/QuickInvoice";
import BatchInvoicing from "@/components/invoicing/BatchInvoicing";
import InvoiceReminders from "@/components/invoicing/InvoiceReminders";
import DispatchMap from "@/components/dispatch/DispatchMap";
import TeamList from "@/components/dispatch/TeamList";
import { GoogleAdsImport } from "@/components/ads/GoogleAdsImport";
import { GoogleLocalServices } from "@/components/ads/GoogleLocalServices";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { JobList } from "@/components/jobs/JobList";
import { JobForm } from "@/components/jobs/JobForm";
import { CustomerList } from "@/components/customers/CustomerList";
import { CustomerForm } from "@/components/customers/CustomerForm";
import type { Job } from "@/types/job";
import type { Customer } from "@/types/customer";

export type TeamMember = {
  id: string;
  name: string;
  status: 'available' | 'busy' | 'offline';
  location: string;
  phone: string;
};

const JobDashboard = () => {
  const teamMembers: TeamMember[] = [
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
  ];

  const locations = [
    { lat: 40.7128, lng: -74.0060, title: "New York Job Site" },
    { lat: 34.0522, lng: -118.2437, title: "Los Angeles Job Site" },
    { lat: 41.8781, lng: -87.6298, title: "Chicago Job Site" }
  ];

  const [showJobForm, setShowJobForm] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | undefined>();
  
  const [jobs] = useState<Job[]>([
    {
      id: "1",
      customerId: "cust1",
      title: "Leaky Faucet Repair",
      description: "Fix leaking kitchen faucet",
      status: "pending",
      priority: "medium",
      location: {
        address: "123 Main St, New York, NY",
        lat: 40.7128,
        lng: -74.0060
      },
      createdAt: new Date().toISOString(),
      scheduledFor: new Date().toISOString(),
      notes: [],
      estimatedCost: 150
    },
    {
      id: "2",
      customerId: "cust2",
      title: "Emergency Pipe Burst",
      description: "Water pipe burst in basement",
      status: "in_progress",
      priority: "emergency",
      location: {
        address: "456 Park Ave, New York, NY",
        lat: 40.7589,
        lng: -73.9851
      },
      createdAt: new Date().toISOString(),
      scheduledFor: new Date().toISOString(),
      notes: [],
      estimatedCost: 500
    }
  ]);

  const [showCustomerForm, setShowCustomerForm] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | undefined>();
  
  const [customers] = useState<Customer[]>([
    {
      id: "1",
      name: "John Smith",
      email: "john.smith@email.com",
      phone: "07700 900123",
      address: "123 Main St, London",
      createdAt: new Date().toISOString(),
      lastJobDate: new Date().toISOString(),
      totalSpent: 2500,
      jobHistory: [
        {
          id: "1",
          title: "Bathroom Installation",
          date: new Date().toISOString(),
          cost: 2500
        }
      ]
    },
    {
      id: "2",
      name: "Sarah Johnson",
      email: "sarah.j@email.com",
      phone: "07700 900456",
      address: "456 High St, Manchester",
      createdAt: new Date().toISOString(),
      totalSpent: 750,
      jobHistory: [
        {
          id: "2",
          title: "Boiler Repair",
          date: new Date().toISOString(),
          cost: 750
        }
      ]
    }
  ]);

  const handleEditJob = (job: Job) => {
    setSelectedJob(job);
    setShowJobForm(true);
  };

  const handleDeleteJob = (jobId: string) => {
    console.log("Deleting job:", jobId);
  };

  const handleJobSubmit = (jobData: Partial<Job>) => {
    console.log("Submitting job:", jobData);
    setShowJobForm(false);
    setSelectedJob(undefined);
  };

  const handleEditCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    setShowCustomerForm(true);
  };

  const handleDeleteCustomer = (customerId: string) => {
    console.log("Deleting customer:", customerId);
  };

  const handleCustomerSubmit = (customerData: Partial<Customer>) => {
    console.log("Submitting customer:", customerData);
    setShowCustomerForm(false);
    setSelectedCustomer(undefined);
  };

  const handleCallCustomer = (phone: string) => {
    console.log("Calling customer:", phone);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Plumbing CRM Dashboard</h1>
          <div className="space-x-2">
            <Button onClick={() => setShowCustomerForm(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Customer
            </Button>
            <Button onClick={() => setShowJobForm(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Create Job
            </Button>
          </div>
        </div>

        <Tabs defaultValue="customers" className="w-full">
          <TabsList>
            <TabsTrigger value="customers">Customers</TabsTrigger>
            <TabsTrigger value="jobs">Jobs</TabsTrigger>
            <TabsTrigger value="dispatch">Dispatch</TabsTrigger>
            <TabsTrigger value="invoicing">Invoicing</TabsTrigger>
            <TabsTrigger value="leads">Google Ads Leads</TabsTrigger>
          </TabsList>

          <TabsContent value="customers">
            {showCustomerForm ? (
              <CustomerForm
                customer={selectedCustomer}
                onSubmit={handleCustomerSubmit}
                onCancel={() => {
                  setShowCustomerForm(false);
                  setSelectedCustomer(undefined);
                }}
              />
            ) : (
              <CustomerList
                customers={customers}
                onEditCustomer={handleEditCustomer}
                onDeleteCustomer={handleDeleteCustomer}
                onCallCustomer={handleCallCustomer}
              />
            )}
          </TabsContent>

          <TabsContent value="jobs">
            {showJobForm ? (
              <JobForm
                job={selectedJob}
                onSubmit={handleJobSubmit}
                onCancel={() => {
                  setShowJobForm(false);
                  setSelectedJob(undefined);
                }}
              />
            ) : (
              <JobList
                jobs={jobs}
                onEditJob={handleEditJob}
                onDeleteJob={handleDeleteJob}
              />
            )}
          </TabsContent>

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

          <TabsContent value="leads">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <GoogleAdsImport onDataImported={(data) => console.log('Imported data:', data)} />
              <GoogleLocalServices />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default JobDashboard;
