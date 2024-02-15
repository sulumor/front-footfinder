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

const PlayerProfil = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div className="profil_main">
      <div className="profil_title">
        <Flex>
          <Avatar
            size="2xl"
            name="Michel Blanc"
            src="https://bit.ly/kent-c-dodds"
          />
          <Box ml="4">
            <Text fontWeight="bold" fontSize="2xl">
              Michel Blanc
            </Text>
            <Text fontSize="xl">Attaquant</Text>
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
              Prénom: <span>Michel</span>
            </p>
            <p>
              Nom: <span>Blanc</span>
            </p>
            <p>
              Email: <span>michelblanc@gmail.com</span>
            </p>
          </div>
        </div>
        <div className="profil_container_right">
          <div className="profil_container_right_title">
            <h2>Informations de joueur</h2>
          </div>
          <div className="profil_container_right_infos">
            <p>
              Date de naissance: <span>12/07/2003</span>
            </p>
            <p>
              Nationnalité: <span>Française</span>
            </p>
            <p>
              Genre: <span>Homme</span>
            </p>
            <p>
              Pied fort: <span>Droit</span>
            </p>
            <p>
              Position: <span>Attaquant</span>
            </p>
            <p>
              Nombre de match joué <span>21</span>
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
