import { Button } from "@chakra-ui/react";
import crud from "@/utils/crud";
import { useAuth } from "@/context/Auth";

export function DeleteMatchButton({ matchId }: { matchId: string }) {
  const { user, getUser } = useAuth();

  const handleClick : () => Promise<void> = async () => {
    const response = await crud.delete(
      ["player/match"],
      [Number.parseInt(matchId!, 10)],
    );
    if(response.status === 204) getUser(user);
  };

  return (
    <Button variant="redEvo" onClick={handleClick}>
      Supprimer
    </Button>
  );
}