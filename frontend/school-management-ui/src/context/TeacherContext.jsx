import { Children, createContext, useContext, useEffect, useState } from "react";

export const TeacherContext = createContext();

export const TeacherProvider = ({ children }) => {

    const [teachers, setTeachers] = useState(() => {
        const savedTeachers = localStorage.getItem("teachers");

        if (savedTeachers) {
            return JSON.parse(savedTeachers);
        }

        return [
            {
                id: "T001",
                name: "Ali Khan",
                subject: "Mathematics",
                gender: "Male",
            },
            {
                id: "T002",
                name: "Sonia",
                subject: "Computer",
                gender: "Female",
            },
            {
                id: "T003",
                name: "Sofia",
                subject: "urdu",
                gender: "Female",
            },
        ];
    });

    useEffect(() => {
        localStorage.setItem("teachers", JSON.stringify(teachers));
    }, [teachers]);
    
    return (
        <TeacherContext.Provider value={{ teachers, setTeachers }}>
            {children}
        </TeacherContext.Provider>
    );
};

export const useTeachers = () => {
    const context = useContext(TeacherContext);

    if (!context) {
        throw new Error(
            "useTeacher must be used inside TeacherProvider"
        );
        
    }
    return context;
}