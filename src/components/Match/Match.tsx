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

const Match = () => {
  return (
    <>
      <BrowserView>
        <h1>Historique</h1>
        <div className="card_main">
          <div className="card_container">
            <div className="card_left">
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
                          But(s) inscrits(s): <Text as="b">4</Text>
                          <br />
                        </Text>
                        <Text>
                          Passe(s) décisive(s): <Text as="b">2</Text>
                          <br />
                        </Text>
                        <Text>
                          Carton(s) jaune(s): <Text as="b">0</Text>
                          <br />
                        </Text>
                        <Text>
                          Carton rouge: <Text as="b">0</Text>
                          <br />
                        </Text>
                        <a href="/player/match/1">
                          <Button colorScheme="red" textAlign="center">
                            Modifier
                          </Button>
                        </a>
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
            </div>
            <div className="card_right">
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
