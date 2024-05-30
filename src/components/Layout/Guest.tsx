import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { GuestNavbar } from "../Navbar/Guest";
import Footer from "../Footer/Footer";
import { colors } from "@/utils/theme";

export function GuestLayout(): JSX.Element {
  return (
    <Box h="100vh">
      <GuestNavbar />
      <Box backgroundColor={colors.lightGrey} minH="80vh">
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
}
