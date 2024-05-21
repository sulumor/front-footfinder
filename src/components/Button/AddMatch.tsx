import { Button, useDisclosure } from "@chakra-ui/react";
import { AddMatchModal } from "../Modal";


export function AddMatchButton() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button variant="redEvo" w="full" onClick={onOpen}>
        Ajouter un match
      </Button>
      <AddMatchModal isOpen={isOpen} onClose={onClose} />
    </>
  );
}

