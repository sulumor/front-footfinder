import { Box } from "@chakra-ui/react";
import { PlayerNavbar } from "../Navbar/Player";
import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import { colors } from "@/utils/theme";

export const PlayerLayout = (): JSX.Element => {
  return (
    <Box h="100vh">
      <PlayerNavbar/>
      <Box backgroundColor={colors.lightGrey} minH="80vh">
        <Outlet/>
      </Box>
      <Footer/>
    </Box>
  )
}