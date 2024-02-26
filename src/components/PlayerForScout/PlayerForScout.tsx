import {
  Divider,
  Button,
  Avatar,
  Wrap,
  WrapItem,
  Center,
} from "@chakra-ui/react";
import { BrowserView, MobileView } from "react-device-detect";

import Chart from "@/components/Chart/Chart";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import crud from "@/utils/crud";
import { Stats, Match, PlayerView } from "@/@Types"; 

import "../../pages/Player/PlayerHome.scss";
import "./PlayerForScout.scss";


const PlayerForScout = () => {
  const [infos, setInfos] = useState<PlayerView>();
  const [stats, setStats] = useState<Stats>();
  const [match, setMatch] = useState<Match>();
  const scoutId = localStorage.getItem("id");
  const { id } = useParams();

  const getAllStats = async () => {
    const responses = await crud.get(['scout', 'player', 'stats'], [Number.parseInt(scoutId!, 10), Number.parseInt(id!, 10)]);   
    console.log(responses.data);
    return setStats(responses.data);
  };
  
  const getNextMatch = async () => {
    const responses = await crud.get(['scout', 'player', 'match'], [Number.parseInt(scoutId!, 10), Number.parseInt(id!, 10)]);
    const today = Date.now();
    const nextMatch = responses.data.filter(
      (match: { date: string | number | Date }) =>
        new Date(match.date).getTime() > today
    );
    return setMatch(nextMatch[0]);
  };

  const getPlayerInfos = async () => {
    const responses = await crud.get(['scout', 'player'], [Number.parseInt(scoutId!, 10), Number.parseInt(id!, 10)]);
    console.log(responses.data);
    return setInfos(responses.data);
  };

  const addPlayerFollow = async () => {
    const responses = await crud.post(['scout', 'player'], [Number.parseInt(scoutId!, 10), Number.parseInt(id!, 10)], {});
    console.log(responses.data);
    return responses.data;
  };

  useEffect(() => {
    const fetchData = async () => {
      await getPlayerInfos();
      await getAllStats();
      await getNextMatch();
    };

    fetchData();
  }, []);

  console.log(infos)

  return (
    <>
      <BrowserView>
        <div className="player_name">
          <h2>
            Page de {infos?.firstname} {infos?.lastname}
          </h2>
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
                  {match?.home.club_name}- {match?.away.club_name}
                </h3>
                <p>{match?.home.stadium_name}</p>
                <p>
                  {match?.home.adress}, {match?.home.zip_code}{" "}
                  {match?.home.city}
                </p>
              </div>
            </div>
            <Divider />
            <div className="player_follow">
              <h3>{infos?.firstname} {infos?.lastname} est suivi par</h3> <span>3 recruteurs:</span>
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
            <Chart stats={stats} />
          </div>
        </div>
        <div className="player_infos_footer">
          <div className="player_infos_footer_title">
            <h2>
              Informations sur {infos?.firstname} {infos?.lastname}
            </h2>
          </div>
          <div className="player_infos_footer_content">
            <p>Né le: {new Date(infos?.birth_date as unknown as Date).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric'})}</p>
            <p>Genre: {infos?.genre}</p>
            <p>Taille: {infos?.height} cm</p>
            <p>Poids: {infos?.weight} kg</p>
            <p>Poste: {infos?.position}</p>
            <p>Pied fort: {infos?.strong_foot}</p>
            <p>Nationalité: {infos?.nationality}</p>
          </div>
          <div className="player_add_button">
          <Button colorScheme="teal" onClick={addPlayerFollow}>Suivre le joueur</Button>
          </div>
        </div>
      </BrowserView>

      <MobileView>
        <div className="player_name">
          <h2>
            Page de {infos?.firstname} {infos?.lastname}
          </h2>
        </div>
        <Center>
          <Divider width="50%" />
        </Center>
        <div className="mobile_player_container">
          <div className="player_infos">
            <div className="player_match">
              <h3>Prochain match: </h3>
              <span>{new Date(match?.date as Date).toLocaleDateString("fr-FR", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}</span>
              <div className="player_match_infos">
                <h3>
                  {match?.home.club_name}- {match?.away.club_name}
                </h3>
                <p>{match?.home.stadium_name}</p>
                <p>
                  {match?.home.adress}, {match?.home.zip_code}{" "}
                  {match?.home.city}
                </p>
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
            <Chart stats={stats} />
          </div>
        </div>
      </MobileView>
    </>
  );
};

export default PlayerForScout;
