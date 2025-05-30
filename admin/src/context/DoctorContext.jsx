import { useState, useEffect } from "react";
import { createContext } from "react";

export const DoctorContext = createContext();

const DoctorContextProvider = (props) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [dToken, setDToken] = useState(null);

    // Load token from localStorage on initial render
    useEffect(() => {
        const token = localStorage.getItem("dToken");
        if (token) {
            setDToken(token);
        }
    }, []);

    // Update localStorage when token changes
    useEffect(() => {
        if (dToken) {
            localStorage.setItem("dToken", dToken);
        } else {
            localStorage.removeItem("dToken");
        }
    }, [dToken]);

    const value = {
        dToken,
        setDToken,
        backendUrl
    };

    return (
        <DoctorContext.Provider value={value}>
            {props.children}
        </DoctorContext.Provider>
    );
};

export default DoctorContextProvider;