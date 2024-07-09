import {
  Flex, Button, useToast,
  Text,
} from "@chakra-ui/react";
import { ChangeEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { validateEmail, validatePassword } from "@/utils/validation";
import { useAuth } from "@/context/Auth";
import { Login as LoginType } from "@/@Types";
import { EmailInput, PasswordInput } from "../Input";
import { TestPopover } from "../Popover";

export function LoginForm(): JSX.Element {
  const toast = useToast();
  const navigate = useNavigate();
  const {
    login, error, loading, user,
  } = useAuth();
  const [formValues, setFormValues] = useState<LoginType>({
    email: "",
    password: "",
  });

  const handleChangeField = (user: "email" | "password") => (value: string): void => {
    setFormValues({ ...formValues, [user]: value });
  };

  const setEnableButton = (): boolean => {
    const isValidPassword: boolean = validatePassword(formValues.password);
    const isValidEmail: boolean = validateEmail(formValues.email);
    return isValidEmail && isValidPassword;
  };

  const handleSubmit = async (): Promise<void> => {
    await login(formValues);
  };

  useEffect(() => {
    if (user) {
      if (user.role) {
        navigate("/player");
      } else if (!user.role) {
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
        <EmailInput
          required={false}
          value={formValues.email}
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleChangeField("email")(e.target.value)}
        />
        <PasswordInput
          required={false}
          label={"Mot de passe"}
          value={formValues.password}
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleChangeField("password")(e.target.value)}
        />
        <Button isLoading={loading} w="full" variant="redEvo" onClick={handleSubmit} isDisabled={!setEnableButton()}>
          Se connecter
        </Button>
        <Text textAlign={"right"} mt={2} textStyle="textSmall">
          <Link to={"/forgot-password"}>Mot de passe oublié</Link>
        </Text>
      </form>
    </Flex>
  );
}
