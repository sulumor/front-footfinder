import { Avatar, Wrap, WrapItem } from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { ScoutView } from "@/@Types";
import { useEffect } from "react";
import { getPlayerInfos } from "../store/reducers/player";

const FollowByScouts = () => {

  const dispatch = useAppDispatch();
  const id : string | null = localStorage.getItem("id");

  const scouts : ScoutView[] = useAppSelector((state) => state.player.scouts);
  
  useEffect(()=> {
    const fetchData = async () => {
      await dispatch(getPlayerInfos(id));
    };
    fetchData();
  })
  return (
    <div className="player_follow">
      <h3>Je suis suivi par</h3> <span>{scouts.length} recruteurs:</span>
      <div>
        <Wrap>
          <WrapItem >
            {scouts.map((scout)=> {
              return (
                <Avatar
                  key={scout.id}
                  name={`${scout.firstname} ${scout.lastname}`}
                  src={scout.avatar}
                  m={1}
                />
              )
            })}
          </WrapItem>
        </Wrap>
      </div>
    </div>
  );
}

export default FollowByScouts;