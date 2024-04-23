import {
  Avatar,
  Box,
  Divider,
  Flex,
  Text,
} from "@chakra-ui/react";
import { BrowserView, MobileView } from "react-device-detect";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { getPlayerInfos } from "../../Redux-store/Redux-reducers/player";
import "./PlayerProfil.scss";
import UpdatePlayerProfilButton from "@/components/Button/updatePlayerProfil";
import { PlayerPatch } from "@/@Types";

const PlayerProfil = () => {
  const dispatch = useAppDispatch();
  const id = localStorage.getItem("id");
  const lastName : string = useAppSelector((state) => state.player.lastname);
  const firstName : string = useAppSelector((state) => state.player.firstname);
  const position: string = useAppSelector((state) => state.player.position);
  const email : string = useAppSelector((state) => state.player.email);
  const country: string = useAppSelector((state) => state.player.nationality);
  const foot : string = useAppSelector((state) => state.player.strong_foot);
  const matches: number = useAppSelector(
    (state) => state.player.number_of_matches_played
  );
  const birthday : string | Date = useAppSelector((state) => state.player.birth_date);
  const genre : string = useAppSelector((state) => state.player.genre);
  const height : number = useAppSelector((state) => state.player.height);
  const weight: number = useAppSelector((state) => state.player.weight);
  const count : number = useAppSelector((state) => state.player.count);

  const player : PlayerPatch = { lastname: lastName, firstname: firstName, position, email, nationality: country, strong_foot:foot, height, weight};

  useEffect(() => {
    const fetchData = async () => {
       await dispatch(getPlayerInfos(id));
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  return (
    <>
      <BrowserView>
        <div className="profil_main">
          <div className="profil_title">
            <Flex>
              <Avatar
                size="2xl"
                name={lastName}
                src="https://bit.ly/kent-c-dodds"
              />
              <Box ml="4">
                <div className="profil_title_name">
                  <Text fontWeight="bold" fontSize="2xl">
                    {firstName}
                  </Text>
                  <Text fontWeight="bold" fontSize="2xl">
                    {lastName}
                  </Text>
                </div>
                <div className="profil_title_position">
                  <Text fontSize="xl">{position}</Text>
                </div>
                
              </Box>
            </Flex>
          </div>
          <Divider />
          <div className="profil_container">
            <div className="profil_container_left">
              <div className="profil_container_left_title">
                <h2>Informations générales</h2>
              </div>
              <div className="profil_container_left_infos">
                <p>
                  Prénom : <span>{firstName}</span>
                </p>
                <p>
                  Nom : <span>{lastName}</span>
                </p>
                <p>
                  Email : <span>{email}</span>
                </p>
              </div>
            </div>
            <div className="profil_container_right">
              <div className="profil_container_right_title">
                <h2>Informations de joueur</h2>
              </div>
              <div className="profil_container_right_infos">
                <p>
                  Date de naissance :{" "}
                  <span>
                    {new Date(birthday).toLocaleDateString("fr-FR", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </p>
                <p>
                  Nationnalité : <span>{country}</span>
                </p>
                <p>
                  Genre : <span>{genre}</span>
                </p>
                <p>
                  Taille : <span>{height}</span> cm
                </p>
                <p>
                  Poids : <span>{weight}</span> kg
                </p>
                <p>
                  Pied fort : <span>{foot}</span>
                </p>
                <p>
                  Position : <span>{position}</span>
                </p>
                <p>
                  Nombre de match joué(s) : <span>{matches}</span>
                </p>
              </div>
            </div>
          </div>
          <UpdatePlayerProfilButton player={player}/>
        </div>
      </BrowserView>
      <MobileView>
        <div className="profil_main">
          <div className="mobile_profil_title">
            <Flex>
              <Avatar
                size="2xl"
                name={lastName}
                src="https://bit.ly/kent-c-dodds"
              />
              <Box ml="4">
                <div className="profil_title_name">
                  <Text fontWeight="bold" fontSize="2xl">
                    {firstName}
                  </Text>
                  <Text fontWeight="bold" fontSize="2xl">
                    {lastName}
                  </Text>
                </div>
                <div className="profil_title_position">
                  <Text fontSize="xl">{position}</Text>
                </div>
              </Box>
            </Flex>
          </div>
          <Divider />
          <div className="mobile_profil_container">
            <div className="mobile_profil_container_left">
              <div className="profil_container_left_title">
                <h2>Informations générales</h2>
              </div>
              <div className="profil_container_left_infos">
                <p>
                  Prénom : <span>{firstName}</span>
                </p>
                <p>
                  Nom : <span>{lastName}</span>
                </p>
                <p>
                  Email : <span>{email}</span>
                </p>
              </div>
            </div>
            <div className="profil_container_right">
              <div className="profil_container_right_title">
                <h2>Informations de joueur</h2>
              </div>
              <div className="profil_container_right_infos">
                <p>
                  Date de naissance :{" "}
                  <span>
                    {new Date(birthday).toLocaleDateString("fr-FR", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </p>
                <p>
                  Nationnalité : <span>{country}</span>
                </p>
                <p>
                  Genre : <span>{genre}</span>
                </p>
                <p>
                  Taille : <span>{height}</span> cm
                </p>
                <p>
                  Poids : <span>{weight}</span> kg
                </p>
                <p>
                  Pied fort : <span>{foot}</span>
                </p>
                <p>
                  Position : <span>{position}</span>
                </p>
                <p>
                  Nombre de match joué(s) : <span>{matches}</span>
                </p>
              </div>
            </div>
          </div>
          <UpdatePlayerProfilButton player={player}/>
        </div>
      </MobileView>
    </>
  );
};

export default PlayerProfil;
