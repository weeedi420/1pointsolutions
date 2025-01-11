import DashboardLayout from "@/components/layout/DashboardLayout";
import { UserSettings } from "@/components/settings/UserSettings";
import { BusinessSettings } from "@/components/settings/BusinessSettings";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Settings = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-[#222222]">Settings</h1>
          <p className="text-gray-600 mt-2">Manage your account and business settings</p>
        </div>

        <Tabs defaultValue="user" className="w-full">
          <TabsList>
            <TabsTrigger value="user">User Settings</TabsTrigger>
            <TabsTrigger value="business">Business Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="user">
            <UserSettings />
          </TabsContent>
          <TabsContent value="business">
            <BusinessSettings />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Settings;