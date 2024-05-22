import { Match } from "@/@Types";
import { useAuth } from "@/context/Auth";
import { Text, Wrap, WrapItem } from "@chakra-ui/react";

export function StatsBox ({ game } : {game: Match}) : JSX.Element {
  const { user } = useAuth();

  return (
    <Wrap>
      <WrapItem>
        <Text> Carton jaune : {game?.yellow_card}</Text>
      </WrapItem>
      <WrapItem>
        <Text> Carton rouge : {game?.red_card}</Text>
      </WrapItem>
      {user?.position === "Gardien" ? (
        <>
          <WrapItem>
            <Text> Arrêt(s) : {game?.stops}</Text>
          </WrapItem>
          <WrapItem>
            <Text> But(s) concédé(s) : {game?.goals_conceded}</Text>
          </WrapItem>
        </>
      ) : (
        <>
        <WrapItem>
            <Text> But(s) marqué(s) : {game?.goals_scored}</Text>
          </WrapItem>
          <WrapItem>
            <Text> Passe(s) décisive(s) : {game?.assists}</Text>
          </WrapItem>
        </>
      )}
    </Wrap>
  );
}