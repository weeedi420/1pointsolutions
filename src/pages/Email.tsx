import DashboardLayout from "@/components/layout/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EmailComposer from "@/components/email/EmailComposer";
import SubscribersList from "@/components/email/SubscribersList";
import EmailAnalytics from "@/components/email/EmailAnalytics";

const Email = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-[#222222]">Email Marketing</h1>
          <p className="text-gray-600 mt-2">
            Create and manage your email campaigns
          </p>
        </div>

        <Tabs defaultValue="compose" className="space-y-4">
          <TabsList>
            <TabsTrigger value="compose">Compose</TabsTrigger>
            <TabsTrigger value="subscribers">Subscribers</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="compose">
            <EmailComposer />
          </TabsContent>

          <TabsContent value="subscribers">
            <SubscribersList />
          </TabsContent>

          <TabsContent value="analytics">
            <EmailAnalytics />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Email;