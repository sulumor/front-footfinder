import { Modal as ModalType } from "@/@Types/utils";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from "@chakra-ui/modal";
import { FormControl, FormLabel, Input, Button } from "@chakra-ui/react";
import { ChangeEvent, useEffect, useState } from "react";
import { FootSelect, NationalitySelect, PositionSelect } from "../Select";
import { useAuth } from "@/context/Auth";
import crud from "@/utils/crud";
import { PlayerPatch } from "@/@Types";
import { FormInput } from "../Input/Form";



export function EditPlayerModal({isOpen, onClose, signup = false} : ModalType) : JSX.Element {
  const { user, getUser } = useAuth();

  const [patchValues, setPatchValues] = useState<PlayerPatch>({
    firstname: user?.firstname,
    lastname: user?.lastname,
    email: user?.email,
    position: user?.position,
    nationality: user?.nationality,
    strong_foot: user?.strong_foot,
    height: user?.height,
    weight: user?.weight,
  });

  const handleChangeField = (
    user:
    | "firstname"
    | "lastname"
    | "email"
    | "position"
    | "nationality"
    | "strong_foot"
    | "height"
    | "weight"
  ) => (value: string | number) => {
    setPatchValues({ ...patchValues, [user]: value });
  };

  const handleSubmit = async () : Promise<void> => {
    const response = await crud.update(["player"], [], {
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
      position: user?.position,
      nationality: user?.nationality,
      strong_foot: user?.strong_foot,
      height: user?.height,
      weight: user?.weight,
    });
  }, [user]);
  
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
        <form onSubmit={handleSubmit}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{signup ? "Renseignez vos information" : "Modifiez vos informations"} </ModalHeader>
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

              <NationalitySelect 
                required = {true}
                value={patchValues?.nationality}
                onChange={(e : ChangeEvent<HTMLInputElement>) => handleChangeField("nationality")(e.target.value)}
              />

              <PositionSelect 
                required={true}
                value={patchValues?.position}
                onChange={(e : ChangeEvent<HTMLInputElement>) => handleChangeField("position")(e.target.value)} 
              />

              <FormInput 
                required={true}
                label={"Taille (en cm)"}
                placeholder={"ex: 183"}
                value={patchValues?.height}
                onChange={(e : ChangeEvent<HTMLInputElement>) => handleChangeField("height")(e.target.value)}
              /> 

              <FormInput 
                required={true}
                label={"Poids (en kg)"}
                placeholder={"ex: 63"}
                value={patchValues?.weight}
                onChange={(e : ChangeEvent<HTMLInputElement>) => handleChangeField("weight")(e.target.value)}
              /> 
              
              <FootSelect
                required={true}
                value={patchValues?.strong_foot}
                onChange={(e : ChangeEvent<HTMLInputElement>) => handleChangeField("strong_foot")(e.target.value)}
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

