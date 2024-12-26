import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PhoneCall } from "lucide-react";

interface PhoneNumber {
  id: string;
  number: string;
  status: "active" | "pending";
}

interface PhoneNumbersListProps {
  phoneNumbers: PhoneNumber[];
}

export const PhoneNumbersList = ({ phoneNumbers }: PhoneNumbersListProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Phone Numbers</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {phoneNumbers.map((number) => (
            <div
              key={number.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center gap-3">
                <PhoneCall className="h-5 w-5 text-[#0FA0CE]" />
                <span className="font-medium">{number.number}</span>
                <span
                  className={`text-sm px-2 py-1 rounded-full ${
                    number.status === "active"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {number.status}
                </span>
              </div>
              <Button variant="outline" size="sm">
                Configure
              </Button>
            </div>
          ))}
          {phoneNumbers.length === 0 && (
            <div className="text-center text-gray-500 py-8">
              No phone numbers found. Purchase your first number above.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};