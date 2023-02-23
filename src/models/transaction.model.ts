export interface ITransaction {
  to: string;
  signature: string;
  createdAt?: number;
  amount: string;
  status?: "processed" | "finalized";
}
