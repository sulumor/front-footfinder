import { Match } from "@/@Types";
import { formatDate } from "@/utils/functions";
import { Accordion, AccordionButton, AccordionItem, AccordionPanel, Box, Button, Card, CardBody, CardFooter, CardHeader, Heading, TabPanel, Text } from "@chakra-ui/react";
import { isMobile } from "react-device-detect";

import "./PastMatchesTab.scss";
import UpdateMatch from "../Button/UpdateMatch";
import { useAppSelector } from "../hooks/redux";

const PastMatchesTab = ({matches} : { matches: Match[]}) => {  
  const position: string = useAppSelector((state) => state.player.position);
  return (
    <TabPanel>
        <div className={isMobile ? "mobile_card_main" : "card_main"}>
          <div className={isMobile ? "mobile_card_container" : "card_container"}>
              {matches.map((match: Match) => {
                return (
                  <div key={match.match_id} className= {isMobile ? "mobile_card_container_cards" : "card_container_cards"} >
                    <Card align="center" size={"sm"}>
                      <CardHeader>
                        <Heading size="sm"> {formatDate(match.date)}</Heading>
                      </CardHeader>
                      <CardBody>
                        <Text>{match.home.club_name} {match.score} {match.away.club_name}</Text>
                        <Text color={match.fitness == "En forme" ? "green" : "red"}>{match.fitness}</Text>
                      </CardBody>
                      <CardFooter>
                        <Accordion allowMultiple>
                          <AccordionItem>
                            <h2>
                              <AccordionButton>
                                <Box as="span" flex="1" textAlign="center">
                                  <Button colorScheme="teal">Détails</Button>
                                </Box>
                              </AccordionButton>
                            </h2>
                            <AccordionPanel pb={4}>
                              <Text>
                                Minutes jouées: <Text as="b">{match.minutes_played}</Text>
                                <br />
                              </Text>
                             
                              <Text>
                                Carton(s) jaune(s): <Text as="b">{match.yellow_card}</Text>
                                <br />
                              </Text>
                              <Text>
                                Carton rouge: <Text as="b">{match.red_card}</Text>
                                <br />
                              </Text>
                              {position === "Gardien" ? 
                                <>
                                  <Text>
                                    But(s) encaissé(s): <Text as="b">{match.goals_conceded}</Text>
                                    <br />
                                  </Text>
                                  <Text>
                                    Arrêt(s): <Text as="b">{match.stops}</Text>
                                    <br />
                                  </Text>
                                </>
                              :
                                <>
                                  <Text>
                                  But(s) inscrits(s): <Text as="b">{match.goals_scored}</Text>
                                  <br />
                                  </Text>
                                  <Text>
                                    Passe(s) décisive(s): <Text as="b">{match.assists}</Text>
                                    <br />
                                  </Text>
                              </>
                              }
                              <UpdateMatch match={match}/>
                            </AccordionPanel>
                          </AccordionItem>
                        </Accordion>
                      </CardFooter>
                    </Card>
                  </div>
                )
              })}
          </div>
        </div>
        </TabPanel>
  );
}

export default PastMatchesTab;