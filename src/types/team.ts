
export type TeamMemberStatus = "available" | "busy" | "offline";

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  phone: string;
  email: string;
  status: TeamMemberStatus;
  location: string;
  activeJob?: string;
  skills: string[];
}
