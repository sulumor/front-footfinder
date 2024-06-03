import {
  Avatar,
  Box,
  Flex,
  Text,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { UpdateProfilButton } from "@/components/Button";
import { useAuth } from "@/context/Auth";
import { ProfilInformation } from "@/components/Informations/Profil";

export function Profil() : JSX.Element {
  const { user, setHasToBeRefetch } = useAuth();
  useEffect(() => {
    setHasToBeRefetch(true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <Flex p={10} flexDirection="column" gap="2rem">
      <Flex my="2" gap={6}>
        <Avatar
          size="2xl"
          name={user?.lastname}
          src={user?.avatar === "SVG" ?  "https://bit.ly/kent-c-dodds" : user?.avatar}
        />
        <Box ml="4">
          <Text textStyle="secondTitle">
            {user?.firstname}
          </Text>
          <Text fontWeight="bold" textStyle="secondTitle">
            {user?.lastname}
          </Text>          
          {user?.role && (<Text fontSize="mainText">{user?.position}</Text>)}
        </Box>
      </Flex>
      <ProfilInformation/>
      <UpdateProfilButton alignSelf={"center"}/>
    </Flex>
  );
}

