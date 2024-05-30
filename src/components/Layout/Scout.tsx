import { Box } from "@chakra-ui/react";
import { Navigate, Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import { colors } from "@/utils/theme";
import { ScoutNavbar } from "../Navbar/Scout";
import { useAuth } from "@/context/Auth";
import ErrorPage from "@/pages/Error/Error";

export function ScoutLayout(): JSX.Element {
  const { isAuthenticated, user } = useAuth();

  return !isAuthenticated ? 
    <Navigate to="/login"/>
  : user?.role !== "recruteur" ? (
    <ErrorPage/>
  ) : (
    <Box h="100vh">
      <ScoutNavbar />
      <Box backgroundColor={colors.lightGrey} minH="80vh">
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
}
