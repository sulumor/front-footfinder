import {
  Box,
  Button, useDisclosure,
} from "@chakra-ui/react";
import { EditProfilModal } from "../Modal";

export function UpdateProfilButton({  alignSelf } : { alignSelf: string;}) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box alignSelf={alignSelf}>
      <Button variant="redEvo" w="full" onClick={onOpen}>
        Modifier
      </Button>
      <EditProfilModal isOpen={isOpen} onClose={onClose} />
    </Box>
  );
}

