import { Form } from "@/@Types/utils";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Box, FormControl, FormErrorMessage, FormLabel, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { useState } from "react";

export function PasswordInput({value, onChange, required, label} : Form ):JSX.Element {
  const [show, setShow] = useState<boolean>(false);
  const handleClick : () => void = () => setShow(!show);
  const isError : boolean = required && value === "";
  
  return (
    <FormControl py={4} isRequired = { required } isInvalid={isError}>
      <FormLabel variant="h6">{label}</FormLabel>
      <InputGroup size="sm">
        <Input
          value={value}
          onChange={onChange}
          type={show ? "text" : "password"}
          placeholder="********"
          />

          <InputRightElement w="4.5rem" onClick={handleClick}>
            <Box>
              {show ? <ViewOffIcon /> : <ViewIcon />}
            </Box>
          </InputRightElement>
      </InputGroup>
      <FormErrorMessage>{label} est obligatoire</FormErrorMessage>
    </FormControl>
  );
}