import { BrowserView, MobileView } from "react-device-detect";
import { useAppDispatch } from "@/components/hooks/redux";
import { logout } from "@/components/store/reducers/user";
import {
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
} from "@chakra-ui/react";

import "../Header.scss";
import {
  EmailIcon,
  HamburgerIcon,
  PlusSquareIcon,
} from "@chakra-ui/icons";

const PlayerHeader = () => {

    const dispatch = useAppDispatch();

    const handleDisconect = () => {;
        dispatch(logout());
      };

  return (
    <>
      <BrowserView>
        <div className="header">
          <a href="/player">
            <h1>FootFinder</h1>
          </a>
          <div className="header_buttons">
          <a href="/player/me">
              <Button colorScheme="blue">Profil</Button>
            </a>
            <a href="/player/match">
              <Button colorScheme="teal">Historique</Button>
            </a>
            <a href="/">
              <Button colorScheme="red" onClick={handleDisconect}>Déconnexion</Button>
            </a>
          </div>      
        </div>
      </BrowserView>
      <MobileView>
        <div className="mobile_header">
          <a href="/">
            <h1>FootFinder</h1>
          </a>
          <div className="mobile_header_button">
            <Menu>
              <MenuButton
                as={IconButton}
                aria-label="Options"
                icon={<HamburgerIcon />}
                variant="outline"
                colorScheme="teal"
              />
              <MenuList>
                <a href="/login">
                <MenuItem icon={<EmailIcon />}>
                  Se connecter
                </MenuItem></a>
                <a href="/signin">
                <MenuItem icon={<PlusSquareIcon />}>
                  S'inscrire
                </MenuItem></a>
              </MenuList>
            </Menu>
          </div>
        </div>
      </MobileView>
    </>
  );
};

export default PlayerHeader;
