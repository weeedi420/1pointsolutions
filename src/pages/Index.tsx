import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Phone, MessageSquare, Image, Search, Users, LineChart, Calendar as CalendarIcon } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [calendarImages, setCalendarImages] = useState<{[key: string]: string}>({});
  const { toast } = useToast();

  const { data: callStats, isLoading } = useQuery({
    queryKey: ['callStats'],
    queryFn: async () => {
      return {
        totalCalls: 0,
        averageDuration: '0:00',
        leadGenerated: 0,
      };
    },
  });

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && selectedDate) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const dateKey = selectedDate.toISOString().split('T')[0];
        setCalendarImages(prev => ({
          ...prev,
          [dateKey]: reader.result as string
        }));
        toast({
          title: "Success",
          description: "Image added to calendar",
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const stats = [
    { label: "Total Calls", value: isLoading ? "..." : callStats?.totalCalls || "0", icon: Phone },
    { label: "Content Generated", value: "0", icon: MessageSquare },
    { label: "Images Uploaded", value: Object.keys(calendarImages).length.toString(), icon: Image },
    { label: "Keywords Tracked", value: "0", icon: Search },
    { label: "Social Mentions", value: "0", icon: Users },
    { label: "Lead Conversion", value: "0%", icon: LineChart },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col items-start">
          <h1 className="text-3xl font-bold text-[#222222]">Welcome to 1Point Solutions</h1>
          <p className="text-gray-600 mt-2">
            Your business solutions hub
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat) => (
            <Card key={stat.label} className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-[#0FA0CE]/10 rounded-lg">
                  <stat.icon className="h-6 w-6 text-[#0FA0CE]" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {stat.label}
                  </p>
                  <p className="text-2xl font-semibold text-[#222222]">
                    {stat.value}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Calendar</h2>
            <div className="flex flex-col space-y-4">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border"
              />
              {selectedDate && (
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="cursor-pointer"
                    />
                    <Button variant="outline">
                      <Image className="h-4 w-4 mr-2" />
                      Add Image
                    </Button>
                  </div>
                  {selectedDate && calendarImages[selectedDate.toISOString().split('T')[0]] && (
                    <div className="mt-4">
                      <img
                        src={calendarImages[selectedDate.toISOString().split('T')[0]]}
                        alt="Calendar entry"
                        className="max-w-full h-auto rounded-lg"
                      />
                    </div>
                  )}
                </div>
              )}
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