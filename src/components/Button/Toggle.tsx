/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Flex } from "@chakra-ui/react";
import { colors } from "@/utils/theme";

export function ToggleBtn({ setJob, job }: { setJob: React.Dispatch<React.SetStateAction<boolean>>, job: boolean }): JSX.Element {

  const ChangeProperty = (): void => {
    setJob(!job);
  };

  return (
    <Flex bg={colors.toggleGrey} borderRadius="10px" maxW="300px" m="0 auto">
      <Box
        borderRadius="10px"
        onClick={() => ChangeProperty()}
        w="50%"
        textStyle="h4"
        color={colors.white}
        p={{ base: "0.9rem", lg: "1rem 2rem" }}
        textAlign="center"
        bg={job ? colors.redEvo : ""}
      >
        Joueur
      </Box>
      <Box
        borderRadius="10px"
        onClick={() => ChangeProperty()}
        textAlign="center"
        textStyle="h4"
        p={{ base: "0.9rem", lg: "1rem 2rem" }}
        color={colors.white}
        w="50%"
        bg={job ? "" : colors.redEvo}
      >
        Manager
      </Box>
    </Flex>
  );
}
