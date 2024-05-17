import { Center, Text } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

function Footer(): JSX.Element {
  return (
    <Center w="100%" h="10vh" backgroundColor="white">
      <NavLink to="/notices">
        <Text textStyle="textSmall">Mentions légales</Text>
      </NavLink>
    </Center>
  );
}

export default Footer;
