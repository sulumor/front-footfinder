import {
  Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { PlayerPatch } from "@/@Types";
import crud from "@/utils/crud";
import { playerUpdate } from "../../redux/Redux-actions/player";
import { useAppDispatch } from "../../hooks/redux";
import "./updatePlayerProfil.scss";

function UpdatePlayerProfilButton({ player } : { player: PlayerPatch }) {
  const dispatch = useAppDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const id : string | null = localStorage.getItem("id");
  const [patchValues, setPatchValues] = useState<PlayerPatch>({
    firstname: player.firstname,
    lastname: player.lastname,
    email: player.email,
    position: player.position,
    nationality: player.nationality,
    strong_foot: player.strong_foot,
    height: player.height,
    weight: player.weight,
  });

  const handleChangeField = (
    player:
    | "firstname"
    | "lastname"
    | "email"
    | "position"
    | "nationality"
    | "strong_foot"
    | "height"
    | "weight"
  ) => (value: string | number) => {
    setPatchValues({ ...patchValues, [player]: value });
  };

  const handleSubmit = () => {
    updatePlayerInfos();
  };

  const updatePlayerInfos = async () => {
    const response = await crud.update(["player"], [Number.parseInt(id!, 10)], {
      ...patchValues,
    });
    if (response.status === 201) {
      dispatch(playerUpdate());
      onClose();
    }
    return response.data;
  };

  useEffect(() => {
    const setPlayer = () => {
      setPatchValues(player);
    };
    setPlayer();
  }, [player]);

  return (
    <>
      <div className="edit_profil_button">
        <Button colorScheme="teal" onClick={onOpen}>
          Modifier
        </Button>
      </div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <form onSubmit={handleSubmit}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Modifiez vos informations</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Prénom</FormLabel>
                <Input
                  value={patchValues.firstname}
                  onChange={(e) => handleChangeField("firstname")(e.target.value)}
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Nom</FormLabel>
                <Input
                  value={patchValues.lastname}
                  onChange={(e) => handleChangeField("lastname")(e.target.value)}
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Email</FormLabel>
                <Input
                  value={patchValues.email}
                  onChange={(e) => handleChangeField("email")(e.target.value)}
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Nationalité</FormLabel>
                <Input
                  value={patchValues.nationality}
                  onChange={(e) => handleChangeField("nationality")(e.target.value)}
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Position</FormLabel>
                <Select
                  value={patchValues.position}
                  onChange={(e) => handleChangeField("position")(e.target.value)}
                >
                  <option>Gardien</option>
                  <option>Libéro</option>
                  <option>Défenseur gauche</option>
                  <option>Défenseur droit</option>
                  <option>Milieu défensif gauche</option>
                  <option>Milieu défensif droit</option>
                  <option>Milieu défensif central</option>
                  <option>Milieu gauche</option>
                  <option>Milieu droit</option>
                  <option>Milieu offensif</option>
                  <option>Ailier gauche</option>
                  <option>Ailier droit</option>
                  <option>Attaquant</option>
                  <option>Avant-centre</option>
                  <option>Remplaçant</option>
                </Select>
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Taille (en cm)</FormLabel>
                <Input
                  value={patchValues.height}
                  onChange={(e) => handleChangeField("height")(e.target.value)}
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Poids (en kg)</FormLabel>
                <Input
                  value={patchValues.weight}
                  onChange={(e) => handleChangeField("weight")(e.target.value)}
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Pied fort</FormLabel>
                <Select
                  placeholder="--Choix du pied--"
                  value={patchValues.strong_foot}
                  onChange={(e) => handleChangeField("strong_foot")(e.target.value)}
                >
                  <option>Droit</option>
                  <option>Gauche</option>
                </Select>
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Photo</FormLabel>
                <Input size="md" type="file" />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button
                onClick={handleSubmit}
                colorScheme="teal"
                mr={3}
              >
                Modifier
              </Button>
              <Button onClick={onClose}>Annuler</Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  );
}

export default UpdatePlayerProfilButton;
