import {
  Avatar,
  Box,
  Flex,
  Text,
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
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";

import "./ScoutProfil.scss";

const ScoutProfil = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <div className="sprofil_main">
        <h1>Mon profil recruteur</h1>
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
    </>
  );
};

export default ScoutProfil;
