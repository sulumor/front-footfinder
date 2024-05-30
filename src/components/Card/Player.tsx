import { PlayerView } from "@/@Types";
import { calculateAge } from "@/utils/functions";
import { Avatar, Box, Button, Card, CardBody, CardFooter, CardHeader, Flex, Text, useDisclosure } from "@chakra-ui/react";
import { AddPlayerFollowerAlert } from "../Alert";

export function PlayerCard({ player }: { player: PlayerView }): JSX.Element {
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  return (
    <Card key={player?.id}>
      <CardHeader>
        <Flex
          flex="1"
          gap="4"
          alignItems="center"
          flexWrap="wrap"
          flexDirection="column"
        >
          <Avatar
            name={player?.lastname}
            src={player?.avatar}
          />
          <Box>
            <Text textStyle="mainText">
              {player?.firstname}
              {" "}
              {player?.lastname}
            </Text>
            <Text textStyle="text">{player?.teams[0]?.club_name}</Text>
          </Box>
        </Flex>
      </CardHeader>
      <CardBody>
        <Flex>
          <Text textStyle="h5">Âge</Text>
          <Text ml="2" textStyle="text">
            {calculateAge(player?.birth_date as string)} ans
          </Text>
        </Flex>
        <Flex>
          <Text textStyle="h5">Poste</Text>
          <Text ml="2" textStyle="text">
            {player?.position}
          </Text>
        </Flex>
        <Flex>
          <Text textStyle="h5">Pied fort</Text>
          <Text ml="2" textStyle="text">
            {player?.strong_foot}
          </Text>
        </Flex>
        <Flex>
          <Text textStyle="h5">Taille</Text>
          <Text ml="2" textStyle="text">
            {player?.height} cm
          </Text>
        </Flex>
        <Flex>
          <Text textStyle="h5">Poids</Text>
          <Text ml="2" textStyle="text">
            {player?.weight} kg
          </Text>
        </Flex>
        <Flex>
          <Text textStyle="h5">Nationalité</Text>
          <Text ml="2" textStyle="text">
            {player?.nationality}
          </Text>
        </Flex>
        <Flex>
          <Text textStyle="h5">Matchs joués</Text>
          <Text ml="2" textStyle="text">
            {player?.number_of_matches_played}
          </Text>
        </Flex>
      </CardBody>
      <CardFooter>
        <Button
          variant="outline"
          colorScheme="red"
          w="full"
          onClick={onOpen}
          >
          Ajouter
        </Button>
        <AddPlayerFollowerAlert isOpen={isOpen} onClose={onClose} player={player} />
      </CardFooter>
    </Card>

  );
}