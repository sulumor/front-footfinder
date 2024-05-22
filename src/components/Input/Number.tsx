import { NumberInput as NumberInputType } from "@/@Types/utils";
import { FormControl, FormLabel, NumberDecrementStepper, NumberIncrementStepper, NumberInputField, NumberInputStepper, NumberInput as Input, FormErrorMessage } from "@chakra-ui/react";

export function NumberInput({label, value, onChange, max = 95, required, step = 1} : NumberInputType ):JSX.Element{
  const isError : boolean = required && value === "";
  
  return (
    <FormControl py={4} isRequired = { required } isInvalid={isError}>
      <FormLabel variant="h6">{label}</FormLabel>
      <Input 
        min={0}
        max={max} 
        step={step}
        defaultValue={value} 
        onChange={onChange}
      >
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </Input>
      <FormErrorMessage>{label} est obligatoire</FormErrorMessage>
    </FormControl>
  );
}