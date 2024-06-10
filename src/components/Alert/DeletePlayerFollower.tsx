import { PlayerView } from "@/@Types";
import { useAuth } from "@/context/Auth";
import crud from "@/utils/crud";
import { AlertDialog, AlertDialogBody, AlertDialogCloseButton, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, useToast } from "@chakra-ui/react";
import { useRef } from "react";

export interface DeleteAlert {
  isOpen: boolean;
  onClose: () => void;
  player: PlayerView;
}

export function DeletePlayerFollowerAlert({ isOpen, onClose, player } : DeleteAlert):JSX.Element{
  const { user, getUser } = useAuth();
  const toast = useToast();
  const cancelRef = useRef<HTMLButtonElement>(null);


  const deleteScoutFollow = async () => {
    const res = await crud.delete(
      ["scout/player"],
      [player?.id],
    );

    if (res.status === 204){ 
      onClose();
      getUser(user);
      toast({
        title:"Suppression dans la liste des joueurs suivis",
        description: `${player.firstname} ${player.lastname} a bien été supprimé de votre liste.`,
        status: "success",
        isClosable: true,
      });
    }
  };
  
  return(
    <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Retirer un joueur
            </AlertDialogHeader>
            <AlertDialogCloseButton/>
            <AlertDialogBody>
              Êtes vous sûr de bien vouloir retirer {player?.firstname} {player?.lastname} de votre liste de joueurs suivis? 
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Annuler
              </Button>
              <Button variant='redEvo' onClick={deleteScoutFollow} ml={3}>
                Retirer
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
  );
}