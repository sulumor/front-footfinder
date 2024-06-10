import { Button } from "@chakra-ui/react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { useAuth } from "@/context/Auth";

export function LogoutBtn() : JSX.Element {
  const { logout } = useAuth();

  const handleDisconect = async () => {
    await axios.delete(`${import.meta.env.VITE_BACK}/refresh_token`);
    logout();
  };
  return (
    <NavLink to="/">
      <Button variant="inverse" onClick={handleDisconect}>Déconnexion</Button>
    </NavLink>
  );
}
