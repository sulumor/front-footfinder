import {
  Avatar,
  Box,
  Divider,
  Flex,
  Text,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
  Button,
  useDisclosure,
} from "@chakra-ui/react";

import "./PlayerProfil.scss";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { getPlayerInfos } from "../store/reducers/player";
import axios from "axios";

const PlayerProfil = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useAppDispatch();
  const id = localStorage.getItem("id");

  const lastName = useAppSelector((state) => state.player.lastname);
  const firstName = useAppSelector((state) => state.player.firstname);
  const position = useAppSelector((state) => state.player.position);
  const email = useAppSelector((state) => state.player.email);
  const country = useAppSelector((state) => state.player.nationality);
  const foot = useAppSelector((state) => state.player.strong_foot);
  const matches = useAppSelector(
    (state) => state.player.number_of_matches_played
  );
  const birthday = useAppSelector((state) => state.player.birth_date);
  const genre = useAppSelector((state) => state.player.genre);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getPlayerInfos(id));
    };
    fetchData();
  }, []);

  const [patchValues, setPatchValues] = useState({
    firstname: "",
    lastname: "",
    email: "",
    position: "",
    nationality: "",
    strong_foot: "",
  });

  const handleChangeField = (player: "firstname" | "lastname" | "email" | "position" | "nationality" | "strong_foot") => (value: string) => {
    setPatchValues({ ...patchValues, [player]: value });
  };

  const handleSubmit = () => {
    updatePlayerInfos();
  }

  const updatePlayerInfos = async () => {
    const response = await axios.patch(`http://localhost:3000/player/${id}`, {...patchValues});
    console.log("requete update player terminée");
    console.log(response.data);
    return response.data;
  }

  return (
    <div className="profil_main">
      <div className="profil_title">
        <Flex>
          <Avatar
            size="2xl"
            name={lastName}
            src="https://bit.ly/kent-c-dodds"
          />
          <Box ml="4">
            <div className="profil_title_name">
            <Text fontWeight="bold" fontSize="2xl">
              {firstName}
            </Text>            
            <Text fontWeight="bold" fontSize="2xl">
              {lastName}
            </Text>
            </div>
            <div className="profil_title_position">           
            <Text fontSize="xl">{position}</Text>
            </div>
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
                      <FormLabel>Nationalité</FormLabel>
                      <Input value={patchValues.nationality} onChange={(e) => handleChangeField("nationality")(e.target.value)} />
                    </FormControl>

                    <FormControl mt={4}>
                      <FormLabel>Position</FormLabel>
                      <Input value={patchValues.position} onChange={(e) => handleChangeField("position")(e.target.value)} />
                    </FormControl>

                    <FormControl mt={4}>
                      <FormLabel>Pied fort</FormLabel>
                      <Input value={patchValues.strong_foot} onChange={(e) => handleChangeField("strong_foot")(e.target.value)} />
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
          </Box>
        </Flex>
        
      </div>
      <Divider />
      <div className="profil_container">
        <div className="profil_container_left">
          <div className="profil_container_left_title">
            <h2>Informations générales</h2>
          </div>
          <div className="profil_container_left_infos">
            <p>
              Prénom : <span>{firstName}</span>
            </p>
            <p>
              Nom : <span>{lastName}</span>
            </p>
            <p>
              Email : <span>{email}</span>
            </p>
          </div>
        </div>
        <div className="profil_container_right">
          <div className="profil_container_right_title">
            <h2>Informations de joueur</h2>
          </div>
          <div className="profil_container_right_infos">
            <p>
              Date de naissance : <span>{birthday}</span>
            </p>
            <p>
              Nationnalité : <span>{country}</span>
            </p>
            <p>
              Genre : <span>{genre}</span>
            </p>
            <p>
              Pied fort : <span>{foot}</span>
            </p>
            <p>
              Position : <span>{position}</span>
            </p>
            <p>
              Nombre de match joué(s) : <span>{matches}</span>
            </p>
          </div>
        </div>
      </div>
      <div className="edit_profil_button">
        <Button colorScheme="teal" onClick={onOpen}>Modifier</Button>
      </div>
    </div>
  );
};

export default PlayerProfil;
