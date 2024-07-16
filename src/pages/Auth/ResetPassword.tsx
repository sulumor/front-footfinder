import { Flex, Heading, Text } from "@chakra-ui/react";
import { ResetPasswordForm } from "@/components/Form";

export function ResetPassword(): JSX.Element {
  return (
    <Flex h="100%" p={10} flexDirection="column" gap="10" alignItems="center">
      <Heading as="h1" variant="h1">Réinitialisation de votre mot de passe</Heading>
      <Text textStyle="secondTitle" textAlign="center"> Merci de notifier votre nouveau mot de passe</Text>
      <ResetPasswordForm />
    </Flex>
  );
}