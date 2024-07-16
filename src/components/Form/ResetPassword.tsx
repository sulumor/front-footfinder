import {
  Button, Flex,
  useToast
} from "@chakra-ui/react";
import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { validatePassword } from "@/utils/validation";
import { PasswordInput } from "../Input";
import { useAuth } from "@/context/Auth";

export function ResetPasswordForm(): JSX.Element {
  const toast = useToast();
  const navigate = useNavigate()
  const { id, token } = useParams()
  const {
    resetPassword, error, loading,
  } = useAuth();
  const [formValues, setFormValues] = useState<{ password: string; confirmedPassword: string; }>({
    password: "",
    confirmedPassword: ""
  });

  const handleChangeField = (user: "password" | "confirmedPassword") => (value: string): void => {
    setFormValues({ ...formValues, [user]: value });
  };

  const setEnableButton = (): boolean => {
    const isValidPassword: boolean = validatePassword(formValues.password);
    return isValidPassword && formValues.password === formValues.confirmedPassword;
  };

  const handleSubmit = async (): Promise<void> => {
    const resp = await resetPassword({ ...formValues, id }, token);
    if (resp === "success") {
      toast({
        title: "Mot de passe à jour",
        description: "Vous pouvez vous connecter avec votre nouveau mot de passe",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      navigate("/login")
    }
  };

  useEffect(() => {
    if (error !== "") {
      toast({
        title: "Mot de passe pas à jour",
        description: error,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  }, [error]);

  return (
    <Flex w={{ base: "80%", md: "45%" }} m="0 auto" justifyContent="center">
      <form style={{ width: "100%" }} onSubmit={handleSubmit}>
        <PasswordInput
          required={false}
          label={"Mot de passe"}
          value={formValues.password}
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleChangeField("password")(e.target.value)}
        />
        <PasswordInput
          required={false}
          label={"Confirmation de mot de passe"}
          value={formValues.confirmedPassword}
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleChangeField("confirmedPassword")(e.target.value)}
        />
        <Button isLoading={loading} w="full" variant="redEvo" onClick={handleSubmit} isDisabled={!setEnableButton()}>
          Modifier mon mot de passe
        </Button>
      </form>
    </Flex>
  );
}