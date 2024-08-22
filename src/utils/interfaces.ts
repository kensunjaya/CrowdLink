export interface Users {
  email: string;
  username: string;
  password: string;
}

export interface Campaign {
  title: string,
  description: string,
  author: string,
  currentFund: number,
  totalParticipant: number,
  targetFund: number,
}