import { Form } from "@/@Types/utils";
import { FormControl, FormErrorMessage, FormLabel, Select } from "@chakra-ui/react";

export function FootSelect({  value, onChange, required }: Form) {
  const isError : boolean = required && value === "";
  
  return (
    <FormControl py={4} isRequired = { required } isInvalid={isError}>
      <FormLabel variant="h6">
        Pied fort
      </FormLabel>
      <Select placeholder="-- Votre pied fort --" value={value} onChange={onChange}>
          <option value="Droit">Droit</option>
          <option value="Gauche">Gauche</option>
      </Select>
      <FormErrorMessage>Le pied fort est requis</FormErrorMessage>
    </FormControl>
  );
}