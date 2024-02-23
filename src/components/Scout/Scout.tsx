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
import crud from "@/utils/crud";


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
      const res = await dispatch(getScoutInfos(id))
      await getScoutFollows()
      setPatchValues({...patchValues, firstname: res.payload.firstname});
      patchValues.firstname = res.payload.firstname;
      patchValues.lastname= res.payload.lastname;
      patchValues.email= res.payload.email;
      patchValues.city = res.payload.city;
      patchValues.club = res.payload.club;
    };
    fetchData();
  });
  
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
    const response = await crud.update(['scout'], [Number.parseInt(id!, 10)], {...patchValues});
      console.log("requete update scout terminée");
      console.log(response.data);
      return response.data;
    }

  const getScoutFollows = async () => {
    const response = await crud.get(['scout'], [Number.parseInt(id!, 10)]);
    if (response.data.players === "Pas de joueur suivi") {
      return setData([]);
    }
    return setData(response.data.players);
  }

  const deleteScoutFollow = async (playerId: any) => {
    const response = await crud.delete(['scout', 'player'], [Number.parseInt(id!, 10), Number.parseInt(playerId!, 10)]);
    console.log("requete delete follow terminée");
    console.log(response.data)
    return setData(response.data.players);
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
                  <div className="scout_box_right">
                    <Text fontSize="xl">Ville: {city}</Text>
                    <Text fontSize="xl">Club: {club}</Text>
                  </div>
                    <IconButton
                      onClick={onOpen}
                      colorScheme="teal"
                      aria-label="Search database"
                      icon={<EditIcon />}
                    />
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
                        <Button variant="outline" colorScheme="red" onClick={() => deleteScoutFollow(player.id)}>
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
                  name={lastName}
                  src="https://bit.ly/dan-abramov"
                />
                <Box ml="4">
                <div className="scout_box_left">
                    <Text fontWeight="bold" fontSize="2xl">
                      {firstName} {lastName}
                    </Text>
                    <Text fontSize="xl">Recruteur</Text>
                  <div className="scout_box_right">
                    <Text fontSize="xl">Ville: {city}</Text>
                    <Text fontSize="xl">Club: {club}</Text>
                  </div>
                    <IconButton
                      onClick={onOpen}
                      colorScheme="teal"
                      aria-label="Search database"
                      icon={<EditIcon />}
                    />
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
          <div className="mobile_scout_container">
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
                        <Button variant="outline" colorScheme="red" onClick={() => deleteScoutFollow(player.id)}>
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
      </MobileView>
    </>
  );
};

export default Scout;
