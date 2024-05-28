import { Match, PlayerView } from "@/@Types";
import { Avatar, Box, Button, ButtonGroup, Card, CardBody, CardFooter, CardHeader, Flex, Heading, Text, useDisclosure } from "@chakra-ui/react";
import { DeletePlayerFollowerAlert } from "../Alert";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/Auth";
import crud from "@/utils/crud";
import { StatsBox } from "../Box";
import { ProfilDrawer } from "../Drawer";

export function FollowerCard({ player }: { player: PlayerView }): JSX.Element {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useAuth();
  const [matches, setMatches] = useState<Match>();

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      const response = await crud.get(["scout", "player", "match", "stats"], [user?.id, player?.id, 1]);
      setMatches(response.data[0]);
    };
    fetchData();
  }, [user, player]);
  
console.log(matches);

  return (
    <Card key={player?.id}>
      <CardHeader>
        <Flex
          flex="1"
          gap="4"
          alignItems="center"
          flexWrap="wrap"
          flexDirection="column"
        >
          <Avatar
            name={player?.lastname}
            src={player?.avatar}
          />
          <Box>
            <Text textStyle="mainText">
              {player?.firstname}
              {" "}
              {player?.lastname}
            </Text>
            <Text textStyle="text">{player?.teams[0]?.club_name}</Text>
          </Box>
        </Flex>
      </CardHeader>
      <CardBody>
        {
          matches ? (
            <>
            <Heading as="h3" variant="h3" textAlign="center">Dernier match</Heading>
            <Box>
            <Text textStyle="h4" textAlign="center">
              {new Date(matches?.date as Date).toLocaleDateString("fr-FR", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </Text>
          <Text textStyle="h3" p="0.8rem" >
            {matches?.home.club_name}
            {" "}
            {matches?.score}
            {" "}
            {matches?.away.club_name}
          </Text>
          <StatsBox game={matches}/>
        </Box>
              </>
        ) : (
          <Heading as="h3" variant="h3" textAlign="center">Ce joueur n'as pas encore enregistré de statistique</Heading>
        )
      }
      </CardBody>
      <CardFooter>
        <ButtonGroup spacing="2" m="0 auto">
          <ProfilDrawer player={player}/>
          <Button
            variant="outline"
            colorScheme="red"
            onClick={onOpen}
          >
            Retirer
          </Button>
          <DeletePlayerFollowerAlert isOpen={isOpen} onClose={onClose} player={player} />
        </ButtonGroup>

      </CardFooter>
    </Card>

  );
}