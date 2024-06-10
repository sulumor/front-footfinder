import { PlayerView, Team } from "@/@Types";
import { plurials } from "@/utils/functions";
import { Drawer, DrawerOverlay, DrawerContent, DrawerHeader, DrawerBody } from "@chakra-ui/modal";
import { Button, Flex, Text, useDisclosure } from "@chakra-ui/react";

export function ProfilDrawer({ player } : { player: PlayerView}): JSX.Element {
  const { isOpen, onClose, onOpen } = useDisclosure();
  
  return (
    <>
      <Button variant="solid" colorScheme="teal" onClick={onOpen}>
        Profil
      </Button>
      <Drawer onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth='1px'>Profil de {player.firstname} {player.lastname}</DrawerHeader>
          <DrawerBody>
            <Flex mb="2">
              <Text textStyle="h5">Poste</Text>
              <Text ml="2" textStyle="text">
                {player?.position}
              </Text>
            </Flex>
            <Flex mb="2">
              <Text textStyle="h5">Sexe</Text>
              <Text ml="2" textStyle="text">
                {player?.genre}
              </Text>
            </Flex>
            <Flex mb="2">
              <Text textStyle="h5">Club{plurials(player?.teams)}</Text>
              <Flex flexDirection="column">
                {player?.teams.map((team: Team) => (          
                  <Text key={player.id - team.id} ml="2" textStyle="text">
                    {team?.season} { team?.club_name}
                  </Text>
                ))}
              </Flex>
            </Flex>
            <Flex mb="2">
              <Text textStyle="h5">Nationalité</Text>
              <Text ml="2" textStyle="text">
                {player?.nationality}
              </Text>
            </Flex>
            <Flex mb="2">
              <Text textStyle="h5">Taille</Text>
              <Text ml="2" textStyle="text">
                {player?.height} cm
              </Text>
            </Flex>
            <Flex mb="2">
              <Text textStyle="h5">Poids</Text>
              <Text ml="2" textStyle="text">
                {player?.weight} kg
              </Text>
            </Flex>
            <Flex mb="2">
              <Text textStyle="h5">Pied</Text>
              <Text ml="2" textStyle="text">
                {player?.strong_foot}
              </Text>
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}