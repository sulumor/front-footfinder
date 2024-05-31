import { Match } from "@/@Types";
import { formatDate } from "@/utils/functions";
import { Box, Card, CardBody, CardFooter, CardHeader, Flex, Heading, TabPanel, Text, Wrap, WrapItem } from "@chakra-ui/react";
import DeleteMatchButton from "../Button/DeleteMatch";
import { AddMatchButton } from "../Button";

export function NextGamesTab({ games }: { games: Match[] }): JSX.Element {
  return (
    <TabPanel>
      {games.length > 0 ? (
        <Wrap spacing=" 1.5rem">
          {games.map((game: Match) => (
            <WrapItem key={game.match_id} w="300px" h="320px">
              <Card align="center" size="sm" w="full" h="full">
                <CardHeader>
                  <Text textStyle="secondTitle" noOfLines={1}>
                    {formatDate(game.date)}
                  </Text>
                </CardHeader>
                <CardBody>
                  <Text textStyle="h3" p="0.8rem" align="center">
                    {game.home.club_name}
                    {" "}
                    -
                    {" "}
                    {game.away.club_name}
                  </Text>
                  <Box padding="1rem">
                    <Text mt="1rem" textStyle="text" mb="0.6rem">{game?.home.stadium_name}</Text>
                    <Text textStyle="textSmall">
                      {game?.home.adress}
                    </Text>
                    <Text textStyle="textSmall">
                      {game?.home.zip_code},
                      {" "}
                      {game?.home.city}
                    </Text>
                  </Box>
                </CardBody>
                <DeleteMatchButton matchId={`${game.match_id}`} />
                <CardFooter />
              </Card>
            </WrapItem>
          ))}
        </Wrap>
      ) : (
        <Card>
          <CardBody>
            <Heading as="h3" variant="h3">Prochain match: </Heading>
            <Flex flexDirection="column" gap="1rem">
              <Text textStyle="h3">Pas de prochain match enregistré. </Text>
              <Text textStyle="h6" textAlign="center">Pour que les recruteurs puissent venir vous voir</Text>
              <AddMatchButton />
            </Flex>
          </CardBody>
        </Card>
      )}
    </TabPanel>
  );
}