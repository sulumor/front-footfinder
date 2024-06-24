import { Form } from "@/@Types/utils";
import { formatToCalendar } from "@/utils/dateFunctions";
import { FormControl, FormErrorMessage, FormLabel, Input } from "@chakra-ui/react";

export function DateInput({ value, onChange, required, label, placeholder = "Selectionner la date" }: Form): JSX.Element {
  const isError: boolean = required && value === "";
  return (
    <FormControl py={4} isRequired={required} isInvalid={isError}>
      <FormLabel variant="h6">{label}</FormLabel>
      <Input
        type="date"
        placeholder={placeholder}
        value={formatToCalendar(value as number)}
        onChange={onChange}
      />
      <FormErrorMessage>{label} est obligatoire</FormErrorMessage>
    </FormControl>
  )
}