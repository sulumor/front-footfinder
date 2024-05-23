import { Button, useDisclosure } from "@chakra-ui/react";
import { EditGameModal } from "../Modal";
import { Match } from "@/@Types";

export function AddStatsBtn ({game} : { game : Match}) : JSX.Element {
  const { onOpen, isOpen, onClose } = useDisclosure();
  const stats : boolean = game.score === "-";
  return (
    <>
      <Button variant={stats ? "redEvo" : "inverse"} w="full" onClick={onOpen}>
        {stats ? "Ajouter mes stats" : "Modifier mes stats"}
      </Button>
      <EditGameModal isOpen={isOpen} onClose={onClose} game={game}/>
    </>
  );
}