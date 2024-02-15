import { SetStateAction, useState, useEffect } from "react";
import { Input, InputGroup, InputRightElement, Button } from "@chakra-ui/react";
import { BrowserView, MobileView } from "react-device-detect";
import { useAuth } from "@/context/auth";
import "./Login.scss";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
// import { redirect } from "react-router-dom";

const Login = () => {
  const [loginValue, setLoginValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [show, setShow] = useState(false);
  const { login } = useAuth();
  const { role } = useAuth();
  const { user } = useAuth();
  const handleLoginChange = (event: { target: { value: SetStateAction<string>; }; }) => setLoginValue(event.target.value);
  const handlePasswordChange = (event: { target: { value: SetStateAction<string>; }; }) => setPasswordValue(event.target.value);
  const handleClick = () => setShow(!show);
  async function handleSubmit() {
    await login({email: loginValue, password: passwordValue});
    localStorage.setItem("role", role);
    localStorage.setItem( "user", JSON.stringify(user));
  };


/*  function handleRoleCheck() {
    console.log(localStorage.getItem("role"))
    if (localStorage.getItem("role") == "joueur") {
      redirect("/player");
      console.log("oui");
    } if (localStorage.getItem("role") == "scout") {
      redirect("/scout");
      console.log("non");
    } else {
      return null;
    }
  }
  */

  useEffect(() => {
    console.log(localStorage.getItem("role"));
  }, [{ login }]);

  return (
    <>
      <BrowserView>
      <form>
        <div className="login_container">
          <div className="input_container">
            <div className="login_input">
              <Input
                width="auto"
                htmlSize={24}
                value={loginValue}
                onChange={handleLoginChange}
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
            <a href="/player">
              <Button colorScheme="teal" onClick={handleSubmit}> Se connecter </Button>
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
                value={loginValue}
                onChange={handleLoginChange}
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
                    value={passwordValue}
                    onChange={handlePasswordChange}
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
              <Button colorScheme="teal" onClick={handleSubmit}>Se connecter</Button>                           
            </div>
          </div>
        </div>
        </form>
      </MobileView>
    </>
  );
};

export default Login;
