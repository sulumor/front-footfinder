import { BrowserView, MobileView } from "react-device-detect";
import {
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
} from "@chakra-ui/react";

import "./Header.scss";
import {
  EmailIcon,
  HamburgerIcon,
  PlusSquareIcon,
} from "@chakra-ui/icons";

const Header = () => {
  return (
    <>
      <BrowserView>
        <div className="header">
          <a href="/">
            <h1>FootFinder</h1>
          </a>
          <div className="header_buttons">
            <a href="/login">
              <Button colorScheme="red">Se connecter</Button>
            </a>
            <a href="/signin">
              <Button colorScheme="teal">S'inscrire</Button>
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

export default Header;
