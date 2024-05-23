import { Box, Heading } from "@chakra-ui/react";
import { useAuth } from "@/context/Auth";
import { useEffect } from "react";
import { PlayersFollowersListBox } from "@/components/Box";

export function HomeScout(): JSX.Element {
  const { user, setHasToBeRefetch } = useAuth();

  useEffect(() => {
    setHasToBeRefetch(true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box h="100%" p={10}>
      <Heading as="h2" variant="h2">
        Bonjour,{" "}{user?.firstname}
      </Heading>
      <PlayersFollowersListBox/>
    </Box>
  );
}

