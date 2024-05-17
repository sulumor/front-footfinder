import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { isMobile } from "react-device-detect";
import "./CreatePlayer.scss";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { login } from "../../redux/Redux-reducers/user";

function SigninPlayer() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const pwd : string = useAppSelector((state) => state.user.pwd);
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

  const handleChangeField = (
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
  ) => (value: string | number) => {
    setFormValues({ ...formValues, [user]: value });
  };

  const postPlayerInfos = async () => {
    const response = await axios.post("http://localhost:3000/register/joueur", { ...formValues });

    const formV : { email:string;password:string;role:string } = {
      email: response.data.person.email,
      password: pwd,
      role: response.data.person.role,
    };
    await dispatch(login(formV));
    return response;
  };

  const handleSubmit = async () => {
    const res = await postPlayerInfos();
    if (res.status === 201) {
      navigate("/player");
    }
  };

  return (
    <div className={isMobile ? "mobile_create_main" : "create_main"}>
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
              placeholder={isMobile ? "-- genre" : "-- choisissez un genre --"}
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
              placeholder={isMobile ? "-- nationalité --" : "-- choisissez une nationalité --"}
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
              placeholder={isMobile ? "-- pied fort --" : "-- choisissez votre pied fort --"}
              value={formValues.strong_foot}
              onChange={(e) => handleChangeField("strong_foot")(e.target.value)}
            >
              <option>Droit</option>
              <option>Gauche</option>
            </Select>
          </FormControl>
          <FormControl mt={4} isRequired>
            <FormLabel>Position</FormLabel>
            <Select
              placeholder={isMobile ? "-- poste --" : "-- choisissez un poste --"}
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
  );
}

export default SigninPlayer;
