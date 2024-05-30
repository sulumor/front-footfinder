import { Form } from "@/@Types/utils";
import { FormControl, FormErrorMessage, FormLabel, Select } from "@chakra-ui/react";

export function FitnessSelect({ value, onChange, required, placeholder = "-- État de forme --" }: Form) {
  const isError : boolean = required && value === "";
  
  return (
    <FormControl py={4} isRequired = { required } isInvalid={isError}>
      <FormLabel variant="h6">
        État de forme
      </FormLabel>
      <Select placeholder={placeholder} value={value} onChange={onChange}>
        <option value="En forme">En forme</option>
        <option value="absent">absent</option>
        <option value="blessé">blesse</option>
      </Select>
      <FormErrorMessage>Votre état de forme est requis</FormErrorMessage>
    </FormControl>
  );
}