import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Plus } from "lucide-react";

const QuickInvoice = () => {
  const { toast } = useToast();
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  const handleQuickInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Integrate with payment processing
    toast({
      title: "Invoice Created",
      description: `Quick invoice for $${amount} has been created and sent.`,
    });
    setAmount("");
    setDescription("");
  };

  return (
    <form onSubmit={handleQuickInvoice} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="amount">Amount</Label>
        <Input
          id="amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Input
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter service description"
          required
        />
      </div>
      <Button type="submit" className="w-full">
        <Plus className="mr-2 h-4 w-4" /> Create Quick Invoice
      </Button>
    </form>
  );
};

export default QuickInvoice;