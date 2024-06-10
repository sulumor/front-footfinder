import { Match, PlayerView } from "@/@Types";
import { Avatar, Box, Button, ButtonGroup, Card, CardBody, CardFooter, CardHeader, Flex, Heading, Text, useDisclosure } from "@chakra-ui/react";
import { DeletePlayerFollowerAlert } from "../Alert";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/Auth";
import crud from "@/utils/crud";
import { StatsBox } from "../Box";
import { ProfilDrawer } from "../Drawer";
import { sortByDesc } from "@/utils/functions";

export function FollowerCard({ player }: { player: PlayerView }): JSX.Element {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useAuth();
  const [nextMatch, setNextMatch] = useState<Match>();

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      const response = await crud.get(["scout/player", "match"], [ player?.id]);
      let oneMatch : Match[] = []; 
      if (response.data) oneMatch = sortByDesc(response.data);    
      setNextMatch(oneMatch[0]);
    };
    fetchData();
  }, [user, player]);
  
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
          nextMatch ? (
            <>
            <Heading as="h3" variant="h3" textAlign="center">Dernier match</Heading>
            <Box>
            <Text textStyle="h4" textAlign="center">
              {new Date(nextMatch?.date as Date).toLocaleDateString("fr-FR", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </Text>
          <Text textStyle="h3" p="0.8rem" >
            {nextMatch?.home.club_name}
            {" "}
            {nextMatch?.score}
            {" "}
            {nextMatch?.away.club_name}
          </Text>
          <StatsBox game={nextMatch}/>
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