import {
  Button, Flex, Text,
  useToast
} from "@chakra-ui/react";
import { ChangeEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { validateEmail } from "@/utils/validation";
import { EmailInput } from "../Input";
import { useAuth } from "@/context/Auth";

export function ForgotPasswordForm(): JSX.Element {
  const toast = useToast();
  const navigate = useNavigate()
  const {
    forgotPassword, error, loading,
  } = useAuth();
  const [formValues, setFormValues] = useState<{ email: string; }>({
    email: ""
  });

  const handleChangeField = () => (value: string): void => {
    setFormValues({ email: value });
  };

  const setEnableButton = (): boolean => {
    const isValidEmail: boolean = validateEmail(formValues.email);
    return isValidEmail;
  };

  const handleSubmit = async (): Promise<void> => {
    const resp = await forgotPassword(formValues);
    if (resp === "success") {
      toast({
        title: "Email envoyé",
        description: "Nous venons de vous envoyer un email avec le lien pour réinitialiser votre mot de passe",
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
        title: "Email pas envoyé",
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
        <EmailInput
          required={false}
          value={formValues.email}
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleChangeField()(e.target.value)}
        />
        <Button isLoading={loading} w="full" variant="redEvo" onClick={handleSubmit} isDisabled={!setEnableButton()}>
          Envoyer
        </Button>
        <Text textAlign={"right"} mt={2} textStyle="textSmall">
          <Link to={"/login"}>Retour à la connexion</Link>
        </Text>
      </form>
    </Flex>
  );
}