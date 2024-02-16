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
import { EditIcon } from "@chakra-ui/icons";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { getPlayerInfos } from "../store/reducers/player";

const PlayerProfil = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useAppDispatch();
  const id = localStorage.getItem("id");

 // const firstName = useAppSelector((state) => state.player.firstname );
  const lastName = useAppSelector((state) => state.player.lastname );
  const firstName = useAppSelector((state) => state.player.firstname);
  const position = useAppSelector((state) => state.player.position);
  const email = useAppSelector((state) => state.player.email);
  const country = useAppSelector((state) => state.player.nationality);
  const foot = useAppSelector((state) => state.player.strong_foot);
  const matches = useAppSelector((state) => state.player.number_of_matches_played);
  const birthday = useAppSelector((state) => state.player.birth_date);
  const genre = useAppSelector((state) => state.player.genre);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getPlayerInfos(id));
    };
    fetchData()
  }, [])

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
            <Text fontWeight="bold" fontSize="2xl">
              {firstName} {lastName}
            </Text>
            <Text fontSize="xl">{position}</Text>
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
              Nombre de match joué(s) :  <span>{matches}</span>
            </p>
          </div>
        </div>
      </div>
      <div className="edit_profil_button">
        <Button colorScheme="teal">Modifier</Button>
      </div>
    </div>
  );
};

export default PlayerProfil;
