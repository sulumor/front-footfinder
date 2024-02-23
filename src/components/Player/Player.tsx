import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Radar } from "react-chartjs-2";
import {
  Divider,
  Button,
  Avatar,
  Wrap,
  WrapItem,
  Center,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  Select,
  Input,
} from "@chakra-ui/react";
import { BrowserView, MobileView } from "react-device-detect";
import { useEffect, useState } from "react";
import crud from "@/utils/crud";

import "./Player.scss";
import "./Calendar.scss";
import { Match, setMatch as setMatchType, Team, Stats } from "@/@Types";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const Player = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const id : string | null = localStorage.getItem("id");
  const firstName : string | null = localStorage.getItem("firstname");
  const [teams, setTeams] = useState<Team[]>();
  const [stats, setStats] = useState<Stats>();
  const [match, setMatch] = useState<Match>();

  const [matchValues, setMatchValues] = useState<setMatchType>({
    homeTeam: 0,
    awayTeam: 0,
    date: "",
  });

  const getAllStats : () => Promise<void> = async () => {
    const responses = await crud.get(
      ["player", "stats"],
      [Number.parseInt(id!, 10)]
    );
    return setStats(responses.data);
  };


  const getNextMatch : () => Promise<void> = async () => {
    const responses  = await crud.get(['player', 'match', 'stats'], [Number.parseInt(id!, 10)]);
    const sortResponse : Match[] = responses.data.sort(function(a : Match, b : Match) {
      return new Date(a.date).getTime()  - new Date(b.date).getTime();
    });
    
    const today : Date = new Date();
    const nextMatch : Match[] = sortResponse.filter(((match: Match) => new Date(match.date) > today))
    return setMatch(nextMatch[0]);
  };

  const getAllTeams : () => Promise<void> = async () => {
    const response = await crud.get(["datas", "teams"], []);
    return setTeams(response.data);
  };

  const addMatch : () => Promise<Match> = async () => {
    const response = await crud.post(['player', 'match'], [Number.parseInt(id!, 10)], {...matchValues});
    return response.data
  }

  const handleChangeField : (match: "homeTeam" | "awayTeam" | "date") => (value: number | string | Date) => void =
    (match: "homeTeam" | "awayTeam" | "date") => (value: number | string | Date) => {
      setMatchValues({ ...matchValues, [match]: value });
    };

  const handleSubmit : () => void = () => {
    addMatch()
  }

  useEffect(() => {
    const fetchData = async () => {
      await getAllStats();
      await getNextMatch();
      await getAllTeams();
    };
    fetchData();
  }, []);

  const data = {
    labels: [
      "Passes décisives",
      "Buts marqués",
      "Arrêts",
      "Cartons jaunes",
      "Cartons rouges",
      "Buts concedés",
    ],
    datasets: [
      {
        label: "vos statistiques",
        data: [
          stats?.assists,
          stats?.goals_scored,
          stats?.stops,
          stats?.yellow_card,
          stats?.red_card,
          stats?.goals_conceded,
        ],
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };
  return (
    <>
      <BrowserView>
        <div className="player_name">
          <h2>Bonjour, {firstName}</h2>
        </div>
        <Center>
          <Divider width="50%" />
        </Center>
        <div className="player_container">
          <div className="player_infos">
            <div className="player_match">
              <h3>Prochain match: </h3>
              <span>
                {new Date(match?.date as Date).toLocaleDateString("fr-FR", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
              <div className="player_match_infos">
                <h3>
                  {match?.home.club_name} - {match?.away.club_name}
                </h3>
                <p>{match?.home.stadium_name}</p>
                <p>
                  {match?.home.adress}, {match?.home.zip_code}{" "}
                  {match?.home.city}
                </p>
                <div className="player_match_button">
                  <Button colorScheme="teal" onClick={onOpen}>
                    Ajouter un match
                  </Button>
                </div>
                <Modal isOpen={isOpen} onClose={onClose}>
                  <form onSubmit={handleSubmit}>
                    <ModalOverlay />
                    <ModalContent>
                      <ModalHeader>Ajouter un match</ModalHeader>
                      <ModalCloseButton />
                      <ModalBody pb={6}>
                        <FormControl isRequired>
                          <FormLabel>Date du match</FormLabel>
                          <Input
                            placeholder="Select Date and Time"
                            size="md"
                            type="date"
                            value={matchValues.date as string}
                            onChange={(e) =>
                              handleChangeField("date")(e.target.value)
                            }
                          />
                        </FormControl>

                        <FormControl mt={4} isRequired>
                          <FormLabel>Equipe à domicile</FormLabel>
                          <Select
                            placeholder="-- équipe à domicile --"
                            value={matchValues.homeTeam}
                            onChange={(e) =>
                              handleChangeField("homeTeam")(e.target.value)
                            }
                          >
                            {teams?.map((team: Team) => (
                              <option key={team.id} value={team.id}>
                                {team.club_name}
                              </option>
                            ))}
                          </Select>
                        </FormControl>
                        <FormControl mt={4} isRequired>
                          <FormLabel>Equipe visiteur</FormLabel>
                          <Select
                            placeholder="-- équipe visiteur --"
                            value={matchValues.awayTeam}
                            onChange={(e) =>
                              handleChangeField("awayTeam")(e.target.value)
                            }
                          >
                            {teams?.map((team: Team) => (
                              <option key={team.id} value={team.id}>
                                {team.club_name}
                              </option>
                            ))}
                          </Select>
                        </FormControl>
                      </ModalBody>

                      <ModalFooter>
                        <Button colorScheme="teal" mr={3} onClick={handleSubmit}>
                          Ajouter
                        </Button>
                        <Button onClick={onClose}>Annuler</Button>
                      </ModalFooter>
                    </ModalContent>
                  </form>
                </Modal>
              </div>
            </div>
            <Divider />
            <div className="player_follow">
              <h3>Je suis suivi par</h3> <span>3 recruteurs:</span>
              <div className="player_follow_pics">
                <Wrap>
                  <WrapItem>
                    <a href="#">
                      <Avatar
                        name="Dan Abrahmov"
                        src="https://bit.ly/dan-abramov"
                      />
                    </a>
                  </WrapItem>
                  <WrapItem>
                    <a href="#">
                      <Avatar
                        name="Kola Tioluwani"
                        src="https://bit.ly/tioluwani-kolawole"
                      />
                    </a>
                  </WrapItem>
                  <WrapItem>
                    <a href="#">
                      <Avatar
                        name="Kent Dodds"
                        src="https://bit.ly/kent-c-dodds"
                      />
                    </a>
                  </WrapItem>
                </Wrap>
              </div>
            </div>
          </div>
          <Center>
            <Divider orientation="vertical" />
          </Center>
          <div className="player_data">
            <Radar data={data} />
          </div>
        </div>
      </BrowserView>

      <MobileView>
        <div className="player_name">
          <h2>Bonjour, {firstName}</h2>
        </div>
        <Center>
          <Divider width="50%" />
        </Center>
        <div className="mobile_player_container">
          <div className="mobile_player_infos">
            <div className="player_match">
              <h3>Prochain match: </h3>
              <span>
                {new Date(match?.date as Date).toLocaleDateString("fr-FR", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
              <div className="mobile_player_match_infos">
                <h3>
                  {match?.home.club_name} - {match?.away.club_name}
                </h3>
                <p>{match?.home.stadium_name}</p>
                <p>
                  {match?.home.adress}, {match?.home.zip_code}{" "}
                  {match?.home.city}
                </p>
                <div className="player_match_button">
                  <Button colorScheme="teal" onClick={onOpen}>
                    Ajouter un match
                  </Button>
                </div>
                <Modal isOpen={isOpen} onClose={onClose}>
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>Ajouter un match</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                    <FormControl isRequired>
                          <FormLabel>Date du match</FormLabel>
                          <Input
                            placeholder="Select Date and Time"
                            size="md"
                            type="date"
                            value={matchValues.date as string}
                            onChange={(e) =>
                              handleChangeField("date")(e.target.value)
                            }
                          />
                        </FormControl>

                        <FormControl mt={4} isRequired>
                          <FormLabel>Equipe à domicile</FormLabel>
                          <Select
                            placeholder="-- équipe à domicile --"
                            value={matchValues.homeTeam}
                            onChange={(e) =>
                              handleChangeField("homeTeam")(e.target.value)
                            }
                          >
                            {teams?.map((team: Team) => (
                              <option key={team.id} value={team.id}>
                                {team.club_name}
                              </option>
                            ))}
                          </Select>
                        </FormControl>
                        <FormControl mt={4} isRequired>
                          <FormLabel>Equipe visiteur</FormLabel>
                          <Select
                            placeholder="-- équipe visiteur --"
                            value={matchValues.awayTeam}
                            onChange={(e) =>
                              handleChangeField("awayTeam")(e.target.value)
                            }
                          >
                            {teams?.map((team: Team) => (
                              <option key={team.id} value={team.id}>
                                {team.club_name}
                              </option>
                            ))}
                          </Select>
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                      <Button onClick={handleSubmit} colorScheme="teal" mr={3}>
                        Ajouter
                      </Button>
                      <Button onClick={onClose}>Annuler</Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>
              </div>
            </div>
            <Divider />
            <div className="player_follow">
              <h3>Je suis suivi par</h3> <span>3 recruteurs:</span>
              <div className="player_follow_pics">
                <Wrap>
                  <WrapItem>
                    <a href="#">
                      <Avatar
                        name="Dan Abrahmov"
                        src="https://bit.ly/dan-abramov"
                      />
                    </a>
                  </WrapItem>
                  <WrapItem>
                    <a href="#">
                      <Avatar
                        name="Kola Tioluwani"
                        src="https://bit.ly/tioluwani-kolawole"
                      />
                    </a>
                  </WrapItem>
                  <WrapItem>
                    <a href="#">
                      <Avatar
                        name="Kent Dodds"
                        src="https://bit.ly/kent-c-dodds"
                      />
                    </a>
                  </WrapItem>
                </Wrap>
              </div>
            </div>
          </div>
          <div className="mobile_player_data">
            <Radar data={data} />
          </div>
        </div>
      </MobileView>
    </>
  );
};

export default Player;
