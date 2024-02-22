import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BrowserView, MobileView } from "react-device-detect";
import crud from "@/utils/crud";

import "./CreatePlayer.scss";

const CreatePlayer = () => {

    const navigate = useNavigate();

  const [formValues, setFormValues] = useState({
    id: localStorage.getItem("id"),
    email: localStorage.getItem("email"),
    role: localStorage.getItem("role"),
    birth_date: "",
    nationality: "",
    genre: "",
    height: "",
    weight: "",
    strong_foot: "",
    position: "",
  });

  const handleChangeField =
    (
      user:
        | "id"
        | "email"
        | "role"
        | "birth_date"
        | "nationality"
        | "genre"
        | "height"
        | "weight"
        | "strong_foot"
        | "position"
    ) =>
    (value: string | number) => {
      setFormValues({ ...formValues, [user]: value });
    };

  const postPlayerInfos = async () => {
    const response = await crud.post(['register', 'joueur'], [], {...formValues});
    console.log("requete create player terminée");
    console.log(response.data);
    return response.data;
  };

  const handleSubmit = () => {
    postPlayerInfos();
    if (formValues.birth_date.length >= 1) {
        navigate("/player");
    }
  };

  return (
    <>
    <BrowserView>
    <div className="create_main">
      <div className="create_title">
        <h1>Renseignez vos informations</h1>
      </div>
      <div className="create_container">
        <form onSubmit={handleSubmit}>
          <FormControl isRequired>
            <FormLabel>Date de naissance</FormLabel>
            <Input
              placeholder="Select Date and Time"
              size="md"
              type="date"
              value={formValues.birth_date}
              onChange={(e) => handleChangeField("birth_date")(e.target.value)}
            />
          </FormControl>
          <FormControl mt={4} isRequired>
            <FormLabel>Genre</FormLabel>
            <Select
              placeholder="-- choisissez un genre --"
              value={formValues.genre}
              onChange={(e) => handleChangeField("genre")(e.target.value)}
            >
              <option>Homme</option>
              <option>Femme</option>
            </Select>
          </FormControl>
          <FormControl mt={4} isRequired>
            <FormLabel>Nationalité</FormLabel>
            <Select
              placeholder="-- choisissez une nationalité --"
              value={formValues.nationality}
              onChange={(e) => handleChangeField("nationality")(e.target.value)}
            >
              <option>Français</option>
              <option>Brésilien</option>
              <option>Espagnol</option>
              <option>Anglais</option>
              <option>Allemand</option>
              <option>Argentin</option>
              <option>Italien</option>
              <option>Portugais</option>
              <option>Néerlandais</option>
              <option>Belge</option>
              <option>Suédois</option>
            </Select>
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Taille (en cm)</FormLabel>
            <Input
              value={formValues.height}
              onChange={(e) => handleChangeField("height")(e.target.value)}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Poids (en kg)</FormLabel>
            <Input
              value={formValues.weight}
              onChange={(e) => handleChangeField("weight")(e.target.value)}
            />
          </FormControl>
          <FormControl mt={4} isRequired>
            <FormLabel>Pied fort</FormLabel>
            <Select
              placeholder="-- choisissez votre pied fort --"
              value={formValues.strong_foot}
              onChange={(e) => handleChangeField("strong_foot")(e.target.value)}
            >
              <option>droit</option>
              <option>gauche</option>
            </Select>
          </FormControl>
          <FormControl mt={4} isRequired>
            <FormLabel>Position</FormLabel>
            <Select
              placeholder="-- choisissez un poste --"
              value={formValues.position}
              onChange={(e) => handleChangeField("position")(e.target.value)}
            >
              <option>Gardien</option>
              <option>Libéro</option>
              <option>Défenseur gauche</option>
              <option>Défenseur droit</option>
              <option>Milieu défensif gauche</option>
              <option>Milieu défensif droit</option>
              <option>Milieu défensif central</option>
              <option>Milieu gauche</option>
              <option>Milieu droit</option>
              <option>Milieu offensif</option>
              <option>Ailier gauche</option>
              <option>Ailier droit</option>
              <option>Attaquant</option>
              <option>Avant-centre</option>
              <option>Remplaçant</option>
            </Select>
          </FormControl>
        </form>
      </div>
      <div className="create_button">
        <Button colorScheme="teal" onClick={handleSubmit}>Confirmer</Button>
      </div>
    </div>
    </BrowserView>

    <MobileView>
    <div className="mobile_create_main">
      <div className="create_title">
        <h1>Renseignez vos informations</h1>
      </div>
      <div className="create_container">
        <form onSubmit={handleSubmit}>
          <FormControl isRequired>
            <FormLabel>Date de naissance</FormLabel>
            <Input
              size="md"
              type="date"
              value={formValues.birth_date}
              onChange={(e) => handleChangeField("birth_date")(e.target.value)}
            />
          </FormControl>
          <FormControl mt={4} isRequired>
            <FormLabel>Genre</FormLabel>
            <Select
              placeholder="-- genre --"
              value={formValues.genre}
              onChange={(e) => handleChangeField("genre")(e.target.value)}
            >
              <option>Homme</option>
              <option>Femme</option>
            </Select>
          </FormControl>
          <FormControl mt={4} isRequired>
            <FormLabel>Nationalité</FormLabel>
            <Select
              placeholder="-- nationalité --"
              value={formValues.nationality}
              onChange={(e) => handleChangeField("nationality")(e.target.value)}
            >
              <option>Français</option>
              <option>Brésilien</option>
              <option>Espagnol</option>
              <option>Anglais</option>
              <option>Allemand</option>
              <option>Argentin</option>
              <option>Italien</option>
              <option>Portugais</option>
              <option>Néerlandais</option>
              <option>Belge</option>
              <option>Suédois</option>
            </Select>
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Taille (en cm)</FormLabel>
            <Input
              value={formValues.height}
              onChange={(e) => handleChangeField("height")(e.target.value)}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Poids (en kg)</FormLabel>
            <Input
              value={formValues.weight}
              onChange={(e) => handleChangeField("weight")(e.target.value)}
            />
          </FormControl>
          <FormControl mt={4} isRequired>
            <FormLabel>Pied fort</FormLabel>
            <Select
              placeholder="-- pied fort --"
              value={formValues.strong_foot}
              onChange={(e) => handleChangeField("strong_foot")(e.target.value)}
            >
              <option>droit</option>
              <option>gauche</option>
            </Select>
          </FormControl>
          <FormControl mt={4} isRequired>
            <FormLabel>Position</FormLabel>
            <Select
              placeholder="-- poste --"
              value={formValues.position}
              onChange={(e) => handleChangeField("position")(e.target.value)}
            >
              <option>Gardien</option>
              <option>Libéro</option>
              <option>Défenseur gauche</option>
              <option>Défenseur droit</option>
              <option>Milieu défensif gauche</option>
              <option>Milieu défensif droit</option>
              <option>Milieu défensif central</option>
              <option>Milieu gauche</option>
              <option>Milieu droit</option>
              <option>Milieu offensif</option>
              <option>Ailier gauche</option>
              <option>Ailier droit</option>
              <option>Attaquant</option>
              <option>Avant-centre</option>
              <option>Remplaçant</option>
            </Select>
          </FormControl>
        </form>
      </div>
      <div className="create_button">
        <Button colorScheme="teal" onClick={handleSubmit}>Confirmer</Button>
      </div>
    </div>
    </MobileView>
    </>
  );
};

export default CreatePlayer;
