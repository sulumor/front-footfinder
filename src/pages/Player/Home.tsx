import {
  Divider,
  Box,
  Heading,
  Flex,
} from "@chakra-ui/react";
import { useEffect } from "react";
import Chart from "@/components/Chart/Chart";
import { NextMatchCard } from "@/components/Card";
import { ScoutsListBox } from "@/components/Box";
import { useAuth } from "@/context/Auth";

export function HomePlayer(): JSX.Element {
  const { user, userGlobalStats, setHasToBeRefetch } = useAuth();

  useEffect(() => {
    setHasToBeRefetch(true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box h="100%" p={10}>
      <Heading as="h2" variant="h2">
        Bonjour,{" "}{user?.firstname}
      </Heading>
      <Flex w="80%" m="0 auto" justifyContent="space-between" wrap="wrap" p="1rem">
        <Flex flexDirection="column" gap="1.5rem" p="1rem">
          <NextMatchCard/>
          <Divider />
          <ScoutsListBox />
        </Flex>
        <Box w={{base: "100%", md:"40%"}}>
          <Heading as="h2" variant="h2">Vos statistiques avec {user?.teams[0].club_name}</Heading>
          <Chart position={user?.position} stats={userGlobalStats}/>
        </Box>
      </Flex> 
    </Box>
  );
}


