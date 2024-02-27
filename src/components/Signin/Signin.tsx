import {
  Divider,
  Text,
  Input,
  Button,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Center,
  FormControl,
  FormLabel,
  Select,
} from "@chakra-ui/react";

import { isMobile, BrowserView, MobileView } from "react-device-detect";

import "./Signin.scss";
import { useState } from "react";
import { signin } from "../store/reducers/user";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../hooks/redux";

const Signin = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

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
    console.log(localStorage.getItem("role"));
    
    if (localStorage.getItem("role") == "joueur") {
      navigate("/player/create");
    } else if (localStorage.getItem("role") == "recruteur") {
      navigate("/scout/create");
    }
  };

  return (
        <div className={isMobile ? "mobile_signin_container" : "signin_container"}>
          <form onSubmit={handleSubmit}>
            <FormControl mt={4}>
              <FormLabel>Vous êtes un :</FormLabel>
              <Select
                placeholder="--Choix du role--"
                value={formValues.role}
                onChange={(e) => handleChangeField("role")(e.target.value)}
              >
                <option>joueur</option>
                <option>recruteur</option>
              </Select>
            </FormControl>
            <div className={isMobile ? "mobile_horizontal_divider" : "horizontal_divider"}>
              <Divider />
            </div>
            <div className={isMobile ? "mobile_panel" : "panel"}>
              <div className={isMobile ? "mobile_left_panel" : "left_panel"}>
                <Text mb="8px">Prénom</Text>
                <Input
                  value={formValues.firstname}
                  onChange={(e) =>
                    handleChangeField("firstname")(e.target.value)
                  }
                  size="sm"
                />
                <Text mb="8px">Nom</Text>
                <Input
                  value={formValues.lastname}
                  onChange={(e) =>
                    handleChangeField("lastname")(e.target.value)
                  }
                  size="sm"
                />
                <Text mb="8px">E-mail</Text>
                <Input
                  value={formValues.email}
                  onChange={(e) => handleChangeField("email")(e.target.value)}
                  size="sm"
                />
              </div>
              {isMobile ? null : 
              <Center height="180px">
                <Divider orientation="vertical" />
              </Center>
}
              <div className={isMobile ? "mobile_right_panel" : "right_panel"}>
                <Text mb="8px">Mot de passe</Text>
                <Input
                  value={formValues.password}
                  onChange={(e) =>
                    handleChangeField("password")(e.target.value)
                  }
                  type="password"
                />
                <Text mb="8px">Confirmation du mot de passe</Text>
                <Input
                  value={formValues.confirmedPassword}
                  onChange={(e) =>
                    handleChangeField("confirmedPassword")(e.target.value)
                  }
                  type="password"
                />
              </div>
            </div>
            {formValues.password !== formValues.confirmedPassword &&
              formValues.confirmedPassword.length > 0 && (
                <>
                <BrowserView>
                <Alert status="error">
                  <AlertIcon />
                  <AlertTitle>Mots de passe non correspondants.</AlertTitle>
                  <AlertDescription>
                    Merci de vérifier la correspondance.
                  </AlertDescription>
                </Alert>
                </BrowserView>
                <MobileView>
                <Alert status="error">
                  <AlertIcon />
                  <AlertTitle>Mots de passe non correspondants.</AlertTitle>
                </Alert>
                </MobileView>
                </>
              )}
            <Button colorScheme="red" onClick={handleSubmit}>
              Je m'inscris
            </Button>
          </form>
        </div>
  );
};

export default Signin;
