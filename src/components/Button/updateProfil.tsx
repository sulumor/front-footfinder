import {
  Box,
  Button, useDisclosure,
} from "@chakra-ui/react";
import { EditPlayerModal, EditScoutModal } from "../Modal";
import { useAuth } from "@/context/Auth";

export function UpdateProfilButton({  alignSelf } : { alignSelf: string;}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useAuth();

  return (
    <Box alignSelf={alignSelf}>
      <Button variant="redEvo" w="full" onClick={onOpen}>
        Modifier
      </Button>
      {
        user?.role === "joueur" ? (
          <EditPlayerModal isOpen={isOpen} onClose={onClose} />
        ) : (
          <EditScoutModal isOpen={isOpen} onClose={onClose} />
        )
      }
    </Box>
  );
}

