import { useAppDispatch } from "@/hooks/redux";
import { signin } from "@/redux/Redux-reducers/user";
import { Link as LinkChakra, FormControl, FormLabel, Input,  Button, Flex, Box, InputGroup, InputRightElement, Checkbox } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToggleBtn } from "../Button/Toggle";
import { ViewOffIcon, ViewIcon } from "@chakra-ui/icons";
import { validateEmail, validatePassword } from "@/utils/validation";

export const SignupForm = () : JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [job, setJob] = useState<boolean>(true);
  const [show, setShow] = useState<boolean>(false);
  const [accepted, setAccepted] = useState<boolean>(false)
  const handleClick : () => void = () => setShow(!show);

  const [formValues, setFormValues] = useState({
    role: "",
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmedPassword: "",
  });

  const handleChangeField =
    (
      user:
        | "email"
        | "password"
        | "role"
        | "firstname"
        | "lastname"
        | "confirmedPassword"
    ) =>
    (value: string) => {     
      setFormValues({ ...formValues, [user]: value });
      
    };

  const handleSubmit = async () => {
    await dispatch(signin(formValues));   
    
    if (localStorage.getItem("role") == "joueur") {
      navigate("/player/create");
    } else if (localStorage.getItem("role") == "recruteur") {
      navigate("/scout/create");
    }
  };

  const setEnableButton = () : boolean => {
    const isFilledLastname : boolean = formValues.lastname !== "";
    const isFilledFirstanme : boolean = formValues.firstname !== "";
    const isValidEmail : boolean = validateEmail(formValues.email)
    const isValidPassword : boolean = validatePassword(formValues.password)
    return isFilledLastname && isFilledFirstanme && isValidEmail && isValidPassword && accepted && formValues.password === formValues.confirmedPassword
  }

  useEffect(()=> {
    setFormValues({...formValues, role :  job ? "manager" : "joueur"});
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [job])
  
  return (
    <Flex w="80%" m="0 auto" justifyContent="center">
      <form onSubmit={handleSubmit}>
        <FormControl id="role" mb="5" w="300px">
          <FormLabel variant="h6">Vous êtes un :</FormLabel>
          <ToggleBtn setJob={setJob} />
        </FormControl>
        <FormControl id="firstname" mb="5" isRequired>
          <FormLabel variant="h6">Prénom</FormLabel>
          <Input
            value={formValues.firstname}
            onChange={(e) =>
              handleChangeField("firstname")(e.target.value)
            }
            placeholder="ex: John"
            size="sm"
          />
        </FormControl>
        <FormControl id="lastname" mb="5" isRequired>
          <FormLabel variant="h6">Nom</FormLabel>
          <Input
            value={formValues.lastname}
            onChange={(e) =>
              handleChangeField("lastname")(e.target.value)
            }
            size="sm"
            placeholder="ex: Doe"
            />
        </FormControl>
        <FormControl id="email" mb="5" isRequired>
          <FormLabel variant="h6">E-mail</FormLabel>
          <Input
            value={formValues.email}
            onChange={(e) => handleChangeField("email")(e.target.value)}
            size="sm"
            placeholder="ex: john.doe@footfinder.io"
            />
        </FormControl>
        <FormControl id="password" mb="5" isRequired>
            <FormLabel variant="h6">Mot de passe</FormLabel>
            <InputGroup size="sm">
              <Input
                value={formValues.password}
                onChange={(e) =>
                  handleChangeField("password")(e.target.value)
                }
                type={show ? "text" : "password"}
                placeholder="********"
                size="sm"
                />
              
              <InputRightElement w="4.5rem" onClick={handleClick}>
                <Box>
                  {show ? <ViewOffIcon /> : <ViewIcon />}
                </Box>
              </InputRightElement>
                 
            </InputGroup>
          </FormControl>
          <FormControl id="confirmedPassword" mb="5" isRequired>
            <FormLabel variant="h6">Confirmation du mot de passe</FormLabel>
            <InputGroup size="sm">
              <Input
                value={formValues.confirmedPassword}
                onChange={(e) =>
                  handleChangeField("confirmedPassword")(e.target.value)
                }
                type={show ? "text" : "password"}
                placeholder="********"
                size="sm"
                />
              
              <InputRightElement w="4.5rem" onClick={handleClick}>
                <Box>
                  {show ? <ViewOffIcon /> : <ViewIcon />}
                </Box>
              </InputRightElement>
                 
            </InputGroup>
          </FormControl>
          <Checkbox mb="5" isChecked={accepted} onChange={() => setAccepted(!accepted)}>J'ai lu et j'accepte les <Link to="/notices"><LinkChakra>CGU</LinkChakra></Link></Checkbox>
          <Button w="full" variant="redEvo" onClick={handleSubmit} isDisabled={!setEnableButton()}>
            Je m'inscris
          </Button>
        </form>
      </Flex> 
  )
} 