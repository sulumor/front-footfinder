import {
  Button, FormControl, FormLabel, Heading, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay,
} from "@chakra-ui/react";
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import crud from "@/utils/crud";
import { setMatch as setMatchType } from "@/@Types";
import { useAuth } from "@/context/Auth";
import SelectTeam from "../Select/TeamSelect";

export function AddMatchModal ({isOpen, onClose} : {isOpen:boolean; onClose:()=>void}) : JSX.Element {
  const navigate = useNavigate();
  const {user} = useAuth();
  const [matchValues, setMatchValues] = useState<setMatchType>({
    homeTeam: 0,
    awayTeam: 0,
    date: `${new Date().getFullYear()}-${Intl.DateTimeFormat("fr-FR", { month: "2-digit"}).format(new Date())}-${new Date().getDate()}`,
  });
  
  const handleChangeField  = (match: "homeTeam" | "awayTeam" | "date") => (value: number | string | Date) : void => {
    setMatchValues({ ...matchValues, [match]: value });
  };

  
  const handleSubmit : () => void = async () => {
    const res = await addMatch();
    if (res.status === 201) {
      onClose();
      navigate("/player/match");
    }
  };

  const addMatch = async () => {
    const response = await crud.post(["player", "match"], [user?.id], { ...matchValues });
    return response;
  };

  const setEnableButton = () : boolean => {
    const home = matchValues.homeTeam !== 0;
    const away = matchValues.awayTeam !== 0;
    return home && away;
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
        <form onSubmit={addMatch}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              <Heading as="h2" variant="h2">
                Ajouter un match
              </Heading>
            <ModalCloseButton />
            </ModalHeader>
            <ModalBody pb={6}>
              <FormControl py={4} isRequired>
                <FormLabel variant="h6">Date du match</FormLabel>
                <Input
                  placeholder="Select Date and Time"
                  size="md"
                  type="date"
                  value={matchValues.date as string}
                  onChange={(e) => handleChangeField("date")(e.target.value)}
                />
              </FormControl>
              <SelectTeam
                required={true} 
                label={"Equipe à domicile"} 
                placeholder={"-- Équipe à domicile --"} 
                value={matchValues.homeTeam}
                onChange={(e : ChangeEvent<HTMLInputElement>) => handleChangeField("homeTeam")(e.target.value)}
              />
              <SelectTeam 
                required={true}
                label={"Equipe visiteur"}
                placeholder = {"-- Équipe visiteur --" }
                value={matchValues.awayTeam}
                onChange={(e : ChangeEvent<HTMLInputElement>) => handleChangeField("awayTeam")(e.target.value)}
                />
            </ModalBody>
            <ModalFooter gap={5}>
              <Button variant="redEvo" onClick={handleSubmit} isDisabled={!setEnableButton()}>
                Ajouter
              </Button>
              <Button variant="inverse" onClick={onClose}>Annuler</Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
  )
}