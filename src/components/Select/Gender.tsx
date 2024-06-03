import { Form } from "@/@Types/utils";
import crud from "@/utils/crud";
import { FormControl, FormLabel, Select, FormErrorMessage } from "@chakra-ui/react";
import { useEffect, useState } from "react";

interface Gender {
  id: number;
  label: string;
}

export function GenderSelect({ value, onChange, required, placeholder = "-- Votre genre --" }: Form):JSX.Element{
  const [genders, setGenders] = useState([]);
  const isError : boolean = required && value === "";

  const getAllGenders = async () => {
    const responses = await crud.get(["datas", "genders"], []);
    return setGenders(responses.data);
  };
  
  useEffect(() => {
    const fetchData = async () => {
      await getAllGenders();
    };
    fetchData();
  }, []);
  
  return (
    <FormControl py={4} isRequired = { required } isInvalid={isError}>
      <FormLabel variant="h6">
        Genre
      </FormLabel>
      <Select placeholder={placeholder} value={value} onChange={onChange}>
        {genders?.map((gender : Gender) => (
          <option key={gender.id} value={gender.label}>{gender.label}</option>
        ))}
      </Select>
      <FormErrorMessage>Le genre est requis</FormErrorMessage>
    </FormControl>
  );
}