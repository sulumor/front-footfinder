import SearchResults from "@/components/Form/SearchResults/SearchResults";
import { useState } from "react";
import { PlayerView } from "@/@Types";
import { SearchForm } from "@/components/Form/Search";
import { Box, Heading } from "@chakra-ui/react";

export function Search(): JSX.Element {
  const [players, setPlayers] = useState<PlayerView[] | null>(null);

  return (
    <Box w="full" p={10}>
        <Box w="50%" m="0 auto" mb={10}>
          <Heading as="h2" variant="h2">Recherche d'un joueur</Heading>
          <SearchForm setPlayers={setPlayers}/>  
        </Box>
        <SearchResults players={players} />
    </Box>
  );
}