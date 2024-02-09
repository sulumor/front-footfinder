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
  AvatarBadge,
  AvatarGroup,
  Wrap,
  WrapItem,
  Center,
} from "@chakra-ui/react";

import "./Player.scss";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

export const data = {
  labels: [
    "Passes décisives",
    "Buts",
    "Fautes",
    "Cartons jaunes",
    "Cartons rouges",
    "Tacles",
  ],
  datasets: [
    {
      label: "vos statistiques",
      data: [2, 9, 3, 5, 0, 3],
      backgroundColor: "rgba(255, 99, 132, 0.2)",
      borderColor: "rgba(255, 99, 132, 1)",
      borderWidth: 1,
    },
  ],
};

const Player = () => {
  return (
    <>
      <div className="player_name">
        <h2>Bonjour, Jean Dupont</h2>
      </div>
      <Center>
        <Divider width="50%" />
      </Center>
      <div className="player_container">
        <div className="player_infos">
          <div className="player_match">
            <h3>Prochain match: </h3>
            <span>Samedi 12 Janvier 2024</span>
            <div className="player_match_infos">
              <h3>RC Lens - Paris Saint Germain</h3>
              <p>Stade Bollaert-Delelis</p>
              <p>Av. Alfred Meas, 62300 Lens</p>
              <div className="player_match_button">
                <Button colorScheme="teal">Modifier</Button>
              </div>
            </div>
          </div>
          <Divider />
          <div className="player_follow">
            <h3>Je suis suivi par</h3> <span>3 recruteurs:</span>
            <div className="player_follow_pics">
              <Wrap>
                <WrapItem>
                  <Avatar
                    name="Dan Abrahmov"
                    src="https://bit.ly/dan-abramov"
                  />
                </WrapItem>
                <WrapItem>
                  <Avatar
                    name="Kola Tioluwani"
                    src="https://bit.ly/tioluwani-kolawole"
                  />
                </WrapItem>
                <WrapItem>
                  <Avatar name="Kent Dodds" src="https://bit.ly/kent-c-dodds" />
                </WrapItem>
              </Wrap>
            </div>
          </div>
        </div>
        <Center height="60%">
          <Divider orientation="vertical" />
        </Center>
        <div className="player_data">
          <Radar data={data} />
        </div>
      </div>
    </>
  );
};

export default Player;
