import { Match } from "@/@Types";
import { formatDate } from "@/utils/functions";
import { Card, CardBody, CardFooter, CardHeader, Heading, TabPanel, Text } from "@chakra-ui/react";

import "./FutureMatchesTab.scss";
import { isMobile } from "react-device-detect";

const FutureMatchesTab = ({matches} : { matches: Match[]}) => {
  return (
    <TabPanel>
      <div className={isMobile ? "mobile_card_main" : "card_main"}>
        <div className={isMobile ? "mobile_card_container" : "card_container"}>
            {matches.map((match: Match) => {
              return (
                <div key={match.match_id} className={isMobile ? "mobile_card_container_cards" : "card_container_cards"}>
                  <Card align="center" size={"sm"}>
                    <CardHeader>
                      <Heading size="sm"> {formatDate(match.date)}</Heading>
                    </CardHeader>
                    <CardBody>
                      <Text>{match.home.club_name} {match.score} {match.away.club_name}</Text>
                      <Text color={match.fitness == "En forme" ? "green" : "red"}>{match.fitness}</Text>
                    </CardBody>
                    <CardFooter/>
                  </Card>
                </div>
              )
            })}
        </div>
      </div>
    </TabPanel>
  );
}

export default FutureMatchesTab;