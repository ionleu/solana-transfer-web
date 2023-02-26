import { VIEW_TYPES } from "../constants";
import { ITransaction } from "./transaction.model";

export interface ITable {
  data: ITransaction[];
  headers: string[];
  columns: IColumns[];
  onRowClick: (signature: string) => void;
}

interface IColumns {
  isKey?: boolean;
  key: string;
  viewType: VIEW_TYPES;
  isEllipsised?: boolean;
  haveAction?: boolean;
  isCapitalized?: boolean;
  url?: string;
}
