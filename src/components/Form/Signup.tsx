import {
  Link as LinkChakra, FormControl, FormLabel, Button, Flex, Checkbox, Text} from "@chakra-ui/react";
import { ChangeEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToggleBtn } from "../Button/Toggle";
import { validateEmail, validatePassword } from "@/utils/validation";
import { EmailInput, FormInput, PasswordInput } from "../Input";
import { EditPlayerModal, EditScoutModal } from "../Modal";
import { useAuth } from "@/context/Auth";

export function SignupForm(): JSX.Element {
  const [job, setJob] = useState<boolean>(false);
  const [accepted, setAccepted] = useState<boolean>(false);
  const [openPlayer, setOpenPlayer] = useState<boolean>(false);
  const [openScout, setOpenScout] = useState<boolean>(false);
  const { signup, user } = useAuth();
  const navigate = useNavigate();

  const onPlayerModalClose : () => void = () => { 
    setOpenPlayer(false);
    navigate("/player");
  };
  const onScoutModalClose : () => void = () => { 
    setOpenScout(false);
    navigate("/scout");
  };

  const [formValues, setFormValues] = useState({
    role: false,
    firstname: undefined,
    lastname: undefined,
    email: undefined,
    password: undefined,
    confirmedPassword: undefined,
  });

  const handleChangeField = (
    user:
    | "email"
    | "password"
    | "role"
    | "firstname"
    | "lastname"
    | "confirmedPassword"
  ) => (value: string) => {
    setFormValues({ ...formValues, [user]: value });
  };

  const handleSubmit = async () => {
    const res = await signup(formValues);
          
    if (res.role)  setOpenPlayer(true);
    else setOpenScout(true);
  };

  const setEnableButton = () : boolean => {
    const isFilledLastname : boolean = formValues.lastname !== "";
    const isFilledFirstname : boolean = formValues.firstname !== "";
    const isValidEmail : boolean = validateEmail(formValues.email);
    const isValidPassword : boolean = validatePassword(formValues.password);
    return isFilledLastname && isFilledFirstname && isValidEmail && isValidPassword && accepted && formValues.password === formValues.confirmedPassword;
  };

  useEffect(() => {
    setFormValues({ ...formValues, role: job });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [job, user]);

  return (
    <Flex w={{base: "80%", md: "50%" }} m="0 auto" justifyContent="center">
      <form onSubmit={handleSubmit}>
        <FormControl id="role" mb="5" w="full" isRequired>
          <FormLabel variant="h6">Vous êtes un :</FormLabel>
          <ToggleBtn setJob={setJob} />
        </FormControl>
        <FormInput
          required={true}
          label={"Prénom"}
          value={formValues.firstname}
          onChange={(e : ChangeEvent<HTMLInputElement>) => handleChangeField("firstname")(e.target.value)}
          placeholder={"ex: John"}
        />
        <FormInput
          required={true}
          label={"Nom"}
          value={formValues.lastname}
          onChange={(e : ChangeEvent<HTMLInputElement>) => handleChangeField("lastname")(e.target.value)}
          placeholder={"ex: Doe"}
        />
        <EmailInput
          required={true}
          value={formValues.email}
          onChange={(e : ChangeEvent<HTMLInputElement>) => handleChangeField("email")(e.target.value)}
        />
        <PasswordInput
          required={ true }
          label={"Mot de passe"}
          value={formValues.password}
          onChange={(e : ChangeEvent<HTMLInputElement>) => handleChangeField("password")(e.target.value)}
        />
        <PasswordInput
          required={ true }
          label={"Confirmation de mot de passe"}
          value={formValues.confirmedPassword}
          onChange={(e : ChangeEvent<HTMLInputElement>) => handleChangeField("confirmedPassword")(e.target.value)}
        />
        <Checkbox mb="5" isChecked={accepted} onChange={() => setAccepted(!accepted)}>
          J'ai lu et j'accepte les{" "}
          <Link to="/notices"><LinkChakra>CGU</LinkChakra></Link>
        </Checkbox>
        <Button w="full" variant="redEvo" onClick={handleSubmit} isDisabled={!setEnableButton()}>
          Je m'inscris
        </Button>
        <Text textStyle="textSmall" mt={5}>Votre mot de passe doit contenir au moins 8 caractères dont 1 majuscule, 1 minuscule, 1 chiffre et 1 caractère spécial</Text>
      </form>
      <EditPlayerModal isOpen={openPlayer} onClose={onPlayerModalClose} signup={true} />
      <EditScoutModal isOpen={openScout} onClose={onScoutModalClose} signup={true} />
    </Flex>
  );
}
