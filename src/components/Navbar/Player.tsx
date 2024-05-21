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
import { LogoutBtn } from "../Button";

export function PlayerNavbar(): JSX.Element {
  return isMobile ? (
    <Flex h="10vh" minH="4.375rem" w="100%" align="center" justify="space-between" px="1rem">
      <NavLink to="/player">
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
                  <NavLink to="/player/me">
                    <Button variant="redEvo">Profil</Button>
                  </NavLink>
                </MenuItem>
                <MenuItem>
                  <NavLink to="/player/match">
                    <Button colorScheme="teal">Matchs</Button>
                  </NavLink>
                </MenuItem>
                <MenuItem>
                  <LogoutBtn />
                </MenuItem>
              </MenuList>
            </>
          )}
        </Menu>
      </Center>

    </Flex>

  ) : (
    <Flex h="10vh" minH="4.375rem" w="100%" align="center" justify="space-between" px="1rem">
      <NavLink to="/player">
        <Text textStyle="navBar">
          FootFinder
        </Text>
      </NavLink>
      <Flex align="center" justify="space-between" gap="0.5rem">
        <NavLink to="/player/me">
          <Button variant="redEvo">Profil</Button>
        </NavLink>
        <NavLink to="/player/match">
          <Button colorScheme="teal">Matchs</Button>
        </NavLink>
        <LogoutBtn />
      </Flex>
    </Flex>
  );
}
