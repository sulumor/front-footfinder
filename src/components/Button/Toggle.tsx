/* eslint-disable @typescript-eslint/no-explicit-any */
import { useBoolean, Box, Flex } from '@chakra-ui/react';
import { colors } from '@/utils/theme';

export function ToggleBtn({ setJob }: { setJob: any }): JSX.Element {
  const [property, setProperty] = useBoolean();

  const ChangeProperty = (property: boolean): void => {
    setProperty.toggle();
    setJob(property);
  };

  return (
    <Flex bg={colors.toggleGrey} borderRadius="10px" maxW="300px">
      <Box
        borderRadius="10px"
        onClick={() => ChangeProperty(property)}
        w="50%"
        textStyle="h4"
        color={colors.white}
        p={{ base: '0.9rem', lg: '1rem 2rem' }}
        textAlign="center"
        bg={property ? colors.redEvo : ''}
      >
        Joueur
      </Box>
      <Box
        borderRadius="10px"
        onClick={() => ChangeProperty(property)}
        textAlign="center"
        textStyle="h4"
        p={{ base: '0.9rem', lg: '1rem 2rem' }}
        color={colors.white}
        w="50%"
        bg={property ? '' : colors.redEvo}
      >
        Manager
      </Box>
    </Flex>
  );
}