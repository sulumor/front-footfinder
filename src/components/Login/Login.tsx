import { useState } from "react";
import { Input, InputGroup, InputRightElement, Button } from "@chakra-ui/react";
import { BrowserView, MobileView } from "react-device-detect";
import "./Login.scss";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useAppDispatch } from "../hooks/redux";
import { login } from "../store/reducers/user";
import {useNavigate} from "react-router-dom";

const Login = () => {

  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [formValues, setFormValues] = useState({
    email: "jean.dujardin@mail.io",
    password: "yjjk8E676a9JQZ",
  });
  
  const handleChangeField = (user: "email" | "password") => (value: string) => {
    console.log(`New value for ${user}:`, value);
    setFormValues({ ...formValues, [user]: value });
  };

  const handleSubmit = async () => {;
    await dispatch(login(formValues));
    if (localStorage.getItem("role") == "joueur") {
      navigate("/player")
    } else if (localStorage.getItem("role") == "recruteur") {
      navigate("/scout")
    } 
  };

  return (
    <>
      <BrowserView>
        <form onSubmit={handleSubmit}>
          <div className="login_container">
            <div className="input_container">
              <div className="login_input">
                <Input
                  width="auto"
                  htmlSize={24}
                  value={formValues.email}
                  onChange={(e) => handleChangeField("email")(e.target.value)}
                  placeholder="Email"
                  size="sm"
                />
              </div>
              <div className="login_input">
                <div className="login_password">
                  <InputGroup size="sm">
                    <Input
                      width="auto"
                      htmlSize={28}
                      value={formValues.password}
                      onChange={(e) => handleChangeField("password")(e.target.value)}
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
              </div>
              <div className="login_button">
                <Button colorScheme="teal" onClick={handleSubmit}>               
                  Se connecter
                </Button>               
              </div>
            </div>
          </div>
        </form>
      </BrowserView>

      <MobileView>
        <form>
          <div className="mobile_login_container">
            <div className="mobile_input_container">
              <div className="mobile_login_input">
                <Input
                  htmlSize={20}
                  width="auto"
                  value={formValues.email}
                  onChange={(e) => handleChangeField("email")(e.target.value)}
                  placeholder="Email"
                  size="sm"
                />
              </div>
              <div className="mobile_login_input">
                <div className="mobile_login_password">
                  <InputGroup size="sm">
                    <Input
                      htmlSize={9}
                      width="auto"
                      pr="8rem"
                      value={formValues.password}
                      onChange={(e) => handleChangeField("password")(e.target.value)}
                      type={show ? "text" : "password"}
                      placeholder="Mot de passe"
                    />

                    <InputRightElement width="4.5rem">
                      <Button h="2rem" size="sm" onClick={handleClick}>
                        {show ? <ViewOffIcon /> : <ViewIcon />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </div>
              </div>
              <div className="mobile_login_button">
                <Button colorScheme="teal" onClick={handleSubmit}>
                  Se connecter
                </Button>
              </div>
            </div>
          </div>
        </form>
      </MobileView>
    </>
  );
};

export default Login;
