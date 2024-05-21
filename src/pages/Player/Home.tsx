import {
  Divider,
  Box,
  Heading,
  Flex,
} from "@chakra-ui/react";
import { useEffect } from "react";

import { NextMatchCard } from "@/components/Card";
import Chart from "@/components/Chart/Chart";
import FollowByScouts from "@/components/Card/FollowByScouts";

import { useAuth } from "@/context/Auth";

export function Home(): JSX.Element {
  const { user, setHasToBeRefetch } = useAuth();
  
  useEffect(() => {
    setHasToBeRefetch(true)
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
          <FollowByScouts />
        </Flex>
        <Chart/>
      </Flex> 
    </Box>
  );
}


