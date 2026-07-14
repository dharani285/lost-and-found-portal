import { useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import AppRoutes from "./Routes/AppRoutes";


function App() {
    const location = useLocation();

    const hideNavbar =
        location.pathname === "/login" ||
        location.pathname === "/register";

    return (
        <>
            {!hideNavbar && <Navbar />}
            <AppRoutes />
        </>
    );
}

export default App;