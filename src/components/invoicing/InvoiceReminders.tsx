import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Bell, Send } from "lucide-react";

const InvoiceReminders = () => {
  const { toast } = useToast();
  
  // Mock data - replace with actual invoice data
  const overdueInvoices = [
    { id: "1", customer: "John Doe", amount: 150, daysOverdue: 5 },
    { id: "2", customer: "Jane Smith", amount: 200, daysOverdue: 7 },
    { id: "3", customer: "Bob Wilson", amount: 175, daysOverdue: 3 },
  ];

  const sendReminder = (invoiceId: string) => {
    // TODO: Integrate with email service
    toast({
      title: "Reminder Sent",
      description: "Payment reminder has been sent to the customer.",
    });
  };

  const sendAllReminders = () => {
    // TODO: Integrate with email service
    toast({
      title: "Reminders Sent",
      description: `Payment reminders sent to ${overdueInvoices.length} customers.`,
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Overdue Invoices</h3>
        <Button variant="outline" onClick={sendAllReminders}>
          <Bell className="h-4 w-4 mr-2" />
          Send All Reminders
        </Button>
      </div>
      <div className="space-y-2">
        {overdueInvoices.map(invoice => (
          <div
            key={invoice.id}
            className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50"
          >
            <div>
              <p className="font-medium">{invoice.customer}</p>
              <p className="text-sm text-gray-500">
                ${invoice.amount} - {invoice.daysOverdue} days overdue
              </p>
            </div>
            <Button
              variant="ghost"
              onClick={() => sendReminder(invoice.id)}
            >
              <Send className="h-4 w-4 mr-2" />
              Send Reminder
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InvoiceReminders;