import { PlayerView } from "@/@Types";
import { useAuth } from "@/context/Auth";
import { plurials } from "@/utils/functions";
import { Box, Heading, SimpleGrid } from "@chakra-ui/react";
import { PlayerCard } from "../Card/Player";

export function PlayersFollowersListBox():JSX.Element {
  const { user } = useAuth();

  const players: PlayerView[] = user?.players;
  
  return (
    <Box h="100%" p={5}>
      <Heading as="h3" variant="h3">{players?.length} joueur{plurials(players)} suivi{plurials(players)}</Heading>
      <SimpleGrid spacing={4} templateColumns="repeat(auto-fill, minmax(200px, 1fr))">
        {players?.map((player:PlayerView) => (
          <PlayerCard player={player}/>
        ))}
      </SimpleGrid>
    
    </Box>
  );
}