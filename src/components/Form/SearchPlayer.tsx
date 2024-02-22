import {
  Select,
  Button,
  Card,
  CardHeader,
  Flex,
  Avatar,
  Box,
  Heading,
  Text,
  CardBody,
  CardFooter,
  ButtonGroup,
} from "@chakra-ui/react";
import { BrowserView, MobileView } from "react-device-detect";
import axios from "axios";
import { useEffect, useState } from "react";

import "./SearchPlayer.scss";

interface Player {
  id: number;
  firstname: string;
  lastname: string;
  position: string;
  strong_foot: string;
  height: number;
  weight: number;
}

const SearchPlayer = () => {
  const [patchValues, setPatchValues] = useState({});
  const [players, setPlayers] = useState([]);

  const handleChangeField =
    (search: "nationality" | "genre" | "strong_foot" | "position") =>
    (value: string | number) => {
      setPatchValues({ ...patchValues, [search]: value });
    };

  const handleSubmit = async () => {
    const responses = await axios.get(`http://localhost:3000/scout/search`, {
      params: patchValues,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    setPlayers(responses.data);
  };

  useEffect(() => {
    setPatchValues({});
    document.querySelector("form")?.reset();
  }, [players]);

  return (
    <>
      <BrowserView>
        <div className="search_player_main">
          <div className="search_player_title">
            <h2>Recherche d'un joueur</h2>
          </div>
          <div className="search_player_container">
            <div className="search_player_form">
              <form onSubmit={handleSubmit}>
                <Select
                  placeholder="Sélectionner une nationalité"
                  onChange={(e) =>
                    handleChangeField("nationality")(e.target.value)
                  }
                >
                  <option value="Français">Français</option>
                  <option value="Brésilien">Brésilien</option>
                  <option value="Espagnol">Espagnol</option>
                  <option value="Anglais">Anglais</option>
                  <option value="Allemand">Allemand</option>
                  <option value="Argentin">Argentin</option>
                  <option value="Italien">Italien</option>
                  <option value="Portugais">Portugais</option>
                  <option value="Néerlandais">Néerlandais</option>
                  <option value="Belge">Belge</option>
                  <option value="Suédois">Suédois</option>
                </Select>
                <Select
                  placeholder="Sélectionner un genre"
                  onChange={(e) => handleChangeField("genre")(e.target.value)}
                >
                  <option value="Homme">Homme</option>
                  <option value="Femme">Femme</option>
                </Select>
                <Select
                  placeholder="Sélectionner un pied fort"
                  onChange={(e) =>
                    handleChangeField("strong_foot")(e.target.value)
                  }
                >
                  <option value="Droit">Droit</option>
                  <option value="Gauche">Gauche</option>
                </Select>
                <Select
                  placeholder="Sélectionner un poste"
                  onChange={(e) =>
                    handleChangeField("position")(e.target.value)
                  }
                >
                  <option value="Gardien">Gardien</option>
                  <option value="Libéro">Libéro</option>
                  <option value="Défenseur gauche">Défenseur gauche</option>
                  <option value="Défenseur droit">Défenseur droit</option>
                  <option value="Milieu défensif gauche">
                    Milieu défensif gauche
                  </option>
                  <option value="Milieu défensif droit">
                    Milieu défensif droit
                  </option>
                  <option value="Milieu défensif central">
                    Milieu défensif central
                  </option>
                  <option value="Milieu gauche">Milieu gauche</option>
                  <option value="Milieu droit">Milieu droit</option>
                  <option value="Milieu offensif">Milieu offensif</option>
                  <option value="Ailier gauche">Ailier gauche</option>
                  <option value="Ailier droit">Ailier droit</option>
                  <option value="Attaquant">Attaquant</option>
                  <option value="Avant-centre">Avant-centre</option>
                  <option value="Remplaçant">Remplaçant</option>
                </Select>
                <Button onClick={handleSubmit}>Recherche</Button>
              </form>
            </div>
            <h3>Résultat de la recherche</h3>
            <div className="search_player_results">
              <div className="search_player_results_container">
                {players?.map((player: Player) => {
                  return (
                    <div key={player.id} className="search_player_results_card">
                      <Card>
                        <CardHeader>
                          <Flex>
                            <Flex
                              flex="1"
                              gap="4"
                              alignItems="center"
                              flexWrap="wrap"
                            >
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
                              Pied fort:{" "}
                              <Text as="b">{player.strong_foot}</Text>
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
                          </ButtonGroup>
                        </CardFooter>
                      </Card>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </BrowserView>
      <MobileView>
        <div className="search_player_main">
          <div className="search_player_title">
            <h2>Recherche d'un joueur</h2>
          </div>
          <div className="search_player_container">
            <div className="mobile_search_player_form">
              <form onSubmit={handleSubmit}>
                <Select
                  placeholder="-- nationalité --"
                  onChange={(e) =>
                    handleChangeField("nationality")(e.target.value)
                  }
                >
                  <option value="Français">Français</option>
                  <option value="Brésilien">Brésilien</option>
                  <option value="Espagnol">Espagnol</option>
                  <option value="Anglais">Anglais</option>
                  <option value="Allemand">Allemand</option>
                  <option value="Argentin">Argentin</option>
                  <option value="Italien">Italien</option>
                  <option value="Portugais">Portugais</option>
                  <option value="Néerlandais">Néerlandais</option>
                  <option value="Belge">Belge</option>
                  <option value="Suédois">Suédois</option>
                </Select>
                <Select
                  placeholder="-- genre --"
                  onChange={(e) => handleChangeField("genre")(e.target.value)}
                >
                  <option value="Homme">Homme</option>
                  <option value="Femme">Femme</option>
                </Select>
                <Select
                  placeholder="-- pied fort --"
                  onChange={(e) =>
                    handleChangeField("strong_foot")(e.target.value)
                  }
                >
                  <option value="Droit">Droit</option>
                  <option value="Gauche">Gauche</option>
                </Select>
                <Select
                  placeholder="-- poste --"
                  onChange={(e) =>
                    handleChangeField("position")(e.target.value)
                  }
                >
                  <option value="Gardien">Gardien</option>
                  <option value="Libéro">Libéro</option>
                  <option value="Défenseur gauche">Défenseur gauche</option>
                  <option value="Défenseur droit">Défenseur droit</option>
                  <option value="Milieu défensif gauche">
                    Milieu défensif gauche
                  </option>
                  <option value="Milieu défensif droit">
                    Milieu défensif droit
                  </option>
                  <option value="Milieu défensif central">
                    Milieu défensif central
                  </option>
                  <option value="Milieu gauche">Milieu gauche</option>
                  <option value="Milieu droit">Milieu droit</option>
                  <option value="Milieu offensif">Milieu offensif</option>
                  <option value="Ailier gauche">Ailier gauche</option>
                  <option value="Ailier droit">Ailier droit</option>
                  <option value="Attaquant">Attaquant</option>
                  <option value="Avant-centre">Avant-centre</option>
                  <option value="Remplaçant">Remplaçant</option>
                </Select>
                <Button onClick={handleSubmit}>Recherche</Button>
              </form>
            </div>
            <h3>Résultat de la recherche</h3>
            <div className="search_player_results">
              <div className="mobile_search_player_results_container">
                {players?.map((player: Player) => {
                  return (
                    <div key={player.id} className="mobile_search_player_results_card">
                      <Card>
                        <CardHeader>
                          <Flex>
                            <Flex
                              flex="1"
                              gap="4"
                              alignItems="center"
                              flexWrap="wrap"
                            >
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
                              Pied fort:{" "}
                              <Text as="b">{player.strong_foot}</Text>
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
                          </ButtonGroup>
                        </CardFooter>
                      </Card>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </MobileView>
    </>
  );
};

export default SearchPlayer;
