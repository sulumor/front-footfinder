import {
  Button,
  Tabs,
  TabList,
  Tab,
  TabPanels,
} from "@chakra-ui/react";

import { isMobile } from "react-device-detect";

import "./Match.scss";
import { useEffect, useState } from "react";
import crud from "@/utils/crud";
import { Match as MatchType } from "@/@Types";
import { sortByAsc, sortByDesc } from "@/utils/functions";
import PastMatchesTab from "../../components/Match/PastMatchesTab";
import FutureMatchesTab from "../../components/Match/FutureMatchesTab";
import { useAppSelector } from "@/hooks/redux";

function Match() {
  const [matches, setMatches] = useState<MatchType[]>([]);
  let pastMatches: MatchType[] = [];
  let futureMatches: MatchType[] = [];
  const count : number = useAppSelector((state) => state.player.count);
  const id : string | null = localStorage.getItem("id");

  const getAllMatchs = async () => {
    const response = await crud.get(["player", "match", "stats"], [Number.parseInt(id!, 10)]);
    return setMatches(response.data);
  };

  matches.forEach((match: MatchType) => {
    if (new Date(match.date) < new Date()) {
      pastMatches.push(match);
    } else {
      futureMatches.push(match);
    }
  });

  pastMatches = sortByDesc(pastMatches);
  futureMatches = sortByAsc(futureMatches);
  useEffect(() => {
    const fetchData = async () => {
      await getAllMatchs();
    };
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  return (
    <>
      <div className={isMobile ? "mobile_card_container": "matches_main"}>
        <Tabs variant="soft-rounded" colorScheme="green">
          <TabList>
            <div className={isMobile ? "mobile_tab_panels_title" : "tab_panels_title"}>
              <Tab>Historique</Tab>
              <Tab>A venir</Tab>
            </div>
          </TabList>
          <TabPanels>
            <PastMatchesTab matches={pastMatches} />
            <FutureMatchesTab matches={futureMatches} />
          </TabPanels>
        </Tabs>
      </div>
      {isMobile
        ? (
          <div className="mobile_match_button">
            <Button colorScheme="teal">Voir plus de matchs</Button>
          </div>
        )
        : ""}
    </>
  );
}

export default Match;
