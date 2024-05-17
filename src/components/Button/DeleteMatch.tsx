import { Button } from "@chakra-ui/react";
import crud from "@/utils/crud";
import { useAppDispatch } from "../../hooks/redux";
import { updateMatch } from "../../redux/Redux-actions/player";

function DeleteMatchButton({ matchId }: { matchId: string }) {
  const id: string | null = localStorage.getItem("id");
  const dispatch = useAppDispatch();

  const handleClick = async () => {
    const response = await crud.delete(
      ["player", "match"],
      [Number.parseInt(id!, 10), Number.parseInt(matchId!, 10)],
    );
    dispatch(updateMatch());
    return response.data;
  };

  return (
    <Button colorScheme="red" size="sm" onClick={handleClick}>
      Supprimer
    </Button>
  );
}

export default DeleteMatchButton;
