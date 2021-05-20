export interface DialogProps {
  description: string;
  open: boolean;
  onClose: () => void;
  title: string;
}
