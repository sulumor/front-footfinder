import { useEffect, useState } from "react";
import { Match } from "@/@Types";
import { sortByAsc } from "@/utils/functions";
import { useAuth } from "@/context/Auth";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { AddMatchButton } from "../Button";

export function NextMatchBox() {
  const { user, userGames } = useAuth();
  const [nextMatch, setNextMatch] = useState<Match>();
  
  useEffect(() => {
    const fetchData : () => void = () => {
      const today : Date = new Date();
      let oneMatch : Match[] = []; 
      if (userGames) oneMatch = sortByAsc(userGames).filter(((match: Match) => new Date(match.date) > today));    
      return setNextMatch(oneMatch[0]);
    };
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return nextMatch ? (
    <Box>
        <Text textStyle="h3" p="0.8rem">
          {nextMatch?.home.club_name}
          {" "}
          -
          {" "}
          {nextMatch?.away.club_name}
        </Text>
      <Box padding="1rem">
        <Text textStyle="h4" textAlign="center">
          {new Date(nextMatch?.date as Date).toLocaleDateString("fr-FR", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </Text>
        <Text mt="1rem" textStyle="text">{nextMatch?.home.stadium_name}</Text>
        <Text textStyle="textSmall">
          {nextMatch?.home.adress}
          , {" "}
          {nextMatch?.home.zip_code}
          {" "}
          {nextMatch?.home.city}
        </Text>
      </Box>
      <Button>Edit - A faire</Button>
    </Box>
  ) : (
    <Flex flexDirection="column" gap="1rem">
      <Text textStyle="h3">Pas de prochain match enregistré. </Text>
      <Text textStyle="h6" textAlign="center">Pour que les recruteurs puissent venir vous voir</Text>
      <AddMatchButton/>
    </Flex>
  );
}
