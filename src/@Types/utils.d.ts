export interface Modal {
  isOpen:boolean; 
  onClose:() => void;
}

export interface Form {
  label?: string; 
  placeholder?: string; 
  value: string | number; 
  onChange: React.ChangeEventHandler; 
  required: boolean;
}