import { Button } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { useAuth } from "@/context/Auth";

export function LogoutBtn() : JSX.Element {
  const { logout } = useAuth();

  return (
    <NavLink to="/">
      <Button variant="inverse" onClick={logout}>Déconnexion</Button>
    </NavLink>
  );
}
