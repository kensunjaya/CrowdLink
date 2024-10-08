export interface Users {
  email: string;
  username: string;
  password: string;
  balance: number;
}

export interface CampaignInterface {
  author: string;
  title: string;
  description: string;
  targetFund: number;
  currentFund: number;
  totalParticipant: number;
  dueDate: string;
}