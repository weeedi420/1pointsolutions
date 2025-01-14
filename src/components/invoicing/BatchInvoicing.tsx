import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { CheckCircle } from "lucide-react";

const BatchInvoicing = () => {
  const { toast } = useToast();
  const [selectedJobs, setSelectedJobs] = useState<string[]>([]);

  // Mock data - replace with actual job data
  const pendingJobs = [
    { id: "1", customer: "John Doe", service: "Plumbing", amount: 150 },
    { id: "2", customer: "Jane Smith", service: "HVAC", amount: 200 },
    { id: "3", customer: "Bob Wilson", service: "Electrical", amount: 175 },
  ];

  const handleBatchInvoice = () => {
    // TODO: Integrate with payment processing
    toast({
      title: "Batch Invoices Created",
      description: `${selectedJobs.length} invoices have been created and sent.`,
    });
    setSelectedJobs([]);
  };

  const toggleJobSelection = (jobId: string) => {
    setSelectedJobs(prev =>
      prev.includes(jobId)
        ? prev.filter(id => id !== jobId)
        : [...prev, jobId]
    );
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        {pendingJobs.map(job => (
          <div
            key={job.id}
            className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50"
          >
            <div>
              <p className="font-medium">{job.customer}</p>
              <p className="text-sm text-gray-500">{job.service} - ${job.amount}</p>
            </div>
            <Button
              variant={selectedJobs.includes(job.id) ? "default" : "outline"}
              onClick={() => toggleJobSelection(job.id)}
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              {selectedJobs.includes(job.id) ? "Selected" : "Select"}
            </Button>
          </div>
        ))}
      </div>
      <Button
        className="w-full"
        disabled={selectedJobs.length === 0}
        onClick={handleBatchInvoice}
      >
        Create {selectedJobs.length} Invoices
      </Button>
    </div>
  );
};

export default BatchInvoicing;