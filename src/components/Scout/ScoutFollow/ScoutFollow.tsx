import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";

const ScoutFollow = () => {

    const [data, setData] = useState([])

    const getScoutFollows = async () => {
        const response = await axios.get(`http://localhost:3000/scout/${id}`);
        if (response.data.players === "Pas de joueur suivi") {
          return setData([]);
        }
        return setData(response.data.players);
      }

      const deleteScoutFollow = async (playerId: any) => {
        const response = await axios.delete(`http://localhost:3000/scout/${id}/player/${playerId}`);
        console.log("requete delete follow terminée");
        console.log(response.data)
        return setData(response.data.players);
      }

  return (
    <div className="scout_follow">
      <div className="scout_follow_card">
        <SimpleGrid
          spacing={4}
          templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
        >
          {data?.map((player: any) => {
            return (
              <Card key={player.id}>
                <CardHeader>
                  <Flex>
                    <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
                      <Avatar
                        name={player.lastname}
                        src="https://bit.ly/sage-adebayo"
                      />
                      <Box>
                        <Heading size="sm">
                          {player.firstname} {player.lastname}
                        </Heading>
                        <Text>Marseille</Text>
                      </Box>
                    </Flex>
                  </Flex>
                </CardHeader>
                <CardBody>
                  <div className="card_body_text">
                    <Text>
                      Poste: <Text as="b">{player.position}</Text>
                      <br />
                    </Text>
                    <Text>
                      Pied fort: <Text as="b">{player.strong_foot}</Text>
                      <br />
                    </Text>
                    <Text>
                      Taille: <Text as="b">{player.height} cm</Text>
                      <br />
                    </Text>
                    <Text>
                      Poids: <Text as="b">{player.weight} kg</Text>
                      <br />
                    </Text>
                  </div>
                </CardBody>
                <CardFooter>
                  <ButtonGroup spacing="2">
                    <a href={`/player/${player.id}`}>
                      <Button variant="solid" colorScheme="teal">
                        Profil
                      </Button>
                    </a>
                    <Button
                      variant="outline"
                      colorScheme="red"
                      onClick={() => deleteScoutFollow(player.id)}
                    >
                      Retirer
                    </Button>
                  </ButtonGroup>
                </CardFooter>
              </Card>
            );
          })}
        </SimpleGrid>
      </div>
    </div>
  );
};

export default ScoutFollow;
