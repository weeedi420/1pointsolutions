
export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  notes?: string;
  createdAt: string;
  lastJobDate?: string;
  totalSpent: number;
  jobHistory: {
    id: string;
    title: string;
    date: string;
    cost: number;
  }[];
}
