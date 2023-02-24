import { ITransaction } from "./transaction.model";

export interface ITable {
  data: ITransaction[];
  headers: string[];
  onRowClick: (signature: string) => void;
}
