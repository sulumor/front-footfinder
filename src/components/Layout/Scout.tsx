import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import { colors } from "@/utils/theme";
import { ScoutNavbar } from "../Navbar/Scout";

export function ScoutLayout(): JSX.Element {
  return (
    <Box h="100vh">
      <ScoutNavbar />
      <Box backgroundColor={colors.lightGrey} minH="80vh">
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
}
