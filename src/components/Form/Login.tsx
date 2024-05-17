import { ViewOffIcon, ViewIcon } from "@chakra-ui/icons";
import {
  Flex, FormControl, FormLabel, Input, InputGroup, InputRightElement, Button, Box, useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { validateEmail, validatePassword } from "@/utils/validation";
import { useAuth } from "@/context/Auth";
import { Login as LoginType } from "@/@Types";

export function LoginForm(): JSX.Element {
  const [show, setShow] = useState<boolean>(false);
  const toast = useToast();
  const handleClick : () => void = () => setShow(!show);
  const navigate = useNavigate();
  const {
    login, error, loading, user,
  } = useAuth();
  const [formValues, setFormValues] = useState<LoginType>({
    email: "jean.dujardin@mail.io",
    password: "yjjk8E676a9JQZ!",
  });

  const handleChangeField = (user: "email" | "password") => (value: string) : void => {
    setFormValues({ ...formValues, [user]: value });
  };

  const setEnableButton = () : boolean => {
    const isValidPassword : boolean = validatePassword(formValues.password);
    const isValidEmail : boolean = validateEmail(formValues.email);
    return isValidEmail && isValidPassword;
  };

  const handleSubmit = async () : Promise<void> => {
    await login(formValues);
  };

  useEffect(() => {
    if (user) {
      if (user.role === "joueur") {
        navigate("/player");
      } else if (user.role === "recruteur") {
        navigate("/scout");
      }
    }
    if (error !== "") {
      toast({
        title: "Connexion pas possible",
        description: error,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  }, [error, user]);

  return (
    <Flex w="80%" m="0 auto" justifyContent="center">
      <form onSubmit={handleSubmit}>
        <FormControl id="email" mb="5">
          <FormLabel variant="h6">Email</FormLabel>
          <Input
            htmlSize={24}
            value={formValues.email}
            onChange={(e) => handleChangeField("email")(e.target.value)}
            placeholder="ex: john.doe@example.io"
            size="sm"
          />
        </FormControl>
        <FormControl id="password" mb="5">
          <FormLabel variant="h6">Mot de passe</FormLabel>
          <InputGroup size="sm">
            <Input
              value={formValues.password}
              onChange={(e) => handleChangeField("password")(e.target.value)}
              type={show ? "text" : "password"}
              placeholder="********"
              size="sm"
            />

            <InputRightElement w="4.5rem" onClick={handleClick}>
              <Box>
                {show ? <ViewOffIcon /> : <ViewIcon />}
              </Box>
            </InputRightElement>

          </InputGroup>
        </FormControl>
        <Button isLoading={loading} w="full" variant="redEvo" onClick={handleSubmit} isDisabled={!setEnableButton()}>
          Se connecter
        </Button>
        <div>
          <p>scout:</p>
          <p>nicolas.dupon@mail.io X346Dc5V7kfYmv!</p>
        </div>
      </form>
    </Flex>
  );
}
