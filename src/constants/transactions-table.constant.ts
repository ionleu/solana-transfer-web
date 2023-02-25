import { VIEW_TYPES } from "./view-type.constant";

export const TRANSACTION_HEADER_LABELS = [
  "Signature",
  "Created",
  "Destination",
  "Amount (SOL)",
  "Status",
  "Solscan",
  "Solana Explorer",
];

export const TRANSACTION_COLUMNS = [
  {
    key: "signature",
    isKey: true,
    viewType: VIEW_TYPES.TEXT,
    isEllipsised: true,
    haveAction: true,
  },
  {
    key: "createdAt",
    viewType: VIEW_TYPES.TEXT,
  },
  { key: "to", viewType: VIEW_TYPES.TEXT, isEllipsised: true },
  { key: "amount", viewType: VIEW_TYPES.TEXT },
  { key: "status", viewType: VIEW_TYPES.TEXT, isCapitalized: true },
  {
    key: "signature",
    viewType: VIEW_TYPES.URL,
    url: "solscan.io",
  },
  {
    key: "signature",
    viewType: VIEW_TYPES.URL,
    url: "explorer.solana.com",
  },
];
