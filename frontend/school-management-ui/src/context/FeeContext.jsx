import { Children } from "react";
import { createContext, useContext, useState, useEffect } from "react";

export const FeeContext = createContext();

export const FeeProvider = ({ children }) => {
    const [fees, setFees] = useState(() => {
        const savedFees = localStorage.getItem("fees");

        return savedFees
            ? JSON.parse(savedFees)
            : [];
    });

    useEffect(() => {
        localStorage.setItem(
            "fees",
            JSON.stringify(fees)
        );
    }, [fees]);

    return (
        <FeeContext.Provider value={{ fees, setFees }}>
            {children}
        </FeeContext.Provider>
    );
};

export const useFees = () => {
    const context = useContext(FeeContext);

    if (!context) {
        throw new Error(
            "useFees must be used inside FeeProvider"
        );
    }

    return context;
};