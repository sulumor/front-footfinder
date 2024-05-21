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
import { Box } from "@chakra-ui/react";
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
  const getAllStats : () => Promise<void> = async () => {
    const responses = await crud.get(
      ["player", "stats"],
      [user?.id],
    );
    return setStats(responses.data);
  };

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
        label: "statistiques",
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

  useEffect(() => {
    const fetchData = async () => {
      await getAllStats();      
    };
    fetchData();
  }, [user]);

  return (
    <Box w={{base: "100%", md:"40%"}}>
      <Radar data={data} />
    </Box>
  );
}

export default Chart;
