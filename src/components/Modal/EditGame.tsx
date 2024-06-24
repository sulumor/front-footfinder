import { Match } from "@/@Types";
import { useAuth } from "@/context/Auth";
import crud from "@/utils/crud";
import { formatDate } from "@/utils/dateFunctions";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/modal";
import { Divider, Flex, Spacer, Button, Heading, Text } from "@chakra-ui/react";
import { NumberInput } from "../Input";
import { ChangeEvent, useState } from "react";
import { FitnessSelect } from "../Select";

export function EditGameModal({ isOpen, onClose, game }: { isOpen: boolean; onClose: () => void; game: Match }): JSX.Element {
  const { user, getUser } = useAuth();
  const score = game.score.split("");
  const [patchValues, setPatchValues] = useState({
    score: game?.score,
    scoreHome: score[0],
    scoreAway: score[2],
    minutes_played: game?.minutes_played,
    fitness: game?.fitness,
    yellow_card: game?.yellow_card,
    red_card: game?.red_card,
    assists: game?.assists,
    goals_scored: game?.goals_scored,
    goals_conceded: game?.goals_conceded,
    stops: game?.stops,
  });
  const handleChangeField = (
    match:
      | "scoreHome"
      | "scoreAway"
      | "assists"
      | "goals_scored"
      | "minutes_played"
      | "fitness"
      | "yellow_card"
      | "red_card"
      | "goals_conceded"
      | "stops"
  ) => (value: string | number) => {
    setPatchValues({ ...patchValues, [match]: value });
  };
  const handleSubmit = () => {
    updateMatchStats();
  };

  const updateMatchStats = async () => {
    patchValues.score = `${patchValues.scoreHome}-${patchValues.scoreAway}`;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { scoreHome: score_home, scoreAway: score_away, ...data } = patchValues;
    const responses = await crud.update(
      ["player/match"],
      [game?.match_id],
      { ...data },
    );
    if (responses.status === 200) {
      getUser(user);
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Heading as="h2" variant="h2">
              {game.score === "-" ? "Ajouter mes statistiques" : "Modifier mes statistiques"}
            </Heading>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Text textStyle="secondTitle" align="center">{formatDate(game?.date)}</Text>
            <Divider m={2} />
            <Flex gap={2}>
              <NumberInput
                label={game?.home.club_name}
                value={patchValues.scoreHome}
                onChange={(e: string | number) => handleChangeField("scoreHome")(e)}
                required={true}
              />
              <NumberInput
                label={game?.away.club_name}
                value={patchValues.scoreAway}
                onChange={(e: string | number) => handleChangeField("scoreAway")(e)}
                required={true}
              />
            </Flex>
            <Flex gap={2} mt={1}>
              <FitnessSelect
                value={patchValues.fitness}
                onChange={(e: ChangeEvent<HTMLSelectElement>) => handleChangeField("fitness")(e.target.value)}
                required={true}
              />

              <Spacer />
              <NumberInput
                label={"Minutes jouées"}
                step={5}
                value={patchValues.minutes_played}
                onChange={(e: string | number) => handleChangeField("minutes_played")(e)}
                required={true}
              />
            </Flex>
            <Flex gap={2} mt={1}>
              <NumberInput
                label={"Carton jaune"}
                value={patchValues.yellow_card}
                max={2}
                onChange={(e: string | number) => handleChangeField("yellow_card")(e)}
                required={true}
              />
              <NumberInput
                label={"Carton rouge"}
                value={patchValues.red_card}
                max={1}
                onChange={(e: string | number) => handleChangeField("red_card")(e)}
                required={true}
              />
            </Flex>
            {user?.position === "Gardien" ? (
              <Flex gap={2} mt={1}>
                <NumberInput
                  label={"But(s) encaissé(s)"}
                  value={patchValues.goals_conceded}
                  onChange={(e: string | number) => handleChangeField("goals_conceded")(e)}
                  required={true}
                />
                <NumberInput
                  label={"Arrêt(s)"}
                  value={patchValues.stops}
                  onChange={(e: string | number) => handleChangeField("stops")(e)}
                  required={true}
                />
              </Flex>
            )
              : (
                <Flex gap={2} mt={1}>
                  <NumberInput
                    label={"But(s) marqué(s)"}
                    value={patchValues.goals_scored}
                    onChange={(e: string | number) => handleChangeField("goals_scored")(e)}
                    required={true}
                  />
                  <NumberInput
                    label={"Passe(s) décisive(s)"}
                    value={patchValues.assists}
                    onChange={(e: string | number) => handleChangeField("assists")(e)}
                    required={true}
                  />
                </Flex>
              )}
          </ModalBody>
          <ModalFooter>
            <Button rightIcon={<CheckIcon />} colorScheme="teal" variant="solid" mr={3} onClick={handleSubmit}>{game.score === "-" ? "Ajouter" : "Modifier"}</Button>
            <Button rightIcon={<CloseIcon />} onClick={onClose}>Annuler</Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
}