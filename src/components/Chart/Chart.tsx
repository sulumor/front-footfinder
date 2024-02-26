import { Stats } from "@/@Types";
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
import { isMobile } from "react-device-detect";


const Chart = ( {stats} : {stats: Stats | undefined}) => {

  ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
    );

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

    return (
      <div className={ isMobile ? "player_data_mobile": "player_data"}>
        <Radar data={data} />
      </div>
    );
 }

export default Chart;