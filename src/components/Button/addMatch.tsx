import {
  Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import crud from "@/utils/crud";
import { Team, setMatch as setMatchType } from "@/@Types";
import "./addMatch.scss";

function AddMatchButton() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const id : string | null = localStorage.getItem("id");
  const [teams, setTeams] = useState<Team[]>();
  const [matchValues, setMatchValues] = useState<setMatchType>({
    homeTeam: 0,
    awayTeam: 0,
    date: `${new Date().getFullYear()}-${Intl.DateTimeFormat("fr-FR", { month: "2-digit"}).format(new Date())}-${new Date().getDate()}`,
  });

  const addMatch = async () => {
    const response = await crud.post(["player", "match"], [Number.parseInt(id!, 10)], { ...matchValues });
    return response;
  };

  const handleChangeField : (match: "homeTeam" | "awayTeam" | "date") => (value: number | string | Date) => void = (match: "homeTeam" | "awayTeam" | "date") => (value: number | string | Date) => {
    setMatchValues({ ...matchValues, [match]: value });
  };

  const handleSubmit : () => void = async () => {
    const res = await addMatch();
    if (res.status === 201) {
      onClose();
      navigate("/player/match");
    }
  };

  const getAllTeams : () => Promise<void> = async () => {
    const response = await crud.get(["datas", "teams"], []);
    return setTeams(response.data);
  };

  useEffect(() => {
    const fetchData = async () => {
      await getAllTeams();
    };
    fetchData();
  }, []);
  return (
    <>
      <div className="player_match_button">
        <Button colorScheme="teal" onClick={onOpen} mb={2}>
          Ajouter un match
        </Button>
      </div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <form onSubmit={addMatch}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Ajouter un match</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl isRequired>
                <FormLabel>Date du match</FormLabel>
                <Input
                  placeholder="Select Date and Time"
                  size="md"
                  type="date"
                  value={matchValues.date as string}
                  onChange={(e) => handleChangeField("date")(e.target.value)}
                />
              </FormControl>

              <FormControl mt={4} isRequired>
                <FormLabel>Equipe à domicile</FormLabel>
                <Select
                  placeholder="-- équipe à domicile --"
                  value={matchValues.homeTeam}
                  onChange={(e) => handleChangeField("homeTeam")(e.target.value)}
                >
                  {teams?.map((team: Team) => (
                    <option key={team.id} value={team.id}>
                      {team.club_name}
                    </option>
                  ))}
                </Select>
              </FormControl>
              <FormControl mt={4} isRequired>
                <FormLabel>Equipe visiteur</FormLabel>
                <Select
                  placeholder="-- équipe visiteur --"
                  value={matchValues.awayTeam}
                  onChange={(e) => handleChangeField("awayTeam")(e.target.value)}
                >
                  {teams?.map((team: Team) => (
                    <option key={team.id} value={team.id}>
                      {team.club_name}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="teal" mr={3} onClick={handleSubmit}>
                Ajouter
              </Button>
              <Button onClick={onClose}>Annuler</Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  );
}

export default AddMatchButton;
