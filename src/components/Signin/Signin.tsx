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

import { BrowserView, MobileView } from "react-device-detect";

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
    if (localStorage.getItem("role") == "joueur") {
      navigate("/player/create");
    } else if (localStorage.getItem("role") == "recruteur") {
      navigate("/scout/create");
    }
  };

  return (
    <>
      <BrowserView>
        <div className="signin_container">
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

            <div className="horizontal_divider">
              <Divider />
            </div>
            <div className="panel">
              <div className="left_panel">
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
              <Center height="180px">
                <Divider orientation="vertical" />
              </Center>
              <div className="right_panel">
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
                <Alert status="error">
                  <AlertIcon />
                  <AlertTitle>Mots de passe non correspondants.</AlertTitle>
                  <AlertDescription>
                    Merci de vérifier la correspondance.
                  </AlertDescription>
                </Alert>
              )}
            <Button colorScheme="red" onClick={handleSubmit}>
              Je m'inscris
            </Button>
          </form>
        </div>
      </BrowserView>
      <MobileView>
        <div className="mobile_signin_container">
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
            <div className="mobile_horizontal_divider">
              <Divider />
            </div>
            <div className="mobile_panel">
              <div className="mobile_left_panel">
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
              <div className="mobile_right_panel">
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
                <Alert status="error">
                  <AlertIcon />
                  <AlertTitle>Mots de passe non correspondants.</AlertTitle>
                </Alert>
              )}
            <Button colorScheme="red" onClick={handleSubmit}>Je m'inscris</Button>
          </form>
        </div>
      </MobileView>
    </>
  );
};

export default Signin;
