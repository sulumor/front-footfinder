import { Form } from "@/@Types/utils";
import { FormControl, FormErrorMessage, FormLabel, Input } from "@chakra-ui/react";

export function FormInput({label, value, onChange, placeholder, required} : Form ):JSX.Element {
  const isError : boolean = required && value === "";
  
  return (
    <FormControl py={4} isRequired = { required } isInvalid={isError}>
      <FormLabel variant="h6">{label}</FormLabel>
      <Input
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      <FormErrorMessage>{label} est obligatoire</FormErrorMessage>
    </FormControl>
  );
}