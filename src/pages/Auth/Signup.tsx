import { SignupForm } from "@/components/Form";
import { Flex, Heading, Text } from "@chakra-ui/react";

export const Signup = () : JSX.Element => {
  return (
    <Flex h="100%" p={10} flexDirection="column" gap="10">
      <Heading as="h1" variant="h1">Inscription à FootFinder</Heading>
      <Text textStyle="secondTitle" textAlign="center"> Bienvenue dans  un monde d'opportunité sans limite</Text>
      <SignupForm/>
    </Flex>
  );
};

