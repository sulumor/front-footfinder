import { Match, PlayerView, Team } from "@/@Types";
import { useAuth } from "@/context/Auth";
import crud from "@/utils/crud";
import { plurials, sortByDesc } from "@/utils/functions";
import { Drawer, DrawerOverlay, DrawerContent, DrawerHeader, DrawerBody } from "@chakra-ui/modal";
import { Box, Button, Flex, Heading, Text, useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { StatsBox } from "../Box";

export function ProfilDrawer({ player }: { player: PlayerView }): JSX.Element {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { user } = useAuth();
  const [nextMatch, setNextMatch] = useState<Match>();

  useEffect(() => {
    const fetchData = async () : Promise<void> => {
      const response = await crud.get(["scout/player", "match"], [player?.id]);
      let oneMatch: Match[] = [];
      if (response.status === 200) oneMatch = sortByDesc(response.data);
      setNextMatch(oneMatch[0]);
    };
    fetchData();
  }, [user, player]);

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
              <Text textStyle="h5">Genre</Text>
              <Text ml="2" textStyle="text">
                {player?.gender}
              </Text>
            </Flex>
            <Flex mb="2">
              <Text textStyle="h5">Poste</Text>
              <Text ml="2" textStyle="text">
                {player?.position}
              </Text>
            </Flex>
            <Flex mb="2">
              <Text textStyle="h5">Club{plurials(player?.teams)}</Text>
              <Flex flexDirection="column">
                {player?.teams.sort(function (a: Team, b : Team) {
                    return Number.parseInt(b.season, 10) - Number.parseInt(a.season, 10);
                }).map((team: Team) => (
                  <Text key={player.id - team.id} ml="2" textStyle="text">
                    {team?.season} {team?.club_name}
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
                {player?.strong_foot ? "Droit" : "Gauche"}
              </Text>
            </Flex>
            {
              nextMatch ? (
                <Box>
                  <Heading as="h3" variant="h3" textAlign="center">Dernier match</Heading>
                  <Text textStyle="h4" textAlign="center">
                    {new Date(nextMatch?.date as Date).toLocaleDateString("fr-FR", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </Text>
                  <Text textStyle="h3" p="0.8rem" >
                    {nextMatch?.home.club_name}
                    {" "}
                    {nextMatch?.score}
                    {" "}
                    {nextMatch?.away.club_name}
                  </Text>
                  <StatsBox game={nextMatch} />
                </Box>
              ) : (
                <Heading as="h3" variant="h3" textAlign="center">Ce joueur n'as pas encore enregistré de match</Heading>
              )
            }
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}