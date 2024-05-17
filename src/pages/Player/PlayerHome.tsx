import {
  Divider,
  Center,
} from "@chakra-ui/react";
import { isMobile } from "react-device-detect";
import { useEffect, useState } from "react";
import crud from "@/utils/crud";

import "./PlayerHome.scss";

import { ScoutView, Stats } from "@/@Types";
import NextMatch from "@/components/Match/Next";
import Chart from "@/components/Chart/Chart";
import AddMatchButton from "@/components/Button/addMatch";
import FollowByScouts from "@/components/Card/FollowByScouts";

import { useAuth } from "@/context/Auth";

function Player(): JSX.Element {
  const { user } = useAuth();
  const [stats, setStats] = useState<Stats>();

  const getAllStats : () => Promise<void> = async () => {
    const responses = await crud.get(
      ["player", "stats"],
      [Number.parseInt(user.id, 10)],
    );
    return setStats(responses.data);
  };

  useEffect(() => {
    const fetchData = async () => {
      await getAllStats();
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="player_name">
        <h2>
          Bonjour,
          {user.firstname}
        </h2>
      </div>
      <Center>
        <Divider width="50%" />
      </Center>
      {/* <div className={isMobile ? "mobile_player_container" : "player_container"}>
        <div className={isMobile ? "mobile_player_infos" : "player_infos"} >
          <NextMatch/>
          <AddMatchButton/>
          <Divider />
          <FollowByScouts scouts={[]}/>
        </div>
        <Center>
          <Divider orientation={isMobile ? "horizontal": "vertical"} />
        </Center>
        <Chart stats={stats}/>
      </div> */}
    </>
  );
}

export default Player;
