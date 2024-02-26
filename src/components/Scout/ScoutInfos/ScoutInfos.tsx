/* eslint-disable react-hooks/exhaustive-deps */
import {
  Text,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Button,
  Input,
  useDisclosure,
  Flex,
  Avatar,
  Box,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/components/hooks/redux";
import { getScoutInfos } from "@/components/store/reducers/scout";
import crud from "@/utils/crud";
import { scoutUpdate } from "@/components/store/actions/scout";

const ScoutInfos = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const id = localStorage.getItem("id");
  const dispatch = useAppDispatch();

  const lastName = useAppSelector((state) => state.scout.lastname);
  const firstName = useAppSelector((state) => state.scout.firstname);
  const club = useAppSelector((state) => state.scout.club);
  const city = useAppSelector((state) => state.scout.city);
  const count = useAppSelector((state) => state.scout.count);

  const [patchValues, setPatchValues] = useState({
    firstname: "",
    lastname: "",
    email: "",
    club: "",
    city: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const res = await dispatch(getScoutInfos(id));
      setPatchValues({ ...patchValues, firstname: res.payload.firstname });
      patchValues.firstname = res.payload.firstname;
      patchValues.lastname = res.payload.lastname;
      patchValues.email = res.payload.email;
      patchValues.city = res.payload.city;
      patchValues.club = res.payload.club;
    };
    fetchData();
  }, [count]);

  const handleChangeField =
    (scout: "firstname" | "lastname" | "email" | "club" | "city") =>
    (value: string) => {
      setPatchValues({ ...patchValues, [scout]: value });
    };

  const handleSubmit = () => {
    updateScoutInfos();
  };

  const updateScoutInfos = async () => {
    const response = await crud.update(["scout"], [Number.parseInt(id!, 10)], {
      ...patchValues,
    });
    dispatch(scoutUpdate());
    return response.data;
  };

  return (
        <div className="sprofil_container">
          <Flex>
            <Avatar
              size="2xl"
              name={lastName}
              src="https://bit.ly/dan-abramov"
            />
            <Box ml="4">
              <div className="scout_box_left">
                <Text fontWeight="bold" fontSize="2xl">
                  {firstName} {lastName}
                </Text>
                <Text fontSize="xl">Recruteur</Text>
                <div className="scout_box_right">
                  <Text fontSize="xl">Ville: {city}</Text>
                  <Text fontSize="xl">Club: {club}</Text>
                </div>
                <IconButton
                  onClick={onOpen}
                  colorScheme="teal"
                  aria-label="Search database"
                  icon={<EditIcon />}
                />
              </div>
            </Box>
          </Flex>
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
                    <FormLabel>Ville</FormLabel>
                    <Input
                      value={patchValues.city}
                      onChange={(e) =>
                        handleChangeField("city")(e.target.value)
                      }
                    />
                  </FormControl>

                  <FormControl mt={4}>
                    <FormLabel>Club</FormLabel>
                    <Input
                      value={patchValues.club}
                      onChange={(e) =>
                        handleChangeField("club")(e.target.value)
                      }
                    />
                  </FormControl>

                  <FormControl mt={4}>
                    <FormLabel>Photo</FormLabel>
                    <Input size="md" type="file" />
                  </FormControl>
                </ModalBody>

                <ModalFooter>
                  <Button onClick={handleSubmit} colorScheme="teal" mr={3}>
                    Modifier
                  </Button>
                  <Button onClick={onClose}>Annuler</Button>
                </ModalFooter>
              </ModalContent>
            </form>
          </Modal>
        </div>
  );
};

export default ScoutInfos;
