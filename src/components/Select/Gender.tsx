import { Form } from "@/@Types/utils";
import { FormControl, FormLabel, Select, FormErrorMessage } from "@chakra-ui/react";

export function GenderSelect({ value, onChange, required, placeholder = "-- Votre genre --" }: Form):JSX.Element{
  const isError : boolean = required && value === "";
  
  return (
    <FormControl py={4} isRequired = { required } isInvalid={isError}>
      <FormLabel variant="h6">
        Genre
      </FormLabel>
      <Select placeholder={placeholder} value={value} onChange={onChange}>
          <option value="Homme">Homme</option>
          <option value="Femme">Femme</option>
          <option value="Non-binaire">Non-binaire</option>
      </Select>
      <FormErrorMessage>Le pied fort est requis</FormErrorMessage>
    </FormControl>
  );
}