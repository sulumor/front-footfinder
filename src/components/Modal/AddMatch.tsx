import {
  Button, Heading, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import crud from "@/utils/crud";
import { setMatch as setMatchType } from "@/@Types";
import { useAuth } from "@/context/Auth";
import { TeamSelect } from "../Select";
import { Modal as ModalType } from "@/@Types/utils";
import { DateInput } from "../Input";
import { formatToCalendar } from "@/utils/functions";

export function AddMatchModal({ isOpen, onClose }: ModalType): JSX.Element {
  const navigate = useNavigate();
  const { user, getUser } = useAuth();
  const userTeam: number = user?.teams[0]?.team_id;
  const [isError, setIsError] = useState<boolean>(false);

  const today = Date.now()
  const [matchValues, setMatchValues] = useState<setMatchType>({
    homeTeam: 0,
    awayTeam: 0,
    date: formatToCalendar(today),
  });

  const handleChangeField = (match: "homeTeam" | "awayTeam" | "date") => (value: number | string | Date): void => {
    setMatchValues({ ...matchValues, [match]: value });
  };


  const handleSubmit: () => void = async () => {
    setIsError(false);
    if (Number.parseInt(matchValues.homeTeam as string, 10) !== userTeam && Number.parseInt(matchValues.awayTeam as string, 10) !== userTeam) return setIsError(true);
    const res = await crud.post(["player", "match"], [], { ...matchValues });
    if (res.status === 201) {
      getUser(user);
      onClose();
      navigate("/player/match");
    }
  };

  const setEnableButton = (): boolean => {
    const home = matchValues.homeTeam !== 0;
    const away = matchValues.awayTeam !== 0;
    return home && away && matchValues.homeTeam !== matchValues.awayTeam;
  };


  console.log(matchValues.date);

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
            <DateInput
              required={true}
              value={matchValues.date}
              label="Date du match"
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleChangeField("date")(e.target.value)}
            />
            <TeamSelect
              required={true}
              label={"Equipe à domicile"}
              placeholder={"-- Équipe à domicile --"}
              value={matchValues.homeTeam}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleChangeField("homeTeam")(e.target.value)}
            />
            <TeamSelect
              required={true}
              label={"Equipe visiteur"}
              placeholder={"-- Équipe visiteur --"}
              value={matchValues.awayTeam}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleChangeField("awayTeam")(e.target.value)}
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