import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PhoneIncoming, Plus } from "lucide-react";

interface InboundCallingProps {
  areaCode: string;
  onAreaCodeChange: (value: string) => void;
  onPurchaseNumber: () => void;
}

export const InboundCalling = ({
  areaCode,
  onAreaCodeChange,
  onPurchaseNumber,
}: InboundCallingProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <PhoneIncoming className="h-6 w-6 text-[#0FA0CE]" />
          Inbound Calling
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <Input
              placeholder="Area code (e.g. 415)"
              className="flex-1"
              value={areaCode}
              onChange={(e) => onAreaCodeChange(e.target.value)}
              maxLength={3}
            />
            <Button 
              onClick={onPurchaseNumber}
              className="bg-[#0FA0CE] hover:bg-[#0FA0CE]/90 text-white px-6"
            >
              <Plus className="mr-2 h-5 w-5" />
              Purchase Number
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};