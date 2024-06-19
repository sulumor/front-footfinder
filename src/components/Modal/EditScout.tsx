import { Modal as ModalType } from "@/@Types/utils";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from "@chakra-ui/modal";
import { FormControl, FormLabel, Input, Button } from "@chakra-ui/react";
import { ChangeEvent, useEffect, useState } from "react";
import { useAuth } from "@/context/Auth";
import crud from "@/utils/crud";
import { ScoutPatch } from "@/@Types";
import { FormInput } from "../Input/Form";
import { GenderSelect, NationalitySelect, TeamSelect } from "../Select";

export function EditScoutModal({ isOpen, onClose, signup = false }: ModalType): JSX.Element {
  const { user, getUser } = useAuth();

  const [patchValues, setPatchValues] = useState<ScoutPatch>({
    gender: user?.gender,
    firstname: user?.firstname,
    lastname: user?.lastname,
    email: user?.email,
    nationality: user?.nationality,
    team: user?.team,
  });

  const handleChangeField = (
    user:
      | "gender"
      | "firstname"
      | "lastname"
      | "email"
      | "nationality"
      | "team"
  ) => (value: string | number) => {
    setPatchValues({ ...patchValues, [user]: value });
  };

  const handleSubmit = async (): Promise<void> => {
    const response = await crud.update(["scout"], [], {
      ...patchValues,
    });

    if (response.status === 200) {
      getUser(user);
      onClose();
    }
  };

  useEffect(() => {
    setPatchValues({
      firstname: user?.firstname,
      lastname: user?.lastname,
      email: user?.email,
      gender: user?.gender,
      nationality: user?.nationality,
      team: user?.team
    });
  }, [user]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{signup ? "Renseignez vos informations" : "Modifiez vos informations"}</ModalHeader>
          {!signup && <ModalCloseButton />}
          <ModalBody pb={6}>
            <GenderSelect
              required={true}
              onChange={(e: ChangeEvent<HTMLSelectElement>) => handleChangeField("gender")(e.target.value)}
              value={patchValues?.gender}
            />
            {!signup && (
              <>
                <FormInput
                  required={true}
                  label={"Prénom"}
                  placeholder={"ex: John"}
                  value={patchValues?.firstname}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => handleChangeField("firstname")(e.target.value)}
                />
                <FormInput
                  required={true}
                  label={"Nom"}
                  placeholder={"ex: Doe"}
                  value={patchValues?.lastname}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => handleChangeField("lastname")(e.target.value)}
                />
                <FormInput
                  required={true}
                  label={"Email"}
                  placeholder={"ex: john.doe@example.io"}
                  value={patchValues?.email}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => handleChangeField("email")(e.target.value)}
                />
              </>
            )}
            <NationalitySelect
              required={true}
              onChange={(e: ChangeEvent<HTMLSelectElement>) => handleChangeField("nationality")(e.target.value)}
              value={patchValues?.nationality}
            />
            <TeamSelect
              required={true}
              value={patchValues?.team}
              label={"Équipe avec laquelle vous travaillez"}
              onChange={(e: ChangeEvent<HTMLSelectElement>) => handleChangeField("team")(e.target.value)}
            />
            <FormControl mt={4}>
              <FormLabel>Photo</FormLabel>
              <Input size="md" type="file" />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              onClick={handleSubmit}
              variant="redEvo"
              mr={3}
            >
              {signup ? "Enregistrer" : "Modifier"}
            </Button>
            {!signup && <Button onClick={onClose}>Annuler</Button>}
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
}

