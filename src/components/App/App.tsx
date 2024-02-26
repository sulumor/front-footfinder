import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { tokenCheck } from "../store/reducers/user";


import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import { useAppDispatch } from "../hooks/redux";

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
            <Outlet />
            <Footer />
        </div>
    )
};

export default App