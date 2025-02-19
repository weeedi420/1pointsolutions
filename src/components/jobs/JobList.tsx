
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
import { useToast } from "@/hooks/use-toast";
import { MoreVertical, FileEdit, Trash, Clock, AlertTriangle } from "lucide-react";
import type { Job, JobStatus } from "@/types/job";

const getStatusColor = (status: JobStatus) => {
  switch (status) {
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    case "in_progress":
      return "bg-blue-100 text-blue-800";
    case "completed":
      return "bg-green-100 text-green-800";
    case "cancelled":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getPriorityIcon = (priority: Job["priority"]) => {
  switch (priority) {
    case "emergency":
      return <AlertTriangle className="h-4 w-4 text-red-500" />;
    case "high":
      return <Clock className="h-4 w-4 text-orange-500" />;
    default:
      return null;
  }
};

interface JobListProps {
  jobs: Job[];
  onEditJob: (job: Job) => void;
  onDeleteJob: (jobId: string) => void;
}

export const JobList = ({ jobs, onEditJob, onDeleteJob }: JobListProps) => {
  const { toast } = useToast();
  const [sortField, setSortField] = useState<keyof Job>("scheduledFor");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const handleSort = (field: keyof Job) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const sortedJobs = [...jobs].sort((a, b) => {
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
            <TableHead onClick={() => handleSort("priority")} className="cursor-pointer">
              Priority
            </TableHead>
            <TableHead onClick={() => handleSort("title")} className="cursor-pointer">
              Job Details
            </TableHead>
            <TableHead onClick={() => handleSort("scheduledFor")} className="cursor-pointer">
              Scheduled For
            </TableHead>
            <TableHead onClick={() => handleSort("status")} className="cursor-pointer">
              Status
            </TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedJobs.map((job) => (
            <TableRow key={job.id}>
              <TableCell>
                {getPriorityIcon(job.priority)}
              </TableCell>
              <TableCell>
                <div>
                  <p className="font-medium">{job.title}</p>
                  <p className="text-sm text-gray-500">{job.location.address}</p>
                </div>
              </TableCell>
              <TableCell>
                {new Date(job.scheduledFor).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(job.status)}`}>
                  {job.status.replace("_", " ")}
                </span>
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onEditJob(job)}>
                      <FileEdit className="mr-2 h-4 w-4" />
                      Edit Job
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-red-600"
                      onClick={() => {
                        onDeleteJob(job.id);
                        toast({
                          title: "Job Deleted",
                          description: "The job has been successfully deleted.",
                        });
                      }}
                    >
                      <Trash className="mr-2 h-4 w-4" />
                      Delete Job
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};
