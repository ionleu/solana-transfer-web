export interface IModal {
  title: string;
  show: boolean;
  children?: React.ReactNode;
  onClose: () => void;
}
