import { Form } from "@/@Types/utils";
import { FormControl, FormErrorMessage, FormLabel, Select } from "@chakra-ui/react";

export function NationalitySelect({ value, onChange, required }: Form) {
  const isError : boolean = required && value === "";
  
  return (
    <FormControl py={4} isRequired = { required } isInvalid={isError}>
      <FormLabel variant="h6">
        Nationalité
      </FormLabel>
      <Select placeholder="-- Votre nationalité --" value={value} onChange={onChange}>
          <option value="Français">Français</option>
          <option value="Brésilien">Brésilien</option>
          <option value="Espagnol">Espagnol</option>
          <option value="Anglais">Anglais</option>
          <option value="Allemand">Allemand</option>
          <option value="Argentin">Argentin</option>
          <option value="Italien">Italien</option>
          <option value="Portugais">Portugais</option>
          <option value="Néerlandais">Néerlandais</option>
          <option value="Belge">Belge</option>
          <option value="Suédois">Suédois</option>
      </Select>
      <FormErrorMessage>La nationalité est requise</FormErrorMessage>
    </FormControl>
  );
}