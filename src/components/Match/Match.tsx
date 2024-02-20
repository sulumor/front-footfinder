import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Button,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Box,
} from "@chakra-ui/react";

import { BrowserView, MobileView } from "react-device-detect";

import "./Match.scss";
import { useEffect, useState } from "react";
import axios from "axios";

const Match = () => {

  const [data, setData] = useState([]);
  const id = localStorage.getItem("id");
  
  const getAllMatchs = async () => {
    const response = await axios.get(`http://localhost:3000/player/${id}/match/stats`);
    console.log("requete getallmatchs terminée");
    return setData(response.data);
  }

  const numAscending = [...data].sort((a: number, b: number) => a.match_id - b.match_id);

 useEffect(() => {
    const fetchData = async () => {
      await getAllMatchs();
    };
    fetchData();
  }, []);

  console.log(data);

  return (
    <>
      <BrowserView>
        <h1>Historique</h1>
        <div className="card_main">
          <div className="card_container">
              {numAscending.map((element: any) => {
                return (
                  <div key={element.match_id} className="card_container_cards">
                  <Card align="center" size={"sm"}>
                <CardHeader>
                  <Heading size="sm"> {element.date}</Heading>
                </CardHeader>
                <CardBody>
                  <Text>{element.home.club_name} {element.score} {element.away.club_name}</Text>
                  <Text color={element.fitness == "En forme" ? "green" : "red"}>{element.fitness}</Text>
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
                          Minutes jouées: <Text as="b">{element.minutes_played}</Text>
                          <br />
                        </Text>
                        <Text>
                          But(s) inscrits(s): <Text as="b">{element.goals_scored}</Text>
                          <br />
                        </Text>
                        <Text>
                          Passe(s) décisive(s): <Text as="b">{element.assists}</Text>
                          <br />
                        </Text>
                        <Text>
                          Carton(s) jaune(s): <Text as="b">{element.yellow_card}</Text>
                          <br />
                        </Text>
                        <Text>
                          Carton rouge: <Text as="b">{element.red_card}</Text>
                          <br />
                        </Text>
                        <a href={`/player/match/${element.match_id}`}>
                          <Button colorScheme="red" textAlign="center">
                            Modifier
                          </Button>
                          </a>
                      </AccordionPanel>
                    </AccordionItem>
                  </Accordion>
                </CardFooter>
              </Card>
              </div>
                )
              })}
          </div>
          <div className="match_button">
            <Button colorScheme="teal">Voir plus de matchs</Button>
          </div>
        </div>
      </BrowserView>
      <MobileView>
        <h1>Historique</h1>
        <div className="card_main">
          <div className="mobile_card_container">
            <Card align="center" size={"sm"}>
              <CardHeader>
                <Heading size="sm"> 24 Janvier 2024</Heading>
              </CardHeader>
              <CardBody>
                <Text>RC Lens 0 - 5 Paris Saint Germain</Text>
                <Text color={"green"}>En forme</Text>
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
                        Minutes jouées: <Text as="b">90</Text>
                        <br />
                      </Text>
                      <Text>
                        Buts marqués: <Text as="b">4</Text>
                        <br />
                      </Text>
                      <Text>
                        Passes décisives: <Text as="b">2</Text>
                        <br />
                      </Text>
                      <Button colorScheme="red" textAlign="center">
                        Modifier
                      </Button>
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
              </CardFooter>
            </Card>
            <Card align="center" size={"sm"}>
              <CardHeader>
                <Heading size="sm"> 03 Février 2024</Heading>
              </CardHeader>
              <CardBody>
                <Text>RC Lens 0 - 1 Olympique Lyonnais</Text>
                <Text color={"green"}>En forme</Text>
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
                        Minutes jouées: <Text as="b">60</Text>
                        <br />
                      </Text>
                      <Text>
                        Buts marqués: <Text as="b">3</Text>
                        <br />
                      </Text>
                      <Text>
                        Passes décisives: <Text as="b">0</Text>
                        <br />
                      </Text>
                      <Button colorScheme="red" textAlign="center">
                        Modifier
                      </Button>
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
              </CardFooter>
            </Card>
            <Card align="center" size={"sm"}>
              <CardHeader>
                <Heading size="sm"> 12 Février 2024</Heading>
              </CardHeader>
              <CardBody>
                <Text>RC Lens 0 - 7 Lille OSC</Text>
                <Text color={"red"}>Absent</Text>
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
                        Minutes jouées: <Text as="b">90</Text>
                        <br />
                      </Text>
                      <Text>
                        Buts marqués: <Text as="b">0</Text>
                        <br />
                      </Text>
                      <Text>
                        Passes décisives: <Text as="b">0</Text>
                        <br />
                      </Text>
                      <Button colorScheme="red" textAlign="center">
                        Modifier
                      </Button>
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
              </CardFooter>
            </Card>
            <Card align="center" size={"sm"}>
              <CardHeader>
                <Heading size="sm"> 22 Février 2024</Heading>
              </CardHeader>
              <CardBody>
                <Text>RC Lens 1 - 1 AS Monaco</Text>
                <Text color={"green"}>En forme</Text>
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
                        Minutes jouées: <Text as="b">80</Text>
                        <br />
                      </Text>
                      <Text>
                        Buts marqués: <Text as="b">1</Text>
                        <br />
                      </Text>
                      <Text>
                        Passes décisives: <Text as="b">1</Text>
                        <br />
                      </Text>
                      <Button colorScheme="red" textAlign="center">
                        Modifier
                      </Button>
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
              </CardFooter>
            </Card>
          </div>
          <div className="mobile_match_button">
            <Button colorScheme="teal">Voir plus de matchs</Button>
          </div>
        </div>
      </MobileView>
    </>
  );
};

export default Match;
