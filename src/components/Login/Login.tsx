import { SetStateAction, useState } from "react";
import { Input, InputGroup, InputRightElement, Button } from "@chakra-ui/react";
import { BrowserView, MobileView } from "react-device-detect";

import "./Login.scss";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

const Login = () => {
  const [loginValue, setLoginValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [show, setShow] = useState(false);

  const handleLoginChange = (event: { target: { value: SetStateAction<string>; }; }) => setLoginValue(event.target.value);
  const handlePasswordChange = (event: { target: { value: SetStateAction<string>; }; }) => setPasswordValue(event.target.value);
  const handleClick = () => setShow(!show);

  return (
    <>
      <BrowserView>
        <div className="login_container">
          <div className="input_container">
            <div className="login_input">
              <Input
                width="auto"
                htmlSize={24}
                value={loginValue}
                onChange={handleLoginChange}
                placeholder="Login"
                size="sm"
              />
            </div>
            <div className="login_input">
              <div className="login_password">
                <InputGroup size="sm">
                  <Input
                    width="auto"
                    htmlSize={28}
                    value={passwordValue}
                    onChange={handlePasswordChange}
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
              <Button colorScheme="teal">Se connecter</Button>
            </div>
          </div>
        </div>
      </BrowserView>
      <MobileView>
        <div className="mobile_login_container">
          <div className="mobile_input_container">
            <div className="mobile_login_input">
              <Input
                htmlSize={20}
                width="auto"
                value={loginValue}
                onChange={handleLoginChange}
                placeholder="Login"
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
              <Button colorScheme="teal">Se connecter</Button>
            </div>
          </div>
        </div>
      </MobileView>
    </>
  );
};

export default Login;
