import { UseCounterProps } from "@chakra-ui/react";

export interface Modal {
  isOpen:boolean; 
  onClose:() => void;
}

export interface Form {
  label?: string; 
  placeholder?: string; 
  value?: string | number; 
  onChange: React.ChangeEventHandler; 
  required: boolean;
}

export interface NumberInput {
  label?: string; 
  placeholder?: string; 
  value: string | number; 
  onChange: UseCounterProps.onChange; 
  required: boolean;
  max?: number;
  step?: number;
}