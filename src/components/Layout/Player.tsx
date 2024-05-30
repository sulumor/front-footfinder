import { Box } from "@chakra-ui/react";
import { Navigate, Outlet } from "react-router-dom";
import { PlayerNavbar } from "../Navbar/Player";
import Footer from "../Footer/Footer";
import { colors } from "@/utils/theme";
import { useAuth } from "@/context/Auth";
import ErrorPage from "@/pages/Error/Error";

export function PlayerLayout(): JSX.Element {
  const { isAuthenticated, user } = useAuth();

  return !isAuthenticated ? 
    <Navigate to="/login"/>
  : user?.role !== "joueur" ? (
    <ErrorPage/>
  ) : (
    <Box h="100vh">
      <PlayerNavbar />
      <Box backgroundColor={colors.lightGrey} minH="80vh">
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
}
