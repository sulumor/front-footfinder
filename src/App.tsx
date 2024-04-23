import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { tokenCheck } from "./Redux-store/Redux-reducers/user";


import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import { useAppDispatch } from "./hooks/redux";
// import ErrorHandler from "../ErrorHandler/ErrorHandler";

const App = () => {

    const dispatch = useAppDispatch();
    
    useEffect(() => {
        if (localStorage.getItem("token")) {
          dispatch(tokenCheck());
        }
      }, []);

    return (
        <div className="app">
            <Header />
            {/* <ErrorHandler/> */}
            <Outlet />
            <Footer />
        </div>
    )
};

export default App