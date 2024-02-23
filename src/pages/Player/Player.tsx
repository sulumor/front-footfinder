import {
  Divider,
  Avatar,
  Wrap,
  WrapItem,
  Center,
} from "@chakra-ui/react";
import { BrowserView, MobileView } from "react-device-detect";
import { useEffect, useState } from "react";
import crud from "@/utils/crud";

import "./Player.scss";

import { Stats } from "@/@Types";
import NextMatch from "@/components/Match/Next";
import Chart from "@/components/Chart/Chart";


const Player = () => {
  const id : string | null = localStorage.getItem("id");
  const firstName : string | null = localStorage.getItem("firstname");
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
  }, []);

  
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
            <NextMatch/>
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
          <Chart stats={stats}/>
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
            <NextMatch/> 
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
          <Chart stats={stats}/>
        </div>
      </MobileView>
    </>
  );
};

export default Player;
