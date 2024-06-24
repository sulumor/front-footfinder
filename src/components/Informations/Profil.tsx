import { useAuth } from "@/context/Auth";
import { calculateAge } from "@/utils/functions";
import { formatBirthDate } from "@/utils/dateFunctions";
import { Flex, Grid, GridItem, Box, Text } from "@chakra-ui/react";
import { MobileView, BrowserView } from "react-device-detect";
import { Team } from "@/@Types";

export function ProfilInformation(): JSX.Element {
  const { user } = useAuth();
  const playerCurrentTeam: Team = user?.teams.filter((team: Team) => team.season === '2023-2024')[0];


  console.log(user);

  return (
    <Box p={6}>
      <Text textStyle="h3" mt="4" mb={{ base: "4", lg: "8" }}>
        Informations
      </Text>
      <MobileView>
        <Flex mb="2">
          <Text textStyle="h5">Ville</Text>
          <Text ml="2" textStyle="text">
            {user?.role ? playerCurrentTeam?.city : user?.team?.city}
          </Text>
        </Flex>
        {user?.role && (
          <>
            <Flex mb="2">
              <Text textStyle="h5">Genre</Text>
              <Text ml="2" textStyle="text">
                {user?.gender}
              </Text>
            </Flex>
            <Flex mb="2">
              <Text textStyle="h5">Nationalité</Text>
              <Text ml="2" textStyle="text">
                {user?.nationality}
              </Text>
            </Flex>
            <Flex mb="2">
              <Text textStyle="h5">Taille</Text>
              <Text ml="2" textStyle="text">
                {user?.height} cm
              </Text>
            </Flex>
            <Flex mb="2">
              <Text textStyle="h5">Poids</Text>
              <Text ml="2" textStyle="text">
                {user?.weight} kg
              </Text>
            </Flex>
            <Flex mb="2">
              <Text textStyle="h5">Pied</Text>
              <Text ml="2" textStyle="text">
                {user?.strong_foot}
              </Text>
            </Flex>
          </>
        )}
        <Flex mb="2">
          <Text textStyle="h5">Club</Text>
          <Text ml="2" textStyle="text">
            {user?.role ? playerCurrentTeam?.club_name : user?.team?.club_name}
          </Text>
        </Flex>
      </MobileView>

      <BrowserView>
        {user?.role ? (
          <Grid templateColumns="repeat(4, 1fr)" templateRows="repeat(3, 1fr)" gap={5}>
            <GridItem rowStart={1} colStart={1}>
              <Text mb="2" textStyle="h5">
                Ville
              </Text>
              <Text textStyle="text">{user?.teams[0]?.city}</Text>
            </GridItem>
            <GridItem rowStart={1} colStart={2}>
              <Text textStyle="h5" mb="2">
                Genre
              </Text>
              <Text textStyle="text">{user?.gender}</Text>
            </GridItem>
            <GridItem rowStart={1} colStart={3}>
              <Text textStyle="h5" mb="2">
                Taille
              </Text>
              <Text textStyle="text">{user?.height} cm</Text>
            </GridItem>
            <GridItem rowStart={1} colStart={4}>
              <Text textStyle="h5" mb="2">
                Club
              </Text>
              <Text textStyle="text">
                {playerCurrentTeam?.club_name}, {playerCurrentTeam?.city}
              </Text>
            </GridItem>

            <GridItem rowStart={2} colStart={1}>
              <Text textStyle="h5" mb="2">
                Stade
              </Text>
              <Text textStyle="text">{playerCurrentTeam?.stadium_name}</Text>
            </GridItem>
            <GridItem rowStart={2} colStart={2}>
              <Text textStyle="h5" mb="2">
                Nationalité
              </Text>
              <Text textStyle="text">{user?.nationality}</Text>
            </GridItem>
            <GridItem rowStart={2} colStart={3}>
              <Text textStyle="h5" mb="2">
                Poids
              </Text>
              <Text textStyle="text">{user?.weight} kg</Text>
            </GridItem>
            <GridItem rowStart={2} colStart={4}>
              <Text textStyle="h5" mb="2">
                Pied
              </Text>
              <Text textStyle="text">{user?.strong_foot ? "Droit" : "Gauche"}</Text>
            </GridItem>

            <GridItem rowStart={3} colStart={1}>
              <Text textStyle="h5" mb="2">
                Date de naissance
              </Text>
              <Text textStyle="text">
                {formatBirthDate(user?.birth_date)} ({calculateAge(user?.birth_date as string)} ans)
              </Text>
            </GridItem>
            <GridItem rowStart={3} colStart={2}>
              <Text textStyle="h5" mb="2">
                Email
              </Text>
              <Text textStyle="text">{user?.email}</Text>
            </GridItem>
          </Grid>
        ) : (
          <Flex mb="2" gap={4}>
            <Flex>
              <Text textStyle="h5">Genre</Text>
              <Text ml="2" textStyle="text">
                {user?.gender}
              </Text>
            </Flex>
            <Flex>
              <Text textStyle="h5">Nationalité</Text>
              <Text ml="2" textStyle="text">
                {user?.nationality}
              </Text>
            </Flex>
            <Flex>
              <Text textStyle="h5">Email</Text>
              <Text ml="2" textStyle="text">
                {user?.email}
              </Text>
            </Flex>
            <Flex>
              <Text textStyle="h5">Ville</Text>
              <Text ml="2" textStyle="text">
                {user?.team?.city}
              </Text>
            </Flex>
          </Flex>
        )}
      </BrowserView>
    </Box>
  );
}