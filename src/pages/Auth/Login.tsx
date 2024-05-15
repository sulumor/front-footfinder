import { LoginForm } from "@/components/Form";
import { Flex, Heading, Text} from "@chakra-ui/react";

export const Login = () : JSX.Element => {
  return (
    <Flex h="100%" p={10} flexDirection="column" gap="10">
      <Heading as="h1" variant="h1">Connexion à FootFinder</Heading>
      <Text textStyle="secondTitle" textAlign="center"> Explorez un monde d'opportunité sans limite</Text>
      <LoginForm />
    </Flex>
  )
};
