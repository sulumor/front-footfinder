import { useEffect, useState } from "react";
import { Match } from "@/@Types";
import { sortByAsc } from "@/utils/functions";
import { formatDate, formatTime, stringToTimestamp, today } from "@/utils/dateFunctions";
import { useAuth } from "@/context/Auth";
import { Box, Flex, Text } from "@chakra-ui/react";
import { AddMatchButton } from "../Button";

export function NextMatchBox() {
  const { user, userGames } = useAuth();
  const [nextMatch, setNextMatch] = useState<Match>();

  useEffect(() => {
    const fetchData: () => void = () => {
      const todayGetTime: number = today.getTime() / 1000;
      let oneMatch: Match[] = [];
      if (userGames) oneMatch = sortByAsc(userGames).filter(((match: Match) => {
        const schedule: number = new Date(match.date).getTime() / 1000 + stringToTimestamp(match.time);
        return schedule > todayGetTime
      }));
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
          {formatDate(nextMatch?.date)} à {formatTime(nextMatch.time)}
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
    </Box>
  ) : (
    <Flex flexDirection="column" gap="1rem">
      <Text textStyle="h3">Pas de prochain match enregistré. </Text>
      <Text textStyle="h6" textAlign="center">Pour que les recruteurs puissent venir vous voir</Text>
      <AddMatchButton />
    </Flex>
  );
}
