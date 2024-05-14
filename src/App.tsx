import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { tokenCheck } from "./redux/Redux-reducers/user";


import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import { useAppDispatch } from "./hooks/redux";
import { Box } from "@chakra-ui/react";
// import ErrorHandler from "../ErrorHandler/ErrorHandler";

const App = () => {

    const dispatch = useAppDispatch();
    
    useEffect(() => {
        if (localStorage.getItem("token")) {
          dispatch(tokenCheck());
        }
      }, []);

    return (
        <Box className="app" h="100vh">
            <Header />
            {/* <ErrorHandler/> */}
            <Outlet />
            <Footer />
        </Box>
    )
};

export default App