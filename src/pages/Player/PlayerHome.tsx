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
import { useAppDispatch, useAppSelector } from "@/components/hooks/redux";
import { getPlayerInfos } from "@/components/store/reducers/player";


const Player = () => {
  const dispatch = useAppDispatch();
  const id : string | null = localStorage.getItem("id");
  const firstName : string = useAppSelector((state) => state.player.firstname);
  const scouts : ScoutView[] = useAppSelector((state) => state.player.scouts);
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
      await dispatch(getPlayerInfos());
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
          <FollowByScouts scouts={scouts}/>
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
