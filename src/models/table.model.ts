import { ITransaction } from "./transaction.model";

export interface ITable {
  data: ITransaction[];
  headers: string[];
}
