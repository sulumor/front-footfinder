import { Center, Divider, Button } from "@chakra-ui/react";
import { isMobile } from "react-device-detect";
import ScoutFollow from "@/components/Scout/ScoutFollow/ScoutFollow";
import ScoutInfos from "@/components/Scout/ScoutInfos/ScoutInfos";

import "./Scout.scss";

function ScoutHome() {
  return (
    <div className="scout_main">
      <div className="sprofil_main">
        <ScoutInfos />
      </div>
      <Center>
        <Divider width="50%" />
      </Center>
      <div className={isMobile ? "mobile_scout_container" : "scout_container"}>
        <h3>Joueurs suivis</h3>
        <ScoutFollow />

        <div className="scout_main_button">
          <Button variant="solid" colorScheme="teal">
            Voir tous
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ScoutHome;
