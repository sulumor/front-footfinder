import { useEffect } from "react";
import GuestHeader from "./Headers/GuestHeader";
import PlayerHeader from "./Headers/PlayerHeader";
import ScoutHeader from "./Headers/ScoutHeader";
import { useAppSelector } from "../hooks/redux";

const Header = () => {

  const role = useAppSelector((state) => state.user.role );
  
  useEffect(() => {

  }, [role]);


  if (role == "joueur") {
    return <PlayerHeader />;
  } else if (role == "recruteur") {
    return <ScoutHeader />;
  } else {
    return <GuestHeader />;
  }
};

export default Header;
