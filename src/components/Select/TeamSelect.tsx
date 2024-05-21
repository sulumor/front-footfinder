import { FormControl, FormLabel, Select } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import crud from "@/utils/crud";

interface Team {
  id: number;
  club_name: string;
}

function SelectTeam({ label, placeholder, value, onChange, required }: { label: string; placeholder: string; value: string | number; onChange: React.ChangeEventHandler; required?: boolean }) {
  const [teams, setTeams] = useState([]);

  const getAllTeams = async () => {
    const responses = await crud.get(["datas", "teams"], []);
    return setTeams(responses.data);
  };

  useEffect(() => {
    const fetchData = async () => {
      await getAllTeams();
    };
    fetchData();
  }, []);

  return (
    <FormControl py={4} isRequired = { required }>
      <FormLabel variant="h6">
        {label}
      </FormLabel>
      <Select placeholder={placeholder} value={value} onChange={onChange}>
        {teams?.map((team: Team) => <option key={team.id} value={team.id}>{team.club_name}</option>)}
      </Select>
    </FormControl>
  );
}

export default SelectTeam;
