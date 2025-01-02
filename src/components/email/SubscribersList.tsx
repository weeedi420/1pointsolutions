import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";
import { UserPlus, Trash2 } from "lucide-react";

const SubscribersList = () => {
  const [newEmail, setNewEmail] = useState("");
  const [subscribers, setSubscribers] = useState<string[]>([]);
  const { toast } = useToast();

  const handleAddSubscriber = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmail) return;

    if (!newEmail.includes("@")) {
      toast({
        title: "Error",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    setSubscribers([...subscribers, newEmail]);
    setNewEmail("");
    toast({
      title: "Success",
      description: "Subscriber added successfully",
    });
  };

  const handleRemoveSubscriber = (email: string) => {
    setSubscribers(subscribers.filter((s) => s !== email));
    toast({
      title: "Success",
      description: "Subscriber removed successfully",
    });
  };

  return (
    <Card className="p-6">
      <form onSubmit={handleAddSubscriber} className="space-y-6">
        <div className="flex gap-4">
          <Input
            type="email"
            placeholder="Enter subscriber email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
          />
          <Button type="submit">
            <UserPlus className="mr-2 h-4 w-4" />
            Add
          </Button>
        </div>
      </form>

      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4">Subscribers</h3>
        {subscribers.length === 0 ? (
          <p className="text-gray-500">No subscribers yet</p>
        ) : (
          <div className="space-y-2">
            {subscribers.map((email) => (
              <div
                key={email}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <span>{email}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemoveSubscriber(email)}
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
};

export default SubscribersList;