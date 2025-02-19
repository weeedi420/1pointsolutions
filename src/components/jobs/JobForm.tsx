
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, Upload } from "lucide-react";
import type { Job, JobStatus } from "@/types/job";

interface JobFormProps {
  job?: Job;
  onSubmit: (job: Partial<Job>) => void;
  onCancel: () => void;
}

export const JobForm = ({ job, onSubmit, onCancel }: JobFormProps) => {
  const [title, setTitle] = useState(job?.title || "");
  const [description, setDescription] = useState(job?.description || "");
  const [status, setStatus] = useState<JobStatus>(job?.status || "pending");
  const [priority, setPriority] = useState(job?.priority || "medium");
  const [address, setAddress] = useState(job?.location.address || "");
  const [scheduledDate, setScheduledDate] = useState<Date>(
    job?.scheduledFor ? new Date(job?.scheduledFor) : new Date()
  );
  const [photos, setPhotos] = useState<File[]>([]);
  const [estimatedCost, setEstimatedCost] = useState(job?.estimatedCost?.toString() || "");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const jobData: Partial<Job> = {
      title,
      description,
      status,
      priority,
      location: {
        address,
      },
      scheduledFor: scheduledDate.toISOString(),
      estimatedCost: parseFloat(estimatedCost) || undefined,
    };

    onSubmit(jobData);
    toast({
      title: "Success",
      description: `Job ${job ? "updated" : "created"} successfully`,
    });
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPhotos(Array.from(e.target.files));
    }
  };

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="title">Job Title</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter job title"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter job description"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select value={status} onValueChange={(value: JobStatus) => setStatus(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="priority">Priority</Label>
            <Select value={priority} onValueChange={(value) => setPriority(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="emergency">Emergency</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="address">Address</Label>
          <Input
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter job location"
            required
          />
        </div>

        <div className="space-y-2">
          <Label>Scheduled Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start text-left font-normal">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {format(scheduledDate, "PPP")}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={scheduledDate}
                onSelect={(date) => date && setScheduledDate(date)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <Label htmlFor="estimatedCost">Estimated Cost (£)</Label>
          <Input
            id="estimatedCost"
            type="number"
            value={estimatedCost}
            onChange={(e) => setEstimatedCost(e.target.value)}
            placeholder="Enter estimated cost"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="photos">Photos</Label>
          <div className="flex items-center space-x-2">
            <Input
              id="photos"
              type="file"
              onChange={handlePhotoUpload}
              accept="image/*"
              multiple
              className="hidden"
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => document.getElementById("photos")?.click()}
            >
              <Upload className="mr-2 h-4 w-4" />
              Upload Photos
            </Button>
            <span className="text-sm text-gray-500">
              {photos.length} photo{photos.length !== 1 ? "s" : ""} selected
            </span>
          </div>
        </div>

        <div className="flex justify-end space-x-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">
            {job ? "Update" : "Create"} Job
          </Button>
        </div>
      </form>
    </Card>
  );
};
