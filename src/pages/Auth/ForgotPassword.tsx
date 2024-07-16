import { Flex, Heading, Text } from "@chakra-ui/react";
import { ForgotPasswordForm } from "@/components/Form";

export function ForgotPassword(): JSX.Element {
  return (
    <Flex h="100%" p={10} flexDirection="column" gap="10" alignItems="center">
      <Heading as="h1" variant="h1">Mot de passe oublié</Heading>
      <Text textStyle="secondTitle" textAlign="center"> Merci de notifier l'email avec lequel vous vous êtes enregistré(e)</Text>
      <ForgotPasswordForm />
    </Flex>
  );
}
