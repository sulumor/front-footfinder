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
import { Box, Heading } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import crud from "@/utils/crud";
import { useAuth } from "@/context/Auth";

function Chart() {
  ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
  );
  const [stats, setStats] = useState<Stats>();
  const { user } = useAuth();
  
  console.log(stats);
  
  const data = user?.position === "Gardien" ? {
    labels:[
      "Arrêts",
      "Cartons jaunes",
      "Cartons rouges",
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
      "Passes décisives",
      "Buts marqués",
      "Cartons jaunes",
      "Cartons rouges",
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
  
  useEffect(() => {
    const getAllStats : () => Promise<void> = async () => {
      const responses = await crud.get(
        ["player", "stats"],
        [user?.id],
      );
      return setStats(responses.data);
    };

    const fetchData = async () => {
      await getAllStats();      
    };

    fetchData();
  }, [user]);

  return (
    <Box w={{base: "100%", md:"40%"}}>
      <Heading as="h2" variant="h2">Vos statistiques avec {user?.teams[0].club_name}</Heading>
      <Radar data={data} />
    </Box>
  );
}

export default Chart;
