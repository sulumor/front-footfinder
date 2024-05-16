import { Login as LoginType} from "@/@Types";
import { useAppDispatch } from "@/hooks/redux";
import { login } from "@/redux/Redux-reducers/user";
import { validateEmail, validatePassword } from "@/utils/validation";
import { ViewOffIcon, ViewIcon } from "@chakra-ui/icons";
import { Flex, FormControl, FormLabel, Input, InputGroup, InputRightElement, Button, Box } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const LoginForm = () : JSX.Element => {
  const [show, setShow] = useState<boolean>(false);
  const handleClick : () => void = () => setShow(!show);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [formValues, setFormValues] = useState<LoginType>({
    email: "jean.dujardin@mail.io",
    password: "yjjk8E676a9JQZ!",
  });

  const handleChangeField = (user: "email" | "password") => (value: string) : void =>  {
    setFormValues({ ...formValues, [user]: value });
  };

  const setEnableButton = () : boolean => {
    const isValidPassword : boolean = validatePassword(formValues.password)
    const isValidEmail : boolean = validateEmail(formValues.email)
    return isValidEmail && isValidPassword
  }

  const handleSubmit = async () => {
    await dispatch(login(formValues));
    if (localStorage.getItem("role") == "joueur") {
      navigate("/player");
    } else if (localStorage.getItem("role") == "recruteur") {
      navigate("/scout");
    }
  }

  return (
    <Flex w="80%" m="0 auto" justifyContent="center">
        <form onSubmit={handleSubmit}>
          <FormControl id="email" mb="5">
            <FormLabel variant="h6">Email</FormLabel>
            <Input
              htmlSize={24}
              value={formValues.email}
              onChange={(e) => handleChangeField("email")(e.target.value)}
              placeholder="test@example.fr"
              size="sm"
              />
          </FormControl>
          <FormControl id="password" mb="5">
            <FormLabel variant="h6">Mot de passe</FormLabel>
            <InputGroup size="sm">
              <Input
                value={formValues.password}
                onChange={(e) =>
                  handleChangeField("password")(e.target.value)
                }
                type={show ? "text" : "password"}
                placeholder="Mot de passe"
                size="sm"
                />
              
              <InputRightElement w="4.5rem" onClick={handleClick}>
                <Box>
                  {show ? <ViewOffIcon /> : <ViewIcon />}
                </Box>
              </InputRightElement>
                 
            </InputGroup>
          </FormControl>
          <Button w="full" variant="redEvo" onClick={handleSubmit} isDisabled={!setEnableButton()}>
            Se connecter
          </Button>
          <div>
            <p>scout:</p>
            <p>nicolas.dupon@mail.io X346Dc5V7kfYmv!</p>
          </div>
        </form>
      </Flex>
  )
}