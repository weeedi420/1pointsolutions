import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PhoneOutgoing } from "lucide-react";

interface OutboundCallingProps {
  outboundNumber: string;
  onOutboundNumberChange: (value: string) => void;
  onOutboundCall: () => void;
}

export const OutboundCalling = ({
  outboundNumber,
  onOutboundNumberChange,
  onOutboundCall,
}: OutboundCallingProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <PhoneOutgoing className="h-5 w-5 text-[#0FA0CE]" />
          Outbound Calling
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <Input
              placeholder="Phone number"
              className="flex-1"
              value={outboundNumber}
              onChange={(e) => onOutboundNumberChange(e.target.value)}
            />
            <Button onClick={onOutboundCall}>
              Make Call
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};