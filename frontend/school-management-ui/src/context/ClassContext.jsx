import { createContext, useContext, useState, useEffect } from "react";

export const ClassContext = createContext();

export const ClassProvider = ({ children }) => {
    const [classes, setClasses] = useState(() => {
        const savedClasses = localStorage.getItem("classes");

        return savedClasses
            ? JSON.parse(savedClasses)
            : [
                {
                    id: "C001",
                    name: "Class 7",
                    section: "A",
                    teacher: "Ali Khan",
                },
                {
                    id: "C002",
                    name: "Class 4",
                    section: "A",
                    teacher: "Sara Khan",
                },
                {
                    id: "C003",
                    name: "Class 6",
                    section: "B",
                    teacher: "Usaman Ali",
                },
                
            ];
    });

    useEffect(() => {
        localStorage.setItem("classes", JSON.stringify(classes));
    }, [classes]);

    return (
        <ClassContext.Provider value={{ classes, setClasses }}>
            {children}
        </ClassContext.Provider>
    );
};

export const useClasses = () => {
    const context = useContext(ClassContext);

    if (!context) {
        throw new Error(
            "useClasses must be used inside ClassProvider"
        );
    }

    return context;
};