import { FormControl, FormLabel, Select } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";

interface Team {
  id:number;
  club_name:string;
}


const SelectTeam = ({label}:{label:string}) => {
  const [teams, setTeams] = useState([]);

  const getAllTeams = async () => {
    const responses = await axios.get(`http://localhost:3000/datas/teams`);
    return setTeams(responses.data);
  }

  useEffect(()=> {
    const fetchData = async () => {
      await getAllTeams();
    };
    fetchData();
  }, []);

  console.log(teams);
  
  return (
    <FormControl mt={4}>
      <FormLabel>{label}</FormLabel>
      <Select placeholder=" Sélectionner une équipe">
        {teams?.map((team:Team) => 
          <option value={team.id}>{team.club_name}</option>
        )}
      </Select>
    </FormControl>
  )
};

export default SelectTeam;