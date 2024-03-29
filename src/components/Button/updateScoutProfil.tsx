import crud from "@/utils/crud";
import { EditIcon } from "@chakra-ui/icons";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/modal";
import {
  IconButton,
  FormControl,
  FormLabel,
  Input,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { scoutUpdate } from "../store/actions/scout";
import { useAppDispatch } from "../hooks/redux";
import { getScoutInfos } from "../store/reducers/scout";

const UpdateScoutButton = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const id = localStorage.getItem("id");
  const dispatch = useAppDispatch();

  const [patchValues, setPatchValues] = useState({
    firstname: "",
    lastname: "",
    email: "",
    club: "",
    city: "",
  });

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
    if (response.status === 201) {
        dispatch(scoutUpdate());
        onClose();
      } 
    return response.data;
  };

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
  }, []);

  return (
    <>
      <IconButton
        onClick={onOpen}
        colorScheme="teal"
        aria-label="Search database"
        icon={<EditIcon />}
      />
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
                  onChange={(e) => handleChangeField("email")(e.target.value)}
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Ville</FormLabel>
                <Input
                  value={patchValues.city}
                  onChange={(e) => handleChangeField("city")(e.target.value)}
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Club</FormLabel>
                <Input
                  value={patchValues.club}
                  onChange={(e) => handleChangeField("club")(e.target.value)}
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
    </>
  );
};

export default UpdateScoutButton;
