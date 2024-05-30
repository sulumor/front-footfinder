import { PlayerView } from "@/@Types";
import { useAuth } from "@/context/Auth";
import { plurials } from "@/utils/functions";
import { Box, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import { FollowerCard } from "../Card";
import { Link } from "react-router-dom";

export function PlayersFollowersListBox():JSX.Element {
  const { user } = useAuth();

  const players: PlayerView[] | string = user?.players;
  
  return typeof players === "string" ? (
    <>
      <Heading as ="h3" variant="h3">Pas de joueur suivi</Heading>
      <Text textStyle="mainText">Allez dans la section <Link to="/scout/search">Recherche</Link> pour trouver les joueurs à suivre</Text>
    </>
  ) : (
    <Box h="100%" p={5}>
      <Heading as="h3" variant="h3">{players?.length} joueur{plurials(players)} suivi{plurials(players)}</Heading>
      <SimpleGrid spacing={4} templateColumns="repeat(auto-fill, minmax(200px, 1fr))">
        {players?.map((player:PlayerView) => (
          <FollowerCard player={player}/>
        ))}
      </SimpleGrid>
    
    </Box>
  );
}