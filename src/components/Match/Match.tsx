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
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel
} from "@chakra-ui/react";

import { BrowserView, MobileView } from "react-device-detect";

import "./Match.scss";
import { useEffect, useState } from "react";
import crud from "@/utils/crud";

const Match = () => {

  const [data, setData] = useState([]);
  const pastMatches: any = [];
  const futureMatches: any = [];
  const id = localStorage.getItem("id");
  const today = new Date();
  
  const getAllMatchs = async () => {
    const response = await crud.get(['player', 'match', 'stats'], [Number.parseInt(id!, 10)]);
    return setData(response.data);
  };
  
  data.forEach((match: any) => {
    const matchDate = new Date(match.date)
    if (matchDate < today) {
      pastMatches.push(match);
    } else {
      futureMatches.push(match);
    }
  });

 useEffect(() => {
    const fetchData = async () => {
      await getAllMatchs();
    };
    fetchData();
  }, []);

  return (
    <>
      <BrowserView>
      <div className="matches_main">
      <Tabs variant='soft-rounded' colorScheme='green'>
  <TabList>
    <div className="tab_panels_title">
    <Tab>Historique</Tab>
    <Tab>A venir</Tab>
    </div>
  </TabList>
  <TabPanels>
    <TabPanel>
        <div className="card_main">
          <div className="card_container">
              {pastMatches.map((element: any) => {
                return (
                  <div key={element.match_id} className="card_container_cards">
                  <Card align="center" size={"sm"}>
                <CardHeader>
                  <Heading size="sm"> {new Date(element.date as Date).toLocaleDateString('fr-FR', {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'})}</Heading>
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
        </div>
        </TabPanel>
        <TabPanel>
        <div className="card_main">
          <div className="card_container">
              {futureMatches.map((match: any) => {
                return (
                  <div key={match.match_id} className="card_container_cards">
                  <Card align="center" size={"sm"}>
                <CardHeader>
                  <Heading size="sm"> {new Date(match.date as Date).toLocaleDateString('fr-FR', {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'})}</Heading>
                </CardHeader>
                <CardBody>
                  <Text>{match.home.club_name} {match.score} {match.away.club_name}</Text>
                  <Text color={match.fitness == "En forme" ? "green" : "red"}>{match.fitness}</Text>
                </CardBody>
                <CardFooter>
                  
                </CardFooter>
              </Card>
              </div>
                )
              })}
          </div>
        </div>
        </TabPanel>
        </TabPanels>
        </Tabs>
        </div>
      </BrowserView>
      <MobileView>
        <div className="card_main">
          <div className="mobile_card_container">
          <Tabs variant='soft-rounded' colorScheme='green'>
  <TabList>
    <div className="mobile_tab_panels_title">
    <Tab>Historique</Tab>
    <Tab>A venir</Tab>
    </div>
  </TabList>
  <TabPanels>
    <TabPanel>
        <div className="mobile_card_main">
          <div className="mobile_card_container">
              {pastMatches.map((element: any) => {
                return (
                  <div key={element.match_id} className="mobile_card_container_cards">
                  <Card align="center" size={"sm"}>
                <CardHeader>
                  <Heading size="sm"> {new Date(element.date as Date).toLocaleDateString('fr-FR', {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'})}</Heading>
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
        </div>
        </TabPanel>
        <TabPanel>
        <div className="card_main">
          <div className="mobile_card_container">
              {futureMatches.map((match: any) => {
                return (
                  <div key={match.match_id} className="mobile_card_container_cards">
                  <Card align="center" size={"sm"}>
                <CardHeader>
                  <Heading size="sm"> {new Date(match.date as Date).toLocaleDateString('fr-FR', {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'})}</Heading>
                </CardHeader>
                <CardBody>
                  <Text>{match.home.club_name} {match.score} {match.away.club_name}</Text>
                  <Text color={match.fitness == "En forme" ? "green" : "red"}>{match.fitness}</Text>
                </CardBody>
                <CardFooter>
                  
                </CardFooter>
              </Card>
              </div>
                )
              })}
          </div>
        </div>
        </TabPanel>
        </TabPanels>
        </Tabs>
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
