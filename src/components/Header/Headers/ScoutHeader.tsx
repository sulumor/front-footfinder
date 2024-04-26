import { BrowserView, MobileView } from "react-device-detect";
import {
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
} from "@chakra-ui/react";

import {
  HamburgerIcon,
  SearchIcon,
  SmallCloseIcon,
} from "@chakra-ui/icons";

import { useAppDispatch } from "@/hooks/redux";
import { logout } from "@/redux/Redux-reducers/user";

import "../Header.scss";

const ScoutHeader = () => {

  const dispatch = useAppDispatch();

    const handleDisconect = () => {
        dispatch(logout());
      };

  return (
    <>
      <BrowserView>
        <div className="header">
          <a href="/scout">
            <h1>FootFinder</h1>
          </a>
          <div className="header_buttons">
            <a href="/scout/search">
              <Button colorScheme="teal">Recherche</Button>
            </a>
            <a href="/">
              <Button colorScheme="red" onClick={handleDisconect}>Déconnexion</Button>
            </a>
          </div>      
        </div>
      </BrowserView>
      <MobileView>
        <div className="mobile_header">
          <a href="/scout">
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
                <a href="/scout/search">
                <MenuItem icon={<SearchIcon />}>
                  Recherche
                </MenuItem></a>
                <a href="/">
                <MenuItem icon={<SmallCloseIcon />} onClick={handleDisconect}>
                  Déconnexion
                </MenuItem></a>
              </MenuList>
            </Menu>
          </div>
        </div>
      </MobileView>
    </>
  );
};

export default ScoutHeader;
