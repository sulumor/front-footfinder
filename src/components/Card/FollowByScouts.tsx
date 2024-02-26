import { Avatar, Wrap, WrapItem } from "@chakra-ui/react";
import { ScoutView } from "@/@Types";
import { isMobile } from "react-device-detect";

const FollowByScouts = ({scouts} : { scouts:ScoutView[]}) => {
  return (
    <div className={isMobile ? "mobile_player_follow" : "player_follow"}>
      <h3>Suivi par</h3> <span>{scouts?.length} recruteurs:</span>
      <div>
        <Wrap>
          <WrapItem >
            {scouts?.map((scout)=> {
              return (
                <Avatar
                  key={scout?.id}
                  name={`${scout?.firstname} ${scout?.lastname}`}
                  src={scout?.avatar}
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