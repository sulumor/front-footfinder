import { isMobile } from "react-device-detect";
import {
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Flex,
  Text,
  Center,
} from "@chakra-ui/react";

import {
  CloseIcon,
  HamburgerIcon,
} from "@chakra-ui/icons";
import { NavLink } from "react-router-dom";

export function GuestNavbar() {
  return isMobile ? (
    <Flex h="10vh" w="100%" align="center" justify="space-between" px="1rem">
      <NavLink to="/">
        <Text textStyle="navBar">
          FootFinder
        </Text>
      </NavLink>
      <Center>
        <Menu>
          {({ isOpen }) => (
            <>
              <MenuButton
                isActive={isOpen}
                as={IconButton}
                aria-label="Options"
                icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
              />
              <MenuList>
                <MenuItem>
                  <NavLink to="/login">
                    <Button variant="redEvo">Se connecter</Button>
                  </NavLink>
                </MenuItem>
                <MenuItem>
                  <NavLink to="/signup">
                    <Button variant="inverse">S'inscrire</Button>
                  </NavLink>
                </MenuItem>
              </MenuList>
            </>
          )}
        </Menu>
      </Center>
    </Flex>
  ) : (
    <Flex h="10vh" w="100%" align="center" justify="space-between" px="1rem">
      <NavLink to="/">
        <Text textStyle="navBar">
          FootFinder
        </Text>
      </NavLink>
      <Flex align="center" justify="space-between" gap="0.5rem">
        <NavLink to="/login">
          <Button variant="redEvo">Se connecter</Button>
        </NavLink>
        <NavLink to="/signup">
          <Button variant="inverse">S'inscrire</Button>
        </NavLink>
      </Flex>
    </Flex>
  );
}
