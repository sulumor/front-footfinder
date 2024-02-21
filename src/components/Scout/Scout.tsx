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
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { getScoutInfos } from "../store/reducers/scout";

import "./Scout.scss";
import axios from "axios";


const Scout = () => {

  const [data, setData] = useState([])
  const { isOpen, onOpen, onClose } = useDisclosure();
  const id = localStorage.getItem("id");
  const dispatch = useAppDispatch();
  
  const lastName = useAppSelector((state) => state.scout.lastname);
  const firstName = useAppSelector((state) => state.scout.firstname);
  const club = useAppSelector((state) => state.scout.club);
  const city = useAppSelector((state) => state.scout.city);
  
  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getScoutInfos(id))
      await getScoutFollows()
    };
    fetchData();
  }, []);
  
  const [patchValues, setPatchValues] = useState({
    firstname: "",
    lastname: "",
    email: "",
    club: "",
    city: ""
  });

  const handleChangeField = (scout: "firstname" | "lastname" | "email" | "club" | "city") => (value: string) => {
    setPatchValues({ ...patchValues, [scout]: value });
  };

  const handleSubmit = () => {
    updateScoutInfos();
  }

  const updateScoutInfos = async () => {
      const response = await axios.patch(`http://localhost:3000/scout/${id}`, {...patchValues});
      console.log("requete update scout terminée");
      console.log(response.data);
      return response.data;
    }

  const getScoutFollows = async () => {
    const response = await axios.get(`http://localhost:3000/scout/${id}`);
    if (response.data.players === "Pas de joueur suivi") {
      return setData([]);
    }
    return setData(response.data.players)
  }

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
                  src="https://bit.ly/dan-abramov"
                />
                <Box ml="4">
                  <div className="scout_box_left">
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
                  </div>
                  <div className="scout_box_divider">
                  <Center height="100px">
                    <Divider orientation="vertical" />
                  </Center>
                  </div>
                  <div className="scout_box_right">
                    <Text fontSize="xl">Ville: {city}</Text>
                    <Text fontSize="xl">Club: {club}</Text>
                  </div>
                </Box>
              </Flex>
              <Modal isOpen={isOpen} onClose={onClose}>
                <form onSubmit={handleSubmit}>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Modifiez vos informations</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody pb={6}>
                    <FormControl>
                      <FormLabel>Prénom</FormLabel>
                      <Input value={patchValues.firstname} onChange={(e) => handleChangeField("firstname")(e.target.value)} />
                    </FormControl>

                    <FormControl mt={4}>
                      <FormLabel>Nom</FormLabel>
                      <Input value={patchValues.lastname} onChange={(e) => handleChangeField("lastname")(e.target.value)} />
                    </FormControl>

                    <FormControl mt={4}>
                      <FormLabel>Email</FormLabel>
                      <Input value={patchValues.email} onChange={(e) => handleChangeField("email")(e.target.value)} />
                    </FormControl>

                    <FormControl mt={4}>
                      <FormLabel>Ville</FormLabel>
                      <Input value={patchValues.city} onChange={(e) => handleChangeField("city")(e.target.value)} />
                    </FormControl>

                    <FormControl mt={4}>
                      <FormLabel>Club</FormLabel>
                      <Input value={patchValues.club} onChange={(e) => handleChangeField("club")(e.target.value)} />
                    </FormControl>

                    <FormControl mt={4}>
                      <FormLabel>Photo</FormLabel>
                      <Input size="md" type="file" />
                    </FormControl>
                  </ModalBody>

                  <ModalFooter>
                    <Button onClick={handleSubmit} colorScheme="teal" mr={3}>
                      Modifier
                    </Button>
                    <Button onClick={onClose}>Annuler</Button>
                  </ModalFooter>
                </ModalContent>
                </form>
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
                  {data?.map((player: any) => {
                    return (
                      <Card key={player.id}>
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
                            <Heading size="sm">{player.firstname} {player.lastname}</Heading>
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
                          Pied fort: <Text as="b">{player.strong_foot}</Text>
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
                        <Button variant="outline" colorScheme="red">
                          Retirer
                        </Button>
                      </ButtonGroup>
                    </CardFooter>
                  </Card>
                    )
                  })}
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
                      <Input size="md" type="file" />
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
