import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { PlayerNavbar } from "../Navbar/Player";
import Footer from "../Footer/Footer";
import { colors } from "@/utils/theme";

export function PlayerLayout(): JSX.Element {
  return (
    <Box h="100vh">
      <PlayerNavbar />
      <Box backgroundColor={colors.lightGrey} minH="80vh">
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
}
