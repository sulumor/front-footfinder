import { useAuth } from "@/context/Auth";
import { colors } from "@/utils/theme";
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/modal";
import { Center, Spinner, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export function LoadingModal(): JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { loading } = useAuth();

  const onClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    setIsOpen(loading);
  }, [loading]);


  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Notre serveur se réveille</ModalHeader>
        <ModalCloseButton/>
        <ModalBody>
          <Center>
          <Spinner thickness='4px'
            speed='0.65s'
            emptyColor={colors.red}
            color={colors.redEvo}
            size='xl' />
            </Center>
          <Text>Attends une seconde, il finit son café et répond à ta requête</Text>
        </ModalBody>
        <ModalFooter>
          <Text textStyle="textSmall">Une fois la requête validée, cette fenêtre va se fermer automatiquement</Text>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}