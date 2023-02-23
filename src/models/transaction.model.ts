export interface ITransaction {
  to: string | null;
  signature: string;
  createdAt?: string;
  amount: string | null;
  status?: "processed" | "finalized";
}
