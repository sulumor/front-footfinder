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

import { useAppDispatch } from "@/hooks/redux";
import { logout } from "@/redux/Redux-reducers/user";
import { NavLink } from "react-router-dom";


export const ScoutNavbar = (): JSX.Element => {

  const dispatch = useAppDispatch();

  const handleDisconect = () => {
    dispatch(logout());
  };

  return isMobile ? (
    <Flex h="10vh" w="100%" align="center" justify="space-between" px="1rem">
      <NavLink to="/scout">
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
                  <NavLink to="/scout/search">
                    <Button variant="redEvo">Recherche</Button>
                  </NavLink>
                </MenuItem>
                <MenuItem>
                  <NavLink to="/">
                    <Button variant="inverse" onClick={handleDisconect}>Déconnexion</Button>
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
      <NavLink to="/scout">
        <Text textStyle="navBar">
          FootFinder
        </Text>
      </NavLink>
      <Flex align="center" justify="space-between" gap="0.5rem">
        <NavLink to="/scout/search">
          <Button variant="redEvo">Recherche</Button>
        </NavLink>
        <NavLink to="/">
          <Button variant="inverse" onClick={handleDisconect}>Déconnexion</Button>
        </NavLink>
      </Flex> 
    </Flex>     
  )
};

