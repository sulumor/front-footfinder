import {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  Box,
  Heading,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Match as MatchType } from "@/@Types";
import { sortByAsc, sortByDesc } from "@/utils/functions";
import { NextGamesTab, PastGamesTab } from "@/components/Tab";
import { useAuth } from "@/context/Auth";
import { AddMatchButton } from "@/components/Button";

export function Match() {
  const { user, userGames, setHasToBeRefetch } = useAuth();
  const [nextGames, setNextGames] = useState<MatchType[]>([]);
  const [pastGames, setPastGames] = useState<MatchType[]>([]);


  useEffect(() => {
    const sortGames : () => void = () => {
      const next: MatchType[] = [];
      const last : MatchType[] = [];
      userGames?.forEach((match: MatchType) => {
        if (new Date(match.date) <= new Date()) {
          last.push(match);
        } else {
          next.push(match);
        }
      });
      setNextGames(sortByAsc(next));
      setPastGames(sortByDesc(last));
    };
    sortGames();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userGames]);
  
  useEffect(() => {
    setHasToBeRefetch(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <Box h="100%" p={10}>
      <Heading as="h2" variant="h2">Vos matchs et leurs statistiques</Heading>
      <Box w={{base:"full", md:"12vw"}} position="relative" left={{base: 0, md: "80vw"}}>
        <AddMatchButton/>
      </Box>
        <Tabs variant="soft-rounded" colorScheme="red">
          <TabList>
              <Tab>A venir</Tab>
              <Tab>Historique</Tab>
          </TabList>
          <TabPanels>
            <NextGamesTab games={nextGames}/>
            <PastGamesTab games={pastGames} />
          </TabPanels>
        </Tabs>
    </Box>
  );
}