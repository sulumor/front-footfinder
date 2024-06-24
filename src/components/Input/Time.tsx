import { Form } from "@/@Types/utils";
import { FormControl, FormErrorMessage, FormLabel, Input } from "@chakra-ui/react";

export function TimeInput({ value, onChange, required, placeholder = "Selectionner l'heure" }: Form): JSX.Element {
  const isError: boolean = required && value === "";
  return (
    <FormControl py={4} isRequired={required} isInvalid={isError}>
      <FormLabel variant="h6">Heure du match</FormLabel>
      <Input
        type="time"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      <FormErrorMessage>Heure du match est obligatoire</FormErrorMessage>
    </FormControl>
  )
}