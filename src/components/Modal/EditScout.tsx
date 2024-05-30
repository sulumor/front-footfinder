import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from "@chakra-ui/modal";
import { FormControl, FormLabel, Input, Button } from "@chakra-ui/react";
import { ChangeEvent, useEffect, useState } from "react";
import { useAuth } from "@/context/Auth";
import crud from "@/utils/crud";
import {  ScoutPatch } from "@/@Types";
import { FormInput } from "../Input/Form";

export interface ModalType {
  isOpen:boolean; 
  onClose:() => void;
  signup?: boolean
}

export function EditScoutModal({isOpen, onClose, signup = false} : ModalType) : JSX.Element {
  const { user, getUser } = useAuth();
  
  const [patchValues, setPatchValues] = useState<ScoutPatch>({
    firstname: user?.firstname,
    lastname: user?.lastname,
    email: user?.email,
  });

  const handleChangeField = (
    user:
    | "firstname"
    | "lastname"
    | "email"
  ) => (value: string | number) => {
    setPatchValues({ ...patchValues, [user]: value });
  };

  const handleSubmit = async () : Promise<void> => {
    const response = await crud.update(["scout"], [user?.id], {
      ...patchValues,
    });
        
    if (response.status === 201) {
      getUser(user);
      onClose();
    }
  };

  useEffect(() => {
    setPatchValues({
      firstname: user?.firstname,
      lastname: user?.lastname,
      email: user?.email,
    });
  }, [user]);
  
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
        <form onSubmit={handleSubmit}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{signup ? "Renseignez vos information" : "Modifiez vos informations"}</ModalHeader>
            {!signup && <ModalCloseButton />} 
            <ModalBody pb={6}>
              
              <FormInput 
                required={true}
                label={"Prénom"}
                placeholder={"ex: John"}
                value={patchValues?.firstname}
                onChange={(e : ChangeEvent<HTMLInputElement>) => handleChangeField("firstname")(e.target.value)}

              /> 
              <FormInput 
                required={true}
                label={"Nom"}
                placeholder={"ex: Doe"}
                value={patchValues?.lastname}
                onChange={(e : ChangeEvent<HTMLInputElement>) => handleChangeField("lastname")(e.target.value)}

              /> 
              <FormInput 
                required={true}
                label={"Email"}
                placeholder={"ex: john.doe@example.io"}
                value={patchValues?.email}
                onChange={(e : ChangeEvent<HTMLInputElement>) => handleChangeField("email")(e.target.value)}

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
               {signup ? "Enregistrer": "Modifier"}
              </Button>
              { !signup && <Button onClick={onClose}>Annuler</Button> }
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
  );
}

