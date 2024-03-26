import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../store/reducers/user";
import "./CreateScout.scss";
import crud from "@/utils/crud";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import axios from "axios";

const CreateScout = () => {
  const [teams, setTeams] = useState([]);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const pwd : string = useAppSelector((state) => state.user.pwd);
  const [formValues, setFormValues] = useState({
    id: localStorage.getItem("id"),
    email: localStorage.getItem("email"),
    role: localStorage.getItem("role"),
    club: "",
    city: "",
  });

  const handleChangeField =
    (user: "id" | "email" | "role" | "club" | "city") =>
    (value: string | number) => {
      setFormValues({ ...formValues, [user]: value });
    };

  const postPlayerInfos = async () => {
    const response = await axios.post("http://localhost:3000/register/recruteur", {...formValues});
    const formV : {email:string;password:string;role:string} = {
      "email": response.data.person.email,
      "password": pwd,
      "role": response.data.person.role
    };
    await dispatch(login(formV))
    return response.data;
  };

  const handleSubmit = () => {
    postPlayerInfos();
    if (formValues.city.length > 1) {
      navigate("/scout");
    }
  };

  interface Team {
    id: number;
    club_name: string;
  }

  const getAllTeams = async () => {
    const response = await crud.get(['datas', 'teams'], []);
    return setTeams(response.data);
  };

  useEffect(() => {
    const fetchData = async () => {
      await getAllTeams();
    };
    fetchData();
  }, []);

  return (
    <div className="create_main">
      <div className="create_title">
        <h1>Renseignez vos informations</h1>
      </div>
      <div className="create_container">
        <form onSubmit={handleSubmit}>
          <FormControl mt={4} isRequired>
            <FormLabel>Votre club</FormLabel>
            <Select placeholder="-- votre club --" value={formValues.club}
              onChange={(e) => handleChangeField("club")(e.target.value)}>
              {teams?.map((team: Team) => (
                <option key={team.id} value={team.club_name}>{team.club_name}</option>
              ))}
            </Select>
          </FormControl>
          
          <FormControl isRequired>
            <FormLabel>Votre ville</FormLabel>
            <Input
              value={formValues.city}
              onChange={(e) => handleChangeField("city")(e.target.value)}
            />
          </FormControl>
          
        </form>
      </div>
      <div className="create_button">
        <Button colorScheme="teal" onClick={handleSubmit}>
          Valider
        </Button>
      </div>
    </div>
  );
};

export default CreateScout;
