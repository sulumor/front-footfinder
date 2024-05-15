import { isMobile } from "react-device-detect";
import { useAppDispatch } from "@/hooks/redux";
import { logout } from "@/redux/Redux-reducers/user";
import {
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Flex,
  Text,
  Center
} from "@chakra-ui/react";

import {
  CloseIcon,
  HamburgerIcon,
} from "@chakra-ui/icons";
import axios from "axios";
import { NavLink } from "react-router-dom";

export const PlayerNavbar = () : JSX.Element => {

    const dispatch = useAppDispatch();

    const handleDisconect = async () => {
        await axios.delete("http://localhost:3000/refresh_token");
        dispatch(logout());
      };

  return isMobile ? (
    <Flex h="10vh" w="100%" align="center" justify="space-between" px="1rem">
          <NavLink to="/player">
        <Text textStyle="navBar">
          FootFinder
        </Text>
      </NavLink>
      <Center>
        <Menu>
          {({isOpen}) => (
            <>
              <MenuButton
                isActive={isOpen}
                as={IconButton}
                aria-label="Options"
                icon={isOpen ? <CloseIcon/>: <HamburgerIcon />}
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
          <NavLink to="/">
            <Button variant="inverse" onClick={handleDisconect}>Déconnexion</Button>
          </NavLink>
        </Flex> 
      </Flex>     
     )   
  
    
};
