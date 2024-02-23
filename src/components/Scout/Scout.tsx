import { Center, Divider, Button } from "@chakra-ui/react";
import { BrowserView, MobileView } from "react-device-detect";
import ScoutFollow from "./ScoutFollow/ScoutFollow";
import ScoutInfos from "./ScoutInfos/ScoutInfos";

import "./Scout.scss";


const Scout = () => {
  return (
    <>
      <BrowserView>
        <div className="scout_main">
          <div className="sprofil_main">
            <ScoutInfos />
          </div>
          <Center>
            <Divider width="50%" />
          </Center>
          <div className="scout_container">
            <h3>Joueurs suivis</h3>
            <ScoutFollow />

            <div className="scout_main_button">
              <Button variant="solid" colorScheme="teal">
                Voir tous
              </Button>
            </div>
          </div>
        </div>
      </BrowserView>
      <MobileView>
        <div className="scout_main">
          <div className="sprofil_main">
            <ScoutInfos />
          </div>
          <Center>
            <Divider width="50%" />
          </Center>
          <div className="mobile_scout_container">
            <h3>Joueurs suivis</h3>
            <ScoutFollow />

            <div className="scout_main_button">
              <Button variant="solid" colorScheme="teal">
                Voir tous
              </Button>
            </div>
          </div>
        </div>
      </MobileView>
    </>
  );
};

export default Scout;
