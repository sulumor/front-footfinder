import { FormControl, FormErrorMessage, FormLabel, Select } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Form } from "@/@Types/utils";
import crud from "@/utils/crud";

interface Team {
  team_id: number;
  club_name: string;
}

export function TeamSelect({ label, placeholder = "-- Votre équipe --", value, onChange, required }: Form) {
  const [teams, setTeams] = useState([]);
  const isError: boolean = required && value === "";

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
    <FormControl py={4} isRequired={required} isInvalid={isError}>
      <FormLabel variant="h6">
        {label}
      </FormLabel>
      <Select placeholder={placeholder} value={value} onChange={onChange}>
        {teams?.map((team: Team) =>
          <option key={team.team_id} value={team.team_id}>{team.club_name}</option>
        )}
      </Select>
      <FormErrorMessage>L'équipe est requise</FormErrorMessage>
    </FormControl>
  );
}
