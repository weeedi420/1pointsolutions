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
        <CardTitle className="flex items-center gap-2">
          <PhoneIncoming className="h-5 w-5 text-[#0FA0CE]" />
          Inbound Calling
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <Input
              placeholder="Area code (e.g. 415)"
              className="w-40"
              value={areaCode}
              onChange={(e) => onAreaCodeChange(e.target.value)}
              maxLength={3}
            />
            <Button onClick={onPurchaseNumber}>
              <Plus className="mr-2 h-4 w-4" />
              Purchase Number
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};