import React from 'react';
import { User, MapPin, Phone } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface TeamMember {
  id: string;
  name: string;
  status: 'available' | 'busy' | 'offline';
  location: string;
  phone: string;
}

const TeamList = ({ members }: { members: TeamMember[] }) => {
  const { toast } = useToast();

  const handleAssignJob = (memberId: string) => {
    toast({
      title: "Job Assigned",
      description: "Notification sent to team member",
    });
  };

  return (
    <div className="space-y-4">
      {members.map((member) => (
        <div
          key={member.id}
          className="p-4 bg-white rounded-lg shadow-sm border flex items-center justify-between"
        >
          <div className="flex items-center space-x-4">
            <div className={`w-3 h-3 rounded-full ${
              member.status === 'available' ? 'bg-green-500' :
              member.status === 'busy' ? 'bg-yellow-500' : 'bg-gray-500'
            }`} />
            <div>
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4" />
                <span className="font-medium">{member.name}</span>
              </div>
              <div className="text-sm text-gray-500 flex items-center space-x-2 mt-1">
                <MapPin className="h-4 w-4" />
                <span>{member.location}</span>
              </div>
              <div className="text-sm text-gray-500 flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>{member.phone}</span>
              </div>
            </div>
          </div>
          <Button
            onClick={() => handleAssignJob(member.id)}
            variant="outline"
            className="ml-4"
          >
            Assign Job
          </Button>
        </div>
      ))}
    </div>
  );
};

export default TeamList;