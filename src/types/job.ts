
export type JobStatus = 'pending' | 'in_progress' | 'completed' | 'cancelled';

export interface JobNote {
  id: string;
  content: string;
  timestamp: string;
  authorId: string;
  photos?: string[];
}

export interface Job {
  id: string;
  customerId: string;
  title: string;
  description: string;
  status: JobStatus;
  location: {
    address: string;
    lat?: number;
    lng?: number;
  };
  assignedTeamId?: string;
  priority: 'low' | 'medium' | 'high' | 'emergency';
  createdAt: string;
  scheduledFor: string;
  completedAt?: string;
  notes: JobNote[];
  estimatedCost?: number;
  finalCost?: number;
}
