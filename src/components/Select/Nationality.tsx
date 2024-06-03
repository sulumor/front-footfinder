import { Form } from "@/@Types/utils";
import crud from "@/utils/crud";
import { FormControl, FormErrorMessage, FormLabel, Select } from "@chakra-ui/react";
import { useState, useEffect } from "react";

interface Nationality {
  id: number;
  label: string;
}

export function NationalitySelect({ value, onChange, required, placeholder="-- Votre nationalité --" }: Form) {
  const [nationalities, setNationalities] = useState([]);
  const isError : boolean = required && value === "";

  const getAllNationalities = async () => {
    const responses = await crud.get(["datas", "nationalities"], []);
    return setNationalities(responses.data);
  };
  
  useEffect(() => {
    const fetchData = async () => {
      await getAllNationalities();
    };
    fetchData();
  }, []);
  
  return (
    <FormControl py={4} isRequired = { required } isInvalid={isError}>
      <FormLabel variant="h6">
        Nationalité
      </FormLabel>
      <Select placeholder={placeholder} value={value} onChange={onChange}>
        {nationalities.map((nationality:Nationality) => (
          <option key={nationality.id} value={nationality.label}>{nationality.label}</option>
        ))}
      </Select>
      <FormErrorMessage>La nationalité est requise</FormErrorMessage>
    </FormControl>
  );
}