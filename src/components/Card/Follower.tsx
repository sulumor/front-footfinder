import { PlayerView, Stats } from "@/@Types";
import { Avatar, Box, Button, ButtonGroup, Card, CardBody, CardFooter, CardHeader, Flex, Text, useDisclosure } from "@chakra-ui/react";
import { DeletePlayerFollowerAlert } from "../Alert";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/Auth";
import crud from "@/utils/crud";
import { ProfilDrawer } from "../Drawer";
import Chart from "../Chart/Chart";

export function FollowerCard({ player }: { player: PlayerView }): JSX.Element {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useAuth();
  const [globalStats, setGlobalStats] = useState<Stats>();

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      const res = await crud.get(["scout/player", "stats"],[player?.id]);
      if (res.status === 200) setGlobalStats(res.data);
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
        <Text textStyle="h4" textAlign="center">Les statistiques globaux</Text>
        <Chart position={player?.position} stats={globalStats}/>
      </CardBody>
      <CardFooter>
        <ButtonGroup spacing="2" m="0 auto">
          <ProfilDrawer player={player} />
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