import { Form } from "@/@Types/utils";
import { FormControl, FormErrorMessage, FormLabel, Select } from "@chakra-ui/react";



export function FootSelect({ value, onChange, required, placeholder = "-- Votre pied fort --" }: Form) {
  const isError : boolean = required && value === "";
 
  return (
    <FormControl py={4} isRequired = { required } isInvalid={isError}>
      <FormLabel variant="h6">
        Pied fort
      </FormLabel>
      <Select placeholder={placeholder} value={value} onChange={onChange}>
          <option value="true">Droit</option>
          <option value="false">Gauche</option>
      </Select>
      <FormErrorMessage>Le pied fort est requis</FormErrorMessage>
    </FormControl>
  );
}