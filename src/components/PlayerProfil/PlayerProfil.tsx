import {
  Avatar,
  Box,
  Divider,
  Flex,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
  Button,
  useDisclosure,
  Select,
} from "@chakra-ui/react";
import { BrowserView, MobileView } from "react-device-detect";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { getPlayerInfos } from "../store/reducers/player";
import crud from "@/utils/crud";

import "./PlayerProfil.scss";
import { PlayerPatch } from "@/@Types";

const PlayerProfil = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useAppDispatch();
  const id : string | null = localStorage.getItem("id");

  const lastName : string = useAppSelector((state) => state.player.lastname);
  const firstName : string = useAppSelector((state) => state.player.firstname);
  const position: string = useAppSelector((state) => state.player.position);
  const email : string = useAppSelector((state) => state.player.email);
  const country: string = useAppSelector((state) => state.player.nationality);
  const foot : string = useAppSelector((state) => state.player.strong_foot);
  const matches: number = useAppSelector(
    (state) => state.player.number_of_matches_played
  );
  const birthday : string | Date = useAppSelector((state) => state.player.birth_date);
  const genre : string = useAppSelector((state) => state.player.genre);
  const height : number = useAppSelector((state) => state.player.height);
  const weight: number = useAppSelector((state) => state.player.weight);

  const [patchValues, setPatchValues] = useState<PlayerPatch>({
    firstname: "",
    lastname: "",
    email: "",
    position: "",
    nationality: "",
    strong_foot: "",
    height: "",
    weight: "",
  });

  const handleChangeField =
    (
      player:
        | "firstname"
        | "lastname"
        | "email"
        | "position"
        | "nationality"
        | "strong_foot"
        | "height"
        | "weight"
    ) =>
    (value: string | number) => {
      setPatchValues({ ...patchValues, [player]: value });
    };

  const handleSubmit = () => {
    updatePlayerInfos();
  };

  const updatePlayerInfos = async () => {
    const response = await crud.update(["player"], [Number.parseInt(id!, 10)], {
      ...patchValues,
    });
    console.log("requete update player terminée");
    return response.data;
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await dispatch(getPlayerInfos());

      setPatchValues({...patchValues, firstname:(res.payload as PlayerPatch).firstname});
      patchValues.firstname = (res.payload as PlayerPatch).firstname;
      patchValues.lastname= (res.payload as PlayerPatch).lastname;
      patchValues.email= (res.payload as PlayerPatch).email;
      patchValues.position = (res.payload as PlayerPatch).position;
      patchValues.nationality = (res.payload as PlayerPatch).nationality;
      patchValues.strong_foot = (res.payload as PlayerPatch).strong_foot;
      patchValues.height = (res.payload as PlayerPatch).height;
      patchValues.weight = (res.payload as PlayerPatch).weight;
    };
    fetchData();
  }, []);

  return (
    <>
      <BrowserView>
        <div className="profil_main">
          <div className="profil_title">
            <Flex>
              <Avatar
                size="2xl"
                name={lastName}
                src="https://bit.ly/kent-c-dodds"
              />
              <Box ml="4">
                <div className="profil_title_name">
                  <Text fontWeight="bold" fontSize="2xl">
                    {firstName}
                  </Text>
                  <Text fontWeight="bold" fontSize="2xl">
                    {lastName}
                  </Text>
                </div>
                <div className="profil_title_position">
                  <Text fontSize="xl">{position}</Text>
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
                            onChange={(e) =>
                              handleChangeField("firstname")(e.target.value)
                            }
                          />
                        </FormControl>

                        <FormControl mt={4}>
                          <FormLabel>Nom</FormLabel>
                          <Input
                            value={patchValues.lastname}
                            onChange={(e) =>
                              handleChangeField("lastname")(e.target.value)
                            }
                          />
                        </FormControl>

                        <FormControl mt={4}>
                          <FormLabel>Email</FormLabel>
                          <Input
                            value={patchValues.email}
                            onChange={(e) =>
                              handleChangeField("email")(e.target.value)
                            }
                          />
                        </FormControl>

                        <FormControl mt={4}>
                          <FormLabel>Nationalité</FormLabel>
                          <Input
                            value={patchValues.nationality}
                            onChange={(e) =>
                              handleChangeField("nationality")(e.target.value)
                            }
                          />
                        </FormControl>

                        <FormControl mt={4}>
                          <FormLabel>Position</FormLabel>
                          <Select
                            value={patchValues.position}
                            onChange={(e) =>
                              handleChangeField("position")(e.target.value)
                            }
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
                            onChange={(e) =>
                              handleChangeField("height")(e.target.value)
                            }
                          />
                        </FormControl>

                        <FormControl mt={4}>
                          <FormLabel>Poids (en kg)</FormLabel>
                          <Input
                            value={patchValues.weight}
                            onChange={(e) =>
                              handleChangeField("weight")(e.target.value)
                            }
                          />
                        </FormControl>

                        <FormControl mt={4}>
                          <FormLabel>Pied fort</FormLabel>
                          <Select
                            placeholder="--Choix du pied--"
                            value={patchValues.strong_foot}
                            onChange={(e) =>
                              handleChangeField("strong_foot")(e.target.value)
                            }
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
              </Box>
            </Flex>
          </div>
          <Divider />
          <div className="profil_container">
            <div className="profil_container_left">
              <div className="profil_container_left_title">
                <h2>Informations générales</h2>
              </div>
              <div className="profil_container_left_infos">
                <p>
                  Prénom : <span>{firstName}</span>
                </p>
                <p>
                  Nom : <span>{lastName}</span>
                </p>
                <p>
                  Email : <span>{email}</span>
                </p>
              </div>
            </div>
            <div className="profil_container_right">
              <div className="profil_container_right_title">
                <h2>Informations de joueur</h2>
              </div>
              <div className="profil_container_right_infos">
                <p>
                  Date de naissance :{" "}
                  <span>
                    {new Date(birthday).toLocaleDateString("fr-FR", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </p>
                <p>
                  Nationnalité : <span>{country}</span>
                </p>
                <p>
                  Genre : <span>{genre}</span>
                </p>
                <p>
                  Taille : <span>{height}</span> cm
                </p>
                <p>
                  Poids : <span>{weight}</span> kg
                </p>
                <p>
                  Pied fort : <span>{foot}</span>
                </p>
                <p>
                  Position : <span>{position}</span>
                </p>
                <p>
                  Nombre de match joué(s) : <span>{matches}</span>
                </p>
              </div>
            </div>
          </div>
          <div className="edit_profil_button">
            <Button colorScheme="teal" onClick={onOpen}>
              Modifier
            </Button>
          </div>
        </div>
      </BrowserView>
      <MobileView>
        <div className="profil_main">
          <div className="mobile_profil_title">
            <Flex>
              <Avatar
                size="2xl"
                name={lastName}
                src="https://bit.ly/kent-c-dodds"
              />
              <Box ml="4">
                <div className="profil_title_name">
                  <Text fontWeight="bold" fontSize="2xl">
                    {firstName}
                  </Text>
                  <Text fontWeight="bold" fontSize="2xl">
                    {lastName}
                  </Text>
                </div>
                <div className="profil_title_position">
                  <Text fontSize="xl">{position}</Text>
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
                            onChange={(e) =>
                              handleChangeField("firstname")(e.target.value)
                            }
                          />
                        </FormControl>

                        <FormControl mt={4}>
                          <FormLabel>Nom</FormLabel>
                          <Input
                            value={patchValues.lastname}
                            onChange={(e) =>
                              handleChangeField("lastname")(e.target.value)
                            }
                          />
                        </FormControl>

                        <FormControl mt={4}>
                          <FormLabel>Email</FormLabel>
                          <Input
                            value={patchValues.email}
                            onChange={(e) =>
                              handleChangeField("email")(e.target.value)
                            }
                          />
                        </FormControl>

                        <FormControl mt={4}>
                          <FormLabel>Nationalité</FormLabel>
                          <Input
                            value={patchValues.nationality}
                            onChange={(e) =>
                              handleChangeField("nationality")(e.target.value)
                            }
                          />
                        </FormControl>

                        <FormControl mt={4}>
                          <FormLabel>Position</FormLabel>
                          <Select
                            value={patchValues.position}
                            onChange={(e) =>
                              handleChangeField("position")(e.target.value)
                            }
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
                            onChange={(e) =>
                              handleChangeField("height")(e.target.value)
                            }
                          />
                        </FormControl>

                        <FormControl mt={4}>
                          <FormLabel>Poids (en kg)</FormLabel>
                          <Input
                            value={patchValues.weight}
                            onChange={(e) =>
                              handleChangeField("weight")(e.target.value)
                            }
                          />
                        </FormControl>

                        <FormControl mt={4}>
                          <FormLabel>Pied fort</FormLabel>
                          <Select
                            placeholder="--Choix du pied--"
                            value={patchValues.strong_foot}
                            onChange={(e) =>
                              handleChangeField("strong_foot")(e.target.value)
                            }
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
              </Box>
            </Flex>
          </div>
          <Divider />
          <div className="mobile_profil_container">
            <div className="mobile_profil_container_left">
              <div className="profil_container_left_title">
                <h2>Informations générales</h2>
              </div>
              <div className="profil_container_left_infos">
                <p>
                  Prénom : <span>{firstName}</span>
                </p>
                <p>
                  Nom : <span>{lastName}</span>
                </p>
                <p>
                  Email : <span>{email}</span>
                </p>
              </div>
            </div>
            <div className="profil_container_right">
              <div className="profil_container_right_title">
                <h2>Informations de joueur</h2>
              </div>
              <div className="profil_container_right_infos">
                <p>
                  Date de naissance :{" "}
                  <span>
                    {new Date(birthday).toLocaleDateString("fr-FR", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </p>
                <p>
                  Nationnalité : <span>{country}</span>
                </p>
                <p>
                  Genre : <span>{genre}</span>
                </p>
                <p>
                  Taille : <span>{height}</span> cm
                </p>
                <p>
                  Poids : <span>{weight}</span> kg
                </p>
                <p>
                  Pied fort : <span>{foot}</span>
                </p>
                <p>
                  Position : <span>{position}</span>
                </p>
                <p>
                  Nombre de match joué(s) : <span>{matches}</span>
                </p>
              </div>
            </div>
          </div>
          <div className="edit_profil_button">
            <Button colorScheme="teal" onClick={onOpen}>
              Modifier
            </Button>
          </div>
        </div>
      </MobileView>
    </>
  );
};

export default PlayerProfil;
