import { PlayerView } from "@/@Types";
import { useAuth } from "@/context/Auth";
import crud from "@/utils/crud";
import { AlertDialog, AlertDialogBody, AlertDialogCloseButton, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, useToast } from "@chakra-ui/react";
import { useRef } from "react";

export interface AddAlert {
  isOpen: boolean;
  onClose: () => void;
  player: PlayerView;
}

export function AddPlayerFollowerAlert({ isOpen, onClose, player } : AddAlert):JSX.Element{
  const { user, getUser } = useAuth();
  const toast = useToast();
  const cancelRef = useRef<HTMLButtonElement>(null);


  const addScoutFollow = async () => {
    const res = await crud.post(
      ["scout/player"],
      [player?.id],
      {}
    );

    if (res.status === 201){ 
      onClose();
      getUser(user);
      toast({
        title:"Ajout dans la liste des joueurs suivis",
        description: `${player.firstname} ${player.lastname} a bien été ajouté de votre liste.`,
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
              Ajouter un joueur
            </AlertDialogHeader>
            <AlertDialogCloseButton/>
            <AlertDialogBody>
              Êtes vous sûr de bien vouloir ajouter {player?.firstname} {player?.lastname} à votre liste de joueurs suivis? 
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Annuler
              </Button>
              <Button variant='redEvo' onClick={addScoutFollow} ml={3}>
                Ajouter
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
  );
}