import { Avatar, Box, Flex, Heading, Text, Tooltip, Wrap, WrapItem} from "@chakra-ui/react";
import { ScoutView } from "@/@Types";
import { useAuth } from "@/context/Auth";

export function ScoutsListBox() {
  const { user } = useAuth();

  const scouts : ScoutView[] = user?.scouts;

  
  return (
    <Box>
      <Flex justifyContent="start" alignItems="center" gap={2}>
        <Heading as="h3" variant="h3">Suivi par</Heading>      
        <Text textStyle="h3">
          {scouts?.length}
          {" "}
          recruteurs:
        </Text>
      </Flex>
      <Box>
        <Wrap>
          <WrapItem>
            {scouts?.map((scout : ScoutView) => (
              <Tooltip label={`${scout?.firstname} ${scout?.lastname}`} key={scout?.id}>
                <Avatar
                  key={scout?.id}
                  name={`${scout?.firstname} ${scout?.lastname}`}
                  src={scout?.avatar}
                  m={1}
                  />
              </Tooltip>
            ))}
          </WrapItem>
        </Wrap>
      </Box>
    </Box>
  );
}
