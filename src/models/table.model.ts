import { VIEW_TYPES } from "../constants";
import { ITransaction } from "./transaction.model";

export interface ITable {
  data: ITransaction[];
  headers: string[];
  columns: IColumn[];
  onRowClick: (signature: string) => void;
}

export interface IColumn {
  isKey?: boolean;
  key: string;
  viewType: VIEW_TYPES;
  isEllipsised?: boolean;
  haveAction?: boolean;
  isCapitalized?: boolean;
  url?: string;
}
