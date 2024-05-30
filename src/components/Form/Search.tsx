import { PlayerView } from "@/@Types";
import crud from "@/utils/crud";
import { Button } from "@chakra-ui/react";
import React, { ChangeEvent, useState } from "react";
import { FootSelect, GenderSelect, NationalitySelect, PositionSelect } from "../Select";

export function SearchForm({setPlayers} : {setPlayers:React.Dispatch<React.SetStateAction<PlayerView[] | null>>}): JSX.Element {
  const [patchValues, setPatchValues] = useState({  });

  const handleChangeField = (search: "nationality" | "genre" | "strong_foot" | "position") => (value: string | number) => {
    setPatchValues({ ...patchValues, [search]: value });
  };

  const handleSubmit = async () => {
    const responses = await crud.search(["scout", "search"], patchValues);
    setPlayers(responses.data);
    setPatchValues({});
    document.querySelector("form")?.reset();
  };

  return (
    <form onSubmit={handleSubmit}>
      <NationalitySelect
        required={false}
        placeholder={"Sélectionner une nationalité"}
        onChange={(e: ChangeEvent<HTMLSelectElement>) => handleChangeField("nationality")(e.target.value)}
      />    
      <GenderSelect
        required={false}
        placeholder={"Sélectionner un genre"}
        onChange={(e: ChangeEvent<HTMLSelectElement>)=> handleChangeField("genre")(e.target.value)}
        />
      <FootSelect
        required={false}
        placeholder={"Sélectionner un pied fort"}
        onChange={(e : ChangeEvent<HTMLSelectElement>) => handleChangeField("strong_foot")(e.target.value)}
      />
      <PositionSelect
        required={false}
        placeholder={"Sélectionner un poste"}
        onChange={(e : ChangeEvent<HTMLSelectElement>) => handleChangeField("position")(e.target.value)}
      />
      <Button 
        variant="redEvo"
        w="full" 
        onClick={handleSubmit}
      >
        Recherche
      </Button>
  </form>
  );
}