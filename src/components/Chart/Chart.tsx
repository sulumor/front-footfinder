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
import { Stats } from "@/@Types";
import { Text } from "@chakra-ui/react";

function Chart({ position, stats } : { position : string; stats : Stats | undefined }) {  
  ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
  );
    
  const data = position === "Gardien" ? {
    labels:[
      "Arrêts",
      "Jaunes",
      "Rouges",
      "Buts concedés",
    ], 
    datasets: [
      {
        label: "/matchs - saison 2023/2024",
        data: [
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
  }:{
    labels: [
      "Passes",
      "Buts",
      "Jaunes",
      "Rouges",
    ],
    datasets: [
      {
        label:  "/matchs - saison 2023/2024",
        data: [
          stats?.assists,
          stats?.goals_scored,
          stats?.yellow_card,
          stats?.red_card,
        ],
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  return stats?.yellow_card ? (
    <Radar data={data} />
  ) : (
    <Text textStyle="h3" textAlign="center" mt={5}>Pas de statistiques enregistrées pour l'instant</Text>
  );
}

export default Chart;
