import { useState } from "react";
import { Input, InputGroup, InputRightElement, Button, FormControl, Select } from "@chakra-ui/react";
import { isMobile } from "react-device-detect";
import "./Login.scss";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useAppDispatch } from "../../hooks/redux";
import { login } from "../../Redux-store/Redux-reducers/user";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [formValues, setFormValues] = useState({
    email: "jean.dujardin@mail.io",
    password: "yjjk8E676a9JQZ!",
    role: ""
  });

  const handleChangeField = (user: "email" | "password" | "role") => (value: string) => {
    setFormValues({ ...formValues, [user]: value });
  };

  const handleSubmit = async () => {
    await dispatch(login(formValues));
    if (localStorage.getItem("role") == "joueur") {
      navigate("/player");
    } else if (localStorage.getItem("role") == "recruteur") {
      navigate("/scout");
    }
  };

  return (
        <form onSubmit={handleSubmit}>
          <div className={isMobile ? "mobile_login_container" : "login_container"}>
            <div className={isMobile ? "mobile_input_container" : "input_container"}>
              <div className={isMobile ? "mobile_login_input" : "login_input"}>
                <Input
                  width="auto"
                  htmlSize={24}
                  value={formValues.email}
                  onChange={(e) => handleChangeField("email")(e.target.value)}
                  placeholder="Email"
                  size="sm"
                />
              </div>
              <div className={isMobile ? "mobile_login_input" : "login_input"}>
                <div className={isMobile ? "mobile_login_password" : "login_password"}>
                  <InputGroup size="sm">
                    <Input
                      width="auto"
                      htmlSize={28}
                      value={formValues.password}
                      onChange={(e) =>
                        handleChangeField("password")(e.target.value)
                      }
                      type={show ? "text" : "password"}
                      placeholder="Mot de passe"
                      size="sm"
                    />
                    <div className="eye_element">
                      <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={handleClick}>
                          {show ? <ViewOffIcon /> : <ViewIcon />}
                        </Button>
                      </InputRightElement>
                    </div>     
                  </InputGroup>
                </div>
                <FormControl mt={4}>
                      <Select
                        placeholder="--Role--"
                        value={formValues.role}
                        onChange={(e) =>
                          handleChangeField("role")(e.target.value)
                        }
                      >
                        <option>joueur</option>
                        <option>recruteur</option>
                      </Select>
                    </FormControl>
              </div>
              <div className={isMobile ? "mobile_login_button" : "login_button"}>
                <Button colorScheme="teal" onClick={handleSubmit}>
                  Se connecter
                </Button>
              </div>
              <p>scout:</p>
              <p>nicolas.dupon@mail.io X346Dc5V7kfYmv!</p>
            </div>
          </div>
        </form>
  );
};

export default Login;
