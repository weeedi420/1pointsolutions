
import { useState } from "react";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreVertical, FileEdit, Trash, Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { Customer } from "@/types/customer";

interface CustomerListProps {
  customers: Customer[];
  onEditCustomer: (customer: Customer) => void;
  onDeleteCustomer: (customerId: string) => void;
  onCallCustomer: (phone: string) => void;
}

export const CustomerList = ({
  customers,
  onEditCustomer,
  onDeleteCustomer,
  onCallCustomer,
}: CustomerListProps) => {
  const { toast } = useToast();
  const [sortField, setSortField] = useState<keyof Customer>("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const handleSort = (field: keyof Customer) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const sortedCustomers = [...customers].sort((a, b) => {
    if (sortDirection === "asc") {
      return a[sortField] > b[sortField] ? 1 : -1;
    }
    return a[sortField] < b[sortField] ? 1 : -1;
  });

  return (
    <Card className="p-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead onClick={() => handleSort("name")} className="cursor-pointer">
              Customer Name
            </TableHead>
            <TableHead onClick={() => handleSort("email")} className="cursor-pointer">
              Contact Info
            </TableHead>
            <TableHead onClick={() => handleSort("lastJobDate")} className="cursor-pointer">
              Last Job
            </TableHead>
            <TableHead onClick={() => handleSort("totalSpent")} className="cursor-pointer">
              Total Spent
            </TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedCustomers.map((customer) => (
            <TableRow key={customer.id}>
              <TableCell>
                <div>
                  <p className="font-medium">{customer.name}</p>
                  <p className="text-sm text-gray-500">{customer.address}</p>
                </div>
              </TableCell>
              <TableCell>
                <div>
                  <p>{customer.email}</p>
                  <p className="text-sm text-gray-500">{customer.phone}</p>
                </div>
              </TableCell>
              <TableCell>
                {customer.lastJobDate
                  ? new Date(customer.lastJobDate).toLocaleDateString()
                  : "No jobs yet"}
              </TableCell>
              <TableCell>£{customer.totalSpent.toLocaleString()}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onCallCustomer(customer.phone)}
                  >
                    <Phone className="h-4 w-4" />
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onEditCustomer(customer)}>
                        <FileEdit className="mr-2 h-4 w-4" />
                        Edit Customer
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-red-600"
                        onClick={() => {
                          onDeleteCustomer(customer.id);
                          toast({
                            title: "Customer Deleted",
                            description: "The customer has been successfully deleted.",
                          });
                        }}
                      >
                        <Trash className="mr-2 h-4 w-4" />
                        Delete Customer
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};
