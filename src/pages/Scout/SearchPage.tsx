import {
  Select,
  Button,
} from "@chakra-ui/react";
import { isMobile } from "react-device-detect";
import { useEffect, useState } from "react";

import "./SearchPlayer.scss";
import { Player } from "@/@Types";
import SearchResults from "@/components/Form/SearchResults/SearchResults";
import crud from "@/utils/crud";


const SearchPage = () => {
  const [patchValues, setPatchValues] = useState({});
  const [players, setPlayers] = useState<Player[]>([]);

  const handleChangeField =
    (search: "nationality" | "genre" | "strong_foot" | "position") =>
    (value: string | number) => {
      setPatchValues({ ...patchValues, [search]: value });
    };

  const handleSubmit = async () => {

    const responses = await crud.search(["scout", "search"], patchValues);
    
    setPlayers(responses.data);
  };

  useEffect(() => {
    setPatchValues({});
    document.querySelector("form")?.reset();
  }, [players]);

  return (

        <div className="search_player_main">
          <div className="search_player_title">
            <h2>Recherche d'un joueur</h2>
          </div>
          <div className="search_player_container">
            <div className={isMobile ? "mobile_search_player_form" : "search_player_form"}>
              <form onSubmit={handleSubmit}>
                <Select
                  placeholder={isMobile ? "-- nationalité --" : "Sélectionner une nationalité"}
                  onChange={(e) =>
                    handleChangeField("nationality")(e.target.value)
                  }
                >
                  <option value="Français">Français</option>
                  <option value="Brésilien">Brésilien</option>
                  <option value="Espagnol">Espagnol</option>
                  <option value="Anglais">Anglais</option>
                  <option value="Allemand">Allemand</option>
                  <option value="Argentin">Argentin</option>
                  <option value="Italien">Italien</option>
                  <option value="Portugais">Portugais</option>
                  <option value="Néerlandais">Néerlandais</option>
                  <option value="Belge">Belge</option>
                  <option value="Suédois">Suédois</option>
                </Select>
                <Select
                  placeholder={isMobile ? "-- genre --" : "Sélectionner un genre"}
                  onChange={(e) => handleChangeField("genre")(e.target.value)}
                >
                  <option value="Homme">Homme</option>
                  <option value="Femme">Femme</option>
                </Select>
                <Select
                  placeholder={isMobile ? "-- pied fort --" : "Sélectionner un pied fort"}
                  onChange={(e) =>
                    handleChangeField("strong_foot")(e.target.value)
                  }
                >
                  <option value="Droit">Droit</option>
                  <option value="Gauche">Gauche</option>
                </Select>
                <Select
                  placeholder={isMobile ? "-- poste --" : "Sélectionner un poste"}
                  onChange={(e) =>
                    handleChangeField("position")(e.target.value)
                  }
                >
                  <option value="Gardien">Gardien</option>
                  <option value="Libéro">Libéro</option>
                  <option value="Défenseur gauche">Défenseur gauche</option>
                  <option value="Défenseur droit">Défenseur droit</option>
                  <option value="Milieu défensif gauche">
                    Milieu défensif gauche
                  </option>
                  <option value="Milieu défensif droit">
                    Milieu défensif droit
                  </option>
                  <option value="Milieu défensif central">
                    Milieu défensif central
                  </option>
                  <option value="Milieu gauche">Milieu gauche</option>
                  <option value="Milieu droit">Milieu droit</option>
                  <option value="Milieu offensif">Milieu offensif</option>
                  <option value="Ailier gauche">Ailier gauche</option>
                  <option value="Ailier droit">Ailier droit</option>
                  <option value="Attaquant">Attaquant</option>
                  <option value="Avant-centre">Avant-centre</option>
                  <option value="Remplaçant">Remplaçant</option>
                </Select>
                <Button onClick={handleSubmit}>Recherche</Button>
              </form>
            </div>
            <SearchResults players={players}/>
          </div>
        </div>
  );
};

export default SearchPage;
