import { Player } from "@/@Types";
import { Text, Box, Card, CardHeader, Flex, Avatar, Heading, CardBody, CardFooter, ButtonGroup, Button } from "@chakra-ui/react";
import { isMobile } from "react-device-detect";

const SearchResults = ({players} : { players:Player[]}) => {
    
    return (
        <>
        <h3>Résultat de la recherche</h3>
            <div className="search_player_results">
              <div className={isMobile ? "mobile_search_player_results_container" : "search_player_results_container"}>
                {players?.map((player: Player) => {
                  return (
                    <div key={player.id} className={isMobile ? "mobile_search_player_results_card" : "search_player_results_card"}>
                      <Card>
                        <CardHeader>
                          <Flex>
                            <Flex
                              flex="1"
                              gap="4"
                              alignItems="center"
                              flexWrap="wrap"
                            >
                              <Avatar
                                name={player.lastname}
                                src="https://bit.ly/sage-adebayo"
                              />
                              <Box>
                                <Heading size="sm">
                                  {player.firstname} {player.lastname}
                                </Heading>
                                <Text>Marseille</Text>
                              </Box>
                            </Flex>
                          </Flex>
                        </CardHeader>
                        <CardBody>
                          <div className="card_body_text">
                            <Text>
                              Poste: <Text as="b">{player.position}</Text>
                              <br />
                            </Text>
                            <Text>
                              Pied fort:{" "}
                              <Text as="b">{player.strong_foot}</Text>
                              <br />
                            </Text>
                            <Text>
                              Taille: <Text as="b">{player.height} cm</Text>
                              <br />
                            </Text>
                            <Text>
                              Poids: <Text as="b">{player.weight} kg</Text>
                              <br />
                            </Text>
                          </div>
                        </CardBody>
                        <CardFooter>
                          <ButtonGroup spacing="2">
                            <a href={`/player/${player.id}`}>
                              <Button variant="solid" colorScheme="teal">
                                Profil
                              </Button>
                            </a>
                          </ButtonGroup>
                        </CardFooter>
                      </Card>
                    </div>
                  );
                })}
              </div>
            </div>
            </>
    )
}

export default SearchResults;