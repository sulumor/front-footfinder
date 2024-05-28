import {
  
  Box,
  Heading,
  SimpleGrid,
} from "@chakra-ui/react";
import { PlayerView } from "@/@Types";
import { PlayerCard } from "@/components/Card/Player";

function SearchResults({ players } : { players:PlayerView[] | null }) {
  
  return !players ? (
    <></>
  ) : players!.length > 0 ? (
    <Box>
      <Heading as="h3" variant="h3">Résultat de la recherche</Heading>
        <SimpleGrid spacing={4} templateColumns="repeat(auto-fill, minmax(200px, 1fr))">
          {players?.map((player:PlayerView) => (
            <PlayerCard player={player}/>
          ))}
        </SimpleGrid>
    </Box>
  ) : (
    <Heading as="h3" variant="h3" textAlign="center">Navré nous n'avons pas trouvé de résultat à votre recherche</Heading>
  );
}

export default SearchResults;
