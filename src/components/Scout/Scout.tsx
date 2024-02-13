import {
  Center,
  Divider,
  Card,
  Heading,
  Text,
  ButtonGroup,
  Button,
  CardHeader,
  CardBody,
  CardFooter,
  SimpleGrid,
  Avatar,
  Box,
  Flex,
} from "@chakra-ui/react";

import { BrowserView, MobileView } from "react-device-detect";

import "./Scout.scss";

const Scout = () => {
  return (
    <>
    <BrowserView>
      <div className="scout_main">
        <div className="scout_name">
          <h2>Bonjour, Jean Dupont</h2>
        </div>
        <Center>
          <Divider width="50%" />
        </Center>
        <div className="scout_container">
          <h3>Joueurs suivis</h3>
          <div className="scout_follow">
            <div className="scout_follow_card">
              <SimpleGrid
                spacing={4}
                templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
              >
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
                          name="Roland Ronaldo"
                          src="https://bit.ly/sage-adebayo"
                        />
                        <Box>
                          <Heading size="sm">Roland Ronaldo</Heading>
                          <Text>RC Lens</Text>
                        </Box>
                      </Flex>
                    </Flex>
                  </CardHeader>
                  <CardBody>
                    <div className="card_body_text">
                      <Text>
                        Poste: <Text as="b">Attaquant</Text>
                        <br />
                      </Text>
                      <Text>
                        Pied fort: <Text as="b">Droit</Text>
                        <br />
                      </Text>
                      <Text>
                        Taille: <Text as="b">198cm</Text>
                        <br />
                      </Text>
                      <Text>
                        Poids: <Text as="b">90kg</Text>
                        <br />
                      </Text>
                    </div>
                  </CardBody>
                  <CardFooter>
                    <ButtonGroup spacing="2">
                      <Button variant="solid" colorScheme="teal">
                        Profil
                      </Button>
                      <Button variant="outline" colorScheme="red">
                        Retirer
                      </Button>
                    </ButtonGroup>
                  </CardFooter>
                </Card>

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
                          name="Michel Blanc"
                          src="https://bit.ly/tioluwani-kolawole"
                        />

                        <Box>
                          <Heading size="sm">Michel Blanc</Heading>
                          <Text>RC Lens</Text>
                        </Box>
                      </Flex>
                    </Flex>
                  </CardHeader>
                  <CardBody>
                    <div className="card_body_text">
                      <Text>
                        Poste: <Text as="b">Attaquant</Text>
                        <br />
                      </Text>
                      <Text>
                        Pied fort: <Text as="b">Droit</Text>
                        <br />
                      </Text>
                      <Text>
                        Taille: <Text as="b">198cm</Text>
                        <br />
                      </Text>
                      <Text>
                        Poids: <Text as="b">90kg</Text>
                        <br />
                      </Text>
                    </div>
                  </CardBody>
                  <CardFooter>
                    <ButtonGroup spacing="2">
                      <Button variant="solid" colorScheme="teal">
                        Profil
                      </Button>
                      <Button variant="outline" colorScheme="red">
                        Retirer
                      </Button>
                    </ButtonGroup>
                  </CardFooter>
                </Card>

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
                          name="Roland Ronaldo"
                          src="https://bit.ly/kent-c-dodds"
                        />

                        <Box>
                          <Heading size="sm">Alex Red</Heading>
                          <Text>Paris SG</Text>
                        </Box>
                      </Flex>
                    </Flex>
                  </CardHeader>
                  <CardBody>
                    <div className="card_body_text">
                      <Text>
                        Poste: <Text as="b">Attaquant</Text>
                        <br />
                      </Text>
                      <Text>
                        Pied fort: <Text as="b">Droit</Text>
                        <br />
                      </Text>
                      <Text>
                        Taille: <Text as="b">198cm</Text>
                        <br />
                      </Text>
                      <Text>
                        Poids: <Text as="b">90kg</Text>
                        <br />
                      </Text>
                    </div>
                  </CardBody>
                  <CardFooter>
                    <ButtonGroup spacing="2">
                      <Button variant="solid" colorScheme="teal">
                        Profil
                      </Button>
                      <Button variant="outline" colorScheme="red">
                        Retirer
                      </Button>
                    </ButtonGroup>
                  </CardFooter>
                </Card>
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
                          name="Roland Ronaldo"
                          src="https://bit.ly/kent-c-dodds"
                        />

                        <Box>
                          <Heading size="sm">Alex Red</Heading>
                          <Text>Paris SG</Text>
                        </Box>
                      </Flex>
                    </Flex>
                  </CardHeader>
                  <CardBody>
                    <div className="card_body_text">
                      <Text>
                        Poste: <Text as="b">Attaquant</Text>
                        <br />
                      </Text>
                      <Text>
                        Pied fort: <Text as="b">Droit</Text>
                        <br />
                      </Text>
                      <Text>
                        Taille: <Text as="b">198cm</Text>
                        <br />
                      </Text>
                      <Text>
                        Poids: <Text as="b">90kg</Text>
                        <br />
                      </Text>
                    </div>
                  </CardBody>
                  <CardFooter>
                    <ButtonGroup spacing="2">
                      <Button variant="solid" colorScheme="teal">
                        Profil
                      </Button>
                      <Button variant="outline" colorScheme="red">
                        Retirer
                      </Button>
                    </ButtonGroup>
                  </CardFooter>
                </Card>
              </SimpleGrid>
            </div>
          </div>
          <div className="scout_main_button">
            <Button variant="solid" colorScheme="teal">
              Voir tous
            </Button>
          </div>
        </div>
      </div>
      </BrowserView>



      <MobileView>
      <div className="scout_main">
        <div className="scout_name">
          <h2>Bonjour, Jean Dupont</h2>
        </div>
        <Center>
          <Divider width="50%" />
        </Center>
        <div className="mobile_scout_container">
          <h3>Joueurs suivis</h3>
          <div className="scout_follow">
            <div className="scout_follow_card">
              <SimpleGrid
                spacing={4}
                templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
              >
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
                          name="Roland Ronaldo"
                          src="https://bit.ly/sage-adebayo"
                        />
                        <Box>
                          <Heading size="sm">Roland Ronaldo</Heading>
                          <Text>RC Lens</Text>
                        </Box>
                      </Flex>
                    </Flex>
                  </CardHeader>
                  <CardBody>
                    <div className="card_body_text">
                      <Text>
                        Poste: <Text as="b">Attaquant</Text>
                        <br />
                      </Text>
                      <Text>
                        Pied fort: <Text as="b">Droit</Text>
                        <br />
                      </Text>
                      <Text>
                        Taille: <Text as="b">198cm</Text>
                        <br />
                      </Text>
                      <Text>
                        Poids: <Text as="b">90kg</Text>
                        <br />
                      </Text>
                    </div>
                  </CardBody>
                  <CardFooter>
                    <ButtonGroup spacing="2">
                      <Button variant="solid" colorScheme="teal">
                        Profil
                      </Button>
                      <Button variant="outline" colorScheme="red">
                        Retirer
                      </Button>
                    </ButtonGroup>
                  </CardFooter>
                </Card>

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
                          name="Michel Blanc"
                          src="https://bit.ly/tioluwani-kolawole"
                        />

                        <Box>
                          <Heading size="sm">Michel Blanc</Heading>
                          <Text>RC Lens</Text>
                        </Box>
                      </Flex>
                    </Flex>
                  </CardHeader>
                  <CardBody>
                    <div className="card_body_text">
                      <Text>
                        Poste: <Text as="b">Attaquant</Text>
                        <br />
                      </Text>
                      <Text>
                        Pied fort: <Text as="b">Droit</Text>
                        <br />
                      </Text>
                      <Text>
                        Taille: <Text as="b">198cm</Text>
                        <br />
                      </Text>
                      <Text>
                        Poids: <Text as="b">90kg</Text>
                        <br />
                      </Text>
                    </div>
                  </CardBody>
                  <CardFooter>
                    <ButtonGroup spacing="2">
                      <Button variant="solid" colorScheme="teal">
                        Profil
                      </Button>
                      <Button variant="outline" colorScheme="red">
                        Retirer
                      </Button>
                    </ButtonGroup>
                  </CardFooter>
                </Card>

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
                          name="Roland Ronaldo"
                          src="https://bit.ly/kent-c-dodds"
                        />

                        <Box>
                          <Heading size="sm">Alex Red</Heading>
                          <Text>Paris SG</Text>
                        </Box>
                      </Flex>
                    </Flex>
                  </CardHeader>
                  <CardBody>
                    <div className="card_body_text">
                      <Text>
                        Poste: <Text as="b">Attaquant</Text>
                        <br />
                      </Text>
                      <Text>
                        Pied fort: <Text as="b">Droit</Text>
                        <br />
                      </Text>
                      <Text>
                        Taille: <Text as="b">198cm</Text>
                        <br />
                      </Text>
                      <Text>
                        Poids: <Text as="b">90kg</Text>
                        <br />
                      </Text>
                    </div>
                  </CardBody>
                  <CardFooter>
                    <ButtonGroup spacing="2">
                      <Button variant="solid" colorScheme="teal">
                        Profil
                      </Button>
                      <Button variant="outline" colorScheme="red">
                        Retirer
                      </Button>
                    </ButtonGroup>
                  </CardFooter>
                </Card>
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
                          name="Roland Ronaldo"
                          src="https://bit.ly/kent-c-dodds"
                        />

                        <Box>
                          <Heading size="sm">Alex Red</Heading>
                          <Text>Paris SG</Text>
                        </Box>
                      </Flex>
                    </Flex>
                  </CardHeader>
                  <CardBody>
                    <div className="card_body_text">
                      <Text>
                        Poste: <Text as="b">Attaquant</Text>
                        <br />
                      </Text>
                      <Text>
                        Pied fort: <Text as="b">Droit</Text>
                        <br />
                      </Text>
                      <Text>
                        Taille: <Text as="b">198cm</Text>
                        <br />
                      </Text>
                      <Text>
                        Poids: <Text as="b">90kg</Text>
                        <br />
                      </Text>
                    </div>
                  </CardBody>
                  <CardFooter>
                    <ButtonGroup spacing="2">
                      <Button variant="solid" colorScheme="teal">
                        Profil
                      </Button>
                      <Button variant="outline" colorScheme="red">
                        Retirer
                      </Button>
                    </ButtonGroup>
                  </CardFooter>
                </Card>
              </SimpleGrid>
            </div>
          </div>
          <div className="scout_main_button">
            <Button variant="solid" colorScheme="teal">
              Voir tous
            </Button>
          </div>
        </div>
      </div>
      </MobileView>
    </>
  );
};

export default Scout;
