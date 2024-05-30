import {
  Button, FormControl, FormLabel, Heading, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import crud from "@/utils/crud";
import { setMatch as setMatchType } from "@/@Types";
import { useAuth } from "@/context/Auth";
import { TeamSelect } from "../Select";
import { Modal as ModalType } from "@/@Types/utils";

export function AddMatchModal ({isOpen, onClose} : ModalType) : JSX.Element {
  const navigate = useNavigate();
  const { user, getUser } = useAuth();
  const userTeam: number = user?.teams[0]?.team_id;
  const [isError, setIsError] = useState<boolean>(false);
  
  const [matchValues, setMatchValues] = useState<setMatchType>({
    homeTeam: 0,
    awayTeam: 0,
    date: `${new Date().getFullYear()}-${Intl.DateTimeFormat("fr-FR", { month: "2-digit"}).format(new Date())}-${new Date().getDate()}`,
  });
  
  const handleChangeField  = (match: "homeTeam" | "awayTeam" | "date") => (value: number | string | Date) : void => {
    setMatchValues({ ...matchValues, [match]: value });
  };

  
  const handleSubmit : () => void = async () => {
    setIsError(false);
    if(Number.parseInt(matchValues.homeTeam as string, 10) !== userTeam && Number.parseInt(matchValues.awayTeam as string, 10)!== userTeam) return setIsError(true);
    const res = await crud.post(["player", "match"], [user?.id], { ...matchValues });
    if (res.status === 201) {
      getUser(user);
      onClose();
      navigate("/player/match");
    }
  };

  const setEnableButton = () : boolean => {
    const home = matchValues.homeTeam !== 0;
    const away = matchValues.awayTeam !== 0;
    return home && away;
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
        <form onSubmit={handleSubmit}>
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
              <TeamSelect
                required={true} 
                label={"Equipe à domicile"} 
                placeholder={"-- Équipe à domicile --"} 
                value={matchValues.homeTeam}
                onChange={(e : ChangeEvent<HTMLInputElement>) => handleChangeField("homeTeam")(e.target.value)}
              />
              <TeamSelect 
                required={true}
                label={"Equipe visiteur"}
                placeholder = {"-- Équipe visiteur --" }
                value={matchValues.awayTeam}
                onChange={(e : ChangeEvent<HTMLInputElement>) => handleChangeField("awayTeam")(e.target.value)}
                />
                {
                  isError &&
                (<Text textStyle="errorForm">Une des équipes doit être celle où vous jouez</Text>)
                }
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
  );
}