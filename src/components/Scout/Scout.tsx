import {
  Center,
  Divider,
  Card,
  Heading,
  Text,
  ButtonGroup,
  CardHeader,
  CardBody,
  CardFooter,
  SimpleGrid,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Button,
  Input,
  useDisclosure,
  Flex,
  Avatar,
  Box,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";

import { BrowserView, MobileView } from "react-device-detect";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { getScoutInfos } from "../store/reducers/scout";

import "./Scout.scss";

const Scout = () => {

  const { isOpen, onOpen, onClose } = useDisclosure();
  const id = localStorage.getItem("id");
  const dispatch = useAppDispatch();

  const lastName = useAppSelector((state) => state.scout.lastname );
  const firstName = useAppSelector((state) => state.scout.firstname);
  const email = useAppSelector((state) => state.scout.email);
  const club = useAppSelector((state) => state.scout.club);
  const city = useAppSelector((state) => state.scout.city);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getScoutInfos(id));
    };
    fetchData()
  }, [])

  return (
    <>
    <BrowserView>
      <div className="scout_main">
      <div className="sprofil_main">
        <div className="sprofil_container">
          <Flex>
            <Avatar
              size="2xl"
              name={lastName}
              src="https://bit.ly/sage-adebayo"
            />
            <Box ml="4">
              <Text fontWeight="bold" fontSize="2xl">
                {firstName} {lastName}
              </Text>
              <Text fontSize="xl">Recruteur</Text>
              <IconButton
                onClick={onOpen}
                colorScheme="teal"
                aria-label="Search database"
                icon={<EditIcon />}
              />
            </Box>
          </Flex>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Modifiez vos informations</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <FormControl>
                  <FormLabel>Prénom</FormLabel>
                  <Input defaultValue={firstName} />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Nom</FormLabel>
                  <Input defaultValue={lastName} />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Email</FormLabel>
                  <Input defaultValue={email} />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Photo</FormLabel>
                  <Input
                    size="md"
                    type="file"
                  />
                </FormControl>
              </ModalBody>

              <ModalFooter>
                <Button colorScheme="teal" mr={3}>
                  Modifier
                </Button>
                <Button onClick={onClose}>Annuler</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </div>
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
      <div className="sprofil_main">
        <div className="sprofil_container">
          <Flex>
            <Avatar
              size="2xl"
              name="Karl Marx"
              src="https://bit.ly/sage-adebayo"
            />
            <Box ml="4">
              <Text fontWeight="bold" fontSize="2xl">
                Karl Marx
              </Text>
              <Text fontSize="xl">Recruteur</Text>
              <IconButton
                onClick={onOpen}
                colorScheme="teal"
                aria-label="Search database"
                icon={<EditIcon />}
              />
            </Box>
          </Flex>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Modifiez vos informations</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <FormControl>
                  <FormLabel>Prénom</FormLabel>
                  <Input placeholder="Prénom" />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Nom</FormLabel>
                  <Input placeholder="Nom" />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Email</FormLabel>
                  <Input placeholder="Email" />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Photo</FormLabel>
                  <Input
                    size="md"
                    type="file"
                  />
                </FormControl>
              </ModalBody>

              <ModalFooter>
                <Button colorScheme="teal" mr={3}>
                  Modifier
                </Button>
                <Button onClick={onClose}>Annuler</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </div>
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
