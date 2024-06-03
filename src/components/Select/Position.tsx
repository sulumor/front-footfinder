import { FormControl, FormErrorMessage, FormLabel, Select } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import crud from "@/utils/crud";
import { Form } from "@/@Types/utils";

interface Position {
  id: number;
  label: string;
}

export function PositionSelect({ value, onChange, required, placeholder="-- Votre position --" }: Form) {
  const [positions, setPositions] = useState([]);
  const isError : boolean = required && value === "";
  
  const getAllPositions = async () => {
    const responses = await crud.get(["datas", "positions"], []);
    return setPositions(responses.data);
  };

  useEffect(() => {
    const fetchData = async () : Promise<void> => {
      await getAllPositions();
    };
    fetchData();
  }, []);

  return (
    <FormControl py={4} isRequired = { required } isInvalid={isError}>
      <FormLabel variant="h6">
        Position
      </FormLabel>
      <Select placeholder={placeholder} value={value} onChange={onChange}>
        {positions?.map((position: Position) => 
          <option key={position.id} value={position.label}>
            {position.label}
          </option>
        )}
      </Select>
      <FormErrorMessage>La position est requise</FormErrorMessage>
    </FormControl>
  );
}