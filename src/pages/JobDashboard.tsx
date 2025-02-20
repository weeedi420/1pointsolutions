import { useState } from "react";
import { Plus } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CustomerForm } from "@/components/customers/CustomerForm";
import { JobList } from "@/components/jobs/JobList";
import { JobForm } from "@/components/jobs/JobForm";
import QuickInvoice from "@/components/invoicing/QuickInvoice";
import BatchInvoicing from "@/components/invoicing/BatchInvoicing";
import InvoiceReminders from "@/components/invoicing/InvoiceReminders";
import type { Customer } from "@/types/customer";
import type { Job } from "@/types/job";
import TeamList from "@/components/team/TeamList";
import { TeamMemberForm } from "@/components/team/TeamMemberForm";
import type { TeamMember } from "@/types/team";

const JobDashboard = () => {
  const [showCustomerForm, setShowCustomerForm] = useState(false);
  const [showJobForm, setShowJobForm] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | undefined>();
  const [selectedJob, setSelectedJob] = useState<Job | undefined>();

  // Mock customer data
  const [customers, setCustomers] = useState<Customer[]>([
    {
      id: "1",
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "07700 900000",
      address: "123 Main Street, London",
      notes: "VIP customer",
      createdAt: "2024-01-20T12:00:00.000Z",
      totalSpent: 1250,
      jobHistory: [
        { id: "1", title: "Leaky Tap Repair", date: "2024-01-15", cost: 150 },
        { id: "2", title: "Boiler Service", date: "2023-11-01", cost: 250 },
      ],
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane.smith@example.com",
      phone: "07700 900001",
      address: "456 High Street, London",
      createdAt: "2024-01-22T14:30:00.000Z",
      totalSpent: 800,
      jobHistory: [
        { id: "3", title: "Blocked Drain", date: "2024-01-18", cost: 120 },
        { id: "4", title: "New Shower Installation", date: "2023-12-10", cost: 550 },
      ],
    },
  ]);

  // Mock job data
  const [jobs, setJobs] = useState<Job[]>([
    {
      id: "1",
      title: "Leaky Tap Repair",
      description: "Repair leaky tap in bathroom",
      customer: "1",
      location: { address: "123 Main Street, London", lat: 51.5074, lng: 0.1278 },
      scheduledFor: "2024-02-01T09:00:00.000Z",
      status: "pending",
      priority: "medium",
      cost: 150,
      materials: ["Tap", "Washer"],
      notes: "Customer reports tap is dripping constantly",
    },
    {
      id: "2",
      title: "Boiler Service",
      description: "Annual boiler service",
      customer: "1",
      location: { address: "123 Main Street, London", lat: 51.5074, lng: 0.1278 },
      scheduledFor: "2024-02-05T11:00:00.000Z",
      status: "in_progress",
      priority: "high",
      cost: 250,
      materials: ["Service Kit"],
      notes: "Check for leaks and carbon monoxide",
    },
    {
      id: "3",
      title: "Blocked Drain",
      description: "Unblock kitchen drain",
      customer: "2",
      location: { address: "456 High Street, London", lat: 51.515, lng: -0.116 },
      scheduledFor: "2024-02-03T14:00:00.000Z",
      status: "completed",
      priority: "medium",
      cost: 120,
      materials: ["Drain Cleaner"],
      notes: "Drain is slow to empty",
    },
  ]);

  const [showTeamMemberForm, setShowTeamMemberForm] = useState(false);
  const [selectedTeamMember, setSelectedTeamMember] = useState<TeamMember | undefined>();
  
  // Mock team members data
  const [teamMembers] = useState<TeamMember[]>([
    {
      id: "1",
      name: "Mike Thompson",
      role: "Senior Plumber",
      phone: "07700 900789",
      email: "mike.t@company.com",
      status: "available",
      location: "North London",
      skills: ["Boiler Installation", "Emergency Repairs"]
    },
    {
      id: "2",
      name: "Lisa Chen",
      role: "Plumber",
      phone: "07700 900321",
      email: "lisa.c@company.com",
      status: "busy",
      location: "South London",
      activeJob: "Bathroom Installation",
      skills: ["Bathroom Fitting", "Pipe Repairs"]
    }
  ]);

  const handleCustomerSubmit = (customerData: Partial<Customer>) => {
    setCustomers(prevCustomers => {
      if (selectedCustomer) {
        return prevCustomers.map(c => c.id === selectedCustomer.id ? { ...c, ...customerData } : c);
      }
      return [...prevCustomers, { ...customerData, id: Date.now().toString(), createdAt: new Date().toISOString(), totalSpent: 0, jobHistory: [] } as Customer];
    });
    setShowCustomerForm(false);
    setSelectedCustomer(undefined);
  };

  const handleJobSubmit = (jobData: Partial<Job>) => {
    setJobs(prevJobs => {
      if (selectedJob) {
        return prevJobs.map(j => j.id === selectedJob.id ? { ...j, ...jobData } : j);
      }
      return [...prevJobs, { ...jobData, id: Date.now().toString() } as Job];
    });
    setShowJobForm(false);
    setSelectedJob(undefined);
  };

  const handleEditCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    setShowCustomerForm(true);
  };

  const handleEditJob = (job: Job) => {
    setSelectedJob(job);
    setShowJobForm(true);
  };

  const handleDeleteCustomer = (customerId: string) => {
    setCustomers(prevCustomers => prevCustomers.filter(c => c.id !== customerId));
  };

  const handleDeleteJob = (jobId: string) => {
    setJobs(prevJobs => prevJobs.filter(j => j.id !== jobId));
  };

  const handleTeamMemberSubmit = (memberData: Partial<TeamMember>) => {
    // TODO: Implement team member creation/update
    console.log("Submitting team member:", memberData);
    setShowTeamMemberForm(false);
    setSelectedTeamMember(undefined);
  };

  const handleAssignJob = (memberId: string) => {
    // TODO: Implement job assignment
    console.log("Assigning job to team member:", memberId);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Plumbing CRM Dashboard</h1>
          <div className="space-x-2">
            <Button onClick={() => setShowTeamMemberForm(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Team Member
            </Button>
            <Button onClick={() => setShowCustomerForm(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Customer
            </Button>
            <Button onClick={() => setShowJobForm(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Job
            </Button>
          </div>
        </div>

        <Tabs defaultValue="team" className="w-full">
          <TabsList>
            <TabsTrigger value="team">Team</TabsTrigger>
            <TabsTrigger value="customers">Customers</TabsTrigger>
            <TabsTrigger value="jobs">Jobs</TabsTrigger>
            <TabsTrigger value="invoicing">Invoicing</TabsTrigger>
          </TabsList>

          <TabsContent value="team">
            {showTeamMemberForm ? (
              <TeamMemberForm
                member={selectedTeamMember}
                onSubmit={handleTeamMemberSubmit}
                onCancel={() => {
                  setShowTeamMemberForm(false);
                  setSelectedTeamMember(undefined);
                }}
              />
            ) : (
              <TeamList
                members={teamMembers}
                onAssignJob={handleAssignJob}
              />
            )}
          </TabsContent>

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
              <JobList
                jobs={jobs}
                onEditJob={handleEditJob}
                onDeleteJob={handleDeleteJob}
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
                customers={customers}
              />
            ) : (
              <JobList
                jobs={jobs}
                onEditJob={handleEditJob}
                onDeleteJob={handleDeleteJob}
              />
            )}
          </TabsContent>

          <TabsContent value="invoicing">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Quick Invoice</h3>
                <QuickInvoice />
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Batch Invoicing</h3>
                <BatchInvoicing />
              </div>
            </div>
            <div className="mt-4">
              <InvoiceReminders />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default JobDashboard;
