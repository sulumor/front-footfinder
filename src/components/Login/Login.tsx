import { FormEvent, useState } from "react";
import { Input, InputGroup, InputRightElement, Button } from "@chakra-ui/react";
import { BrowserView, MobileView } from "react-device-detect";
import "./Login.scss";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useAppDispatch } from "../hooks/redux";
import { login } from "../store/reducers/user";
import { useSelector } from "react-redux";

const Login = () => {

  const logged = useSelector((state: any) => state.user.logged);
  const role = useSelector((state: any) => state.user.role);

  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  
  const dispatch = useAppDispatch();

  const [formValues, setFormValues] = useState({
    email: "jean.dujardin@mail.io",
    password: "yjjk8E676a9JQZ",
  });
  
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {;
    dispatch(login(formValues));
  };

  const handleChangeField = (name: "email" | "password") => (value: string) => {
    setFormValues({ ...formValues, [name]: value });
  };

  console.log("logged :", logged);
  console.log("role:", role);

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
                  onChange={handleChangeField("email")}
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
                      onChange={handleChangeField("password")}
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
                <a href="/player">
                <Button colorScheme="teal" onClick={handleSubmit}>               
                  Se connecter
                </Button>
                </a>
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
                  onChange={handleChangeField("email")}
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
                      onChange={handleChangeField("password")}
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
