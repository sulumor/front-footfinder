import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Divider,
  Text,
  Input,
  Button,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Center,
} from "@chakra-ui/react";

import { BrowserView, MobileView } from "react-device-detect";

import "./Signin.scss";
import { SetStateAction, useState } from "react";

const Signin = () => {
  const [value, setValue] = useState("");
  const [nameValue, setNameValue] = useState("");
  const [famNameValue, setFamNameValue] = useState("");
  const [mailValue, setMailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const handleNameChange = (event: {
    target: { value: SetStateAction<string> };
  }) => setNameValue(event.target.value);
  const handleFamNameChange = (event: {
    target: { value: SetStateAction<string> };
  }) => setFamNameValue(event.target.value);
  const handleMailChange = (event: {
    target: { value: SetStateAction<string> };
  }) => setMailValue(event.target.value);
  const handlePasswordChange = (event: {
    target: { value: SetStateAction<string> };
  }) => setPasswordValue(event.target.value);
  const handleChange = (event: { target: { value: SetStateAction<string> } }) =>
    setValue(event.target.value);

  return (
    <>
      <BrowserView>
        <div className="signin_container">
          <Tabs variant="soft-rounded" colorScheme="teal">
            <TabList>
              <Tab>Joueur</Tab>
              <Tab>Recruteur</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <p>
                  Vous êtes un <b>joueur</b> :
                </p>
                <div className="horizontal_divider">
                  <Divider />
                </div>
                <div className="panel">
                  <div className="left_panel">
                    <Text mb="8px">Prénom</Text>
                    <Input
                      value={nameValue}
                      onChange={handleNameChange}
                      size="sm"
                    />
                    <Text mb="8px">Nom</Text>
                    <Input
                      value={famNameValue}
                      onChange={handleFamNameChange}
                      size="sm"
                    />
                    <Text mb="8px">E-mail</Text>
                    <Input
                      value={mailValue}
                      onChange={handleMailChange}
                      size="sm"
                    />
                  </div>
                  <Center height="180px">
                    <Divider orientation="vertical" />
                  </Center>
                  <div className="right_panel">
                    <Text mb="8px">Mot de passe</Text>
                    <Input
                      value={passwordValue}
                      onChange={handlePasswordChange}
                      type="password"
                    />
                    <Text mb="8px">Confirmation du mot de passe</Text>
                    <Input
                      value={value}
                      onChange={handleChange}
                      type="password"
                    />
                  </div>
                </div>
                {passwordValue !== value && value.length > 0 && (
                  <Alert status="error">
                    <AlertIcon />
                    <AlertTitle>Mots de passe non correspondants.</AlertTitle>
                    <AlertDescription>
                      Merci de vérifier la correspondance.
                    </AlertDescription>
                  </Alert>
                )}
                <Button colorScheme="red">Je m'inscris</Button>
              </TabPanel>
              <TabPanel>
                <p>
                  Vous êtes un <b>recruteur</b> :
                </p>
                <div className="horizontal_divider">
                  <Divider />
                </div>
                <div className="panel">
                  <div className="left_panel">
                    <Text mb="8px">Prénom</Text>
                    <Input
                      value={nameValue}
                      onChange={handleNameChange}
                      size="sm"
                    />
                    <Text mb="8px">Nom</Text>
                    <Input
                      value={famNameValue}
                      onChange={handleFamNameChange}
                      size="sm"
                    />
                    <Text mb="8px">E-mail</Text>
                    <Input
                      value={mailValue}
                      onChange={handleMailChange}
                      size="sm"
                    />
                  </div>
                  <Center height="180px">
                    <Divider orientation="vertical" />
                  </Center>
                  <div className="right_panel">
                    <Text mb="8px">Mot de passe</Text>
                    <Input
                      value={passwordValue}
                      onChange={handlePasswordChange}
                      type="password"
                    />
                    <Text mb="8px">Confirmation du mot de passe</Text>
                    <Input
                      value={value}
                      onChange={handleChange}
                      type="password"
                    />
                  </div>
                </div>
                {passwordValue !== value && value.length > 0 && (
                  <Alert status="error">
                    <AlertIcon />
                    <AlertTitle>Mots de passe non correspondants.</AlertTitle>
                    <AlertDescription>
                      Merci de vérifier la correspondance.
                    </AlertDescription>
                  </Alert>
                )}
                <Button colorScheme="red">Je m'inscris</Button>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </div>
      </BrowserView>
      <MobileView>
        <div className="mobile_signin_container">
          <Tabs variant="soft-rounded" colorScheme="teal">
            <TabList>
              <Tab>Joueur</Tab>
              <Tab>Recruteur</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <p>
                  Vous êtes un <b>joueur</b> :
                </p>
                <div className="mobile_horizontal_divider">
                  <Divider />
                </div>
                <div className="mobile_panel">
                  <div className="mobile_left_panel">
                    <Text mb="8px">Prénom</Text>
                    <Input
                      value={nameValue}
                      onChange={handleNameChange}
                      size="sm"
                    />
                    <Text mb="8px">Nom</Text>
                    <Input
                      value={famNameValue}
                      onChange={handleFamNameChange}
                      size="sm"
                    />
                    <Text mb="8px">E-mail</Text>
                    <Input
                      value={mailValue}
                      onChange={handleMailChange}
                      size="sm"
                    />
                  </div>
                  <div className="mobile_right_panel">
                    <Text mb="8px">Mot de passe</Text>
                    <Input
                      value={passwordValue}
                      onChange={handlePasswordChange}
                      type="password"
                    />
                    <Text mb="8px">Confirmation du mot de passe</Text>
                    <Input
                      value={value}
                      onChange={handleChange}
                      type="password"
                    />
                  </div>
                </div>
                {passwordValue !== value && value.length > 0 && (
                  <Alert status="error">
                    <AlertIcon />
                    <AlertTitle>Mots de passe non correspondants.</AlertTitle>
                  </Alert>
                )}
                <Button colorScheme="red">Je m'inscris</Button>
              </TabPanel>
              <TabPanel>
                <p>
                  Vous êtes un <b>recruteur</b> :
                </p>
                <div className="mobile_horizontal_divider">
                  <Divider />
                </div>
                <div className="mobile_panel">
                  <div className="left_panel">
                    <Text mb="8px">Prénom</Text>
                    <Input
                      value={nameValue}
                      onChange={handleNameChange}
                      size="sm"
                    />
                    <Text mb="8px">Nom</Text>
                    <Input
                      value={famNameValue}
                      onChange={handleFamNameChange}
                      size="sm"
                    />
                    <Text mb="8px">E-mail</Text>
                    <Input
                      value={mailValue}
                      onChange={handleMailChange}
                      size="sm"
                    />
                  </div>
                  <div className="right_panel">
                    <Text mb="8px">Mot de passe</Text>
                    <Input
                      value={passwordValue}
                      onChange={handlePasswordChange}
                      type="password"
                    />
                    <Text mb="8px">Confirmation du mot de passe</Text>
                    <Input
                      value={value}
                      onChange={handleChange}
                      type="password"
                    />
                  </div>
                </div>
                {passwordValue !== value && value.length > 0 && (
                  <Alert status="error">
                    <AlertIcon />
                    <AlertTitle>Mots de passe non correspondants.</AlertTitle>
                  </Alert>
                )}
                <Button colorScheme="red">Je m'inscris</Button>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </div>
      </MobileView>
    </>
  );
};

export default Signin;
