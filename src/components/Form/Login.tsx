import {
  Flex, Button, useToast,
} from "@chakra-ui/react";
import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { validateEmail, validatePassword } from "@/utils/validation";
import { useAuth } from "@/context/Auth";
import { Login as LoginType } from "@/@Types";
import { FormInput, PasswordInput } from "../Input";

export function LoginForm(): JSX.Element {
  const toast = useToast();
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
        <FormInput 
          required={false}
          label={"Email"}
          placeholder={"ex: john.doe@example.io"}
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
        <div>
          <p>scout:</p>
          <p>nicolas.dupon@mail.io X346Dc5V7kfYmv!</p>
        </div>
      </form>
    </Flex>
  );
}
