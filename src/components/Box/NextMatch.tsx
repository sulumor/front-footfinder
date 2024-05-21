import { useEffect, useState } from "react";
import { Match } from "@/@Types";
import crud from "@/utils/crud";
import { sortByAsc } from "@/utils/functions";
import { useAuth } from "@/context/Auth";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { AddMatchButton } from "../Button";

export function NextMatchBox() {
  const { user } = useAuth();
  const [match, setMatch] = useState<Match>();

  const getNextMatch : () => Promise<void> = async () => {
    const responses = await crud.get(["player", "match", "stats"], [user?.id]);
    const today : Date = new Date();
    const [nextMatch] : Match[] = sortByAsc(responses.data).filter(((match: Match) => new Date(match.date) >= today));
    return setMatch(nextMatch);
  };

  const fetchData = async () :Promise<void> => {
    await getNextMatch();
  };

  useEffect(() => {
    fetchData();
  }, [user]);

  return match ? (
    <Box>
        <Text textStyle="h3" p="0.8rem">
          {match?.home.club_name}
          {" "}
          -
          {" "}
          {match?.away.club_name}
        </Text>
      <Box padding="1rem">
        <Text textStyle="h4" textAlign="center">
          {new Date(match?.date as Date).toLocaleDateString("fr-FR", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </Text>
        <Text mt="1rem" textStyle="text">{match?.home.stadium_name}</Text>
        <Text textStyle="textSmall">
          {match?.home.adress}
          , {" "}
          {match?.home.zip_code}
          {" "}
          {match?.home.city}
        </Text>
      </Box>
      <Button>Edit - A faire</Button>
    </Box>
  ) : (
    <Flex flexDirection="column" gap="1rem">
      <Text textStyle="h3">Pas de futur match enregistré. </Text>
      <AddMatchButton/>
    </Flex>
  )
  
  ;
}

