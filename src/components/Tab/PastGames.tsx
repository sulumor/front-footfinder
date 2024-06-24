import {
  Card, CardHeader, Divider, TabPanel, Text,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { Match } from "@/@Types";
import { formatDate } from "@/utils/dateFunctions";
import { AddStatsBtn } from "../Button";
import { StatsBox } from "../Box";

export function PastGamesTab({ games }: { games: Match[] }) {
  return (
    <TabPanel>
      <Wrap spacing=" 1.5rem">
        {games.map((game: Match) => (
          <WrapItem key={game?.match_id} w="310px" h="300px">
            <Card align="center" w="full" h="full" justifyContent="space-between">
              <CardHeader h="90%" display="flex" flexDirection="column" justifyContent="space-between" >
                <Text textStyle="secondTitle" align="center" noOfLines={1}>
                  {formatDate(game.date)}
                </Text>
                <Divider />
                <Text textStyle="mainText" p="0.8rem" align="center">
                  {game?.home.club_name}
                  {" "}
                  {game?.score}
                  {" "}
                  {game?.away.club_name}
                </Text>
                <Divider />
                {game?.fitness === "absent" ? (
                  <Text align="center" textStyle="numberText">Absent</Text>
                ) : game?.score === "-" ? (
                  <Text align="center" textStyle="smallText">Pas encore de stats</Text>
                ) : (
                  <StatsBox game={game} />
                )}
              </CardHeader>
              <AddStatsBtn game={game} />
            </Card>
          </WrapItem>
        ))}
      </Wrap>
    </TabPanel>
  );
}

