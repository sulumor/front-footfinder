import {
  Divider,
  Center,
} from "@chakra-ui/react";
import { isMobile } from "react-device-detect";
import { useEffect, useState } from "react";
import crud from "@/utils/crud";

import "./PlayerHome.scss";

import { Stats } from "@/@Types";
import NextMatch from "@/components/Match/Next";
import Chart from "@/components/Chart/Chart";
import AddMatchButton from "@/components/Button/addMatch";
import FollowByScouts from "@/components/Card/FollowByScouts";
import { useAppSelector } from "@/components/hooks/redux";


const Player = () => {
  const id : string | null = localStorage.getItem("id");
  const firstName : string = useAppSelector((state) => state.player.firstname);
  const [stats, setStats] = useState<Stats>();


  const getAllStats : () => Promise<void> = async () => {
    const responses = await crud.get(
      ["player", "stats"],
      [Number.parseInt(id!, 10)]
    );
    return setStats(responses.data);
  };

  useEffect(() => {
    const fetchData = async () => {
      await getAllStats();
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  return (
    <>
      <div className="player_name">
        <h2>Bonjour, {firstName}</h2>
      </div>
      <Center>
        <Divider width="50%" />
      </Center>
      <div className={isMobile ? "mobile_player_container" : "player_container"}>
        <div className={isMobile ? "mobile_player_infos" : "player_infos"} >
          <NextMatch/>
          <AddMatchButton/>
          <Divider />
          <FollowByScouts/>
        </div>
        <Center>
          <Divider orientation={isMobile ? "horizontal": "vertical"} />
        </Center>
        <Chart stats={stats}/>
      </div>
    </>
  );
};

export default Player;
