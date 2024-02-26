import { Avatar, Wrap, WrapItem } from "@chakra-ui/react";
import { ScoutView } from "@/@Types";

const FollowByScouts = ({scouts} : { scouts:ScoutView[]}) => {
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