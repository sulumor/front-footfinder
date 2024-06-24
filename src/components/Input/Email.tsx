import { Form } from "@/@Types/utils";
import { FormControl, FormErrorMessage, FormLabel, Input } from "@chakra-ui/react";

export function EmailInput({ value, onChange, required }: Form): JSX.Element {
  const isError: boolean = required && value === "";

  return (
    <FormControl py={4} isRequired={required} isInvalid={isError}>
      <FormLabel variant="h6">Email</FormLabel>
      <Input
        type="email"
        placeholder="ex: john.doe@example.io"
        value={value}
        onChange={onChange}
      />
      <FormErrorMessage>Email est obligatoire</FormErrorMessage>
    </FormControl>
  );
}