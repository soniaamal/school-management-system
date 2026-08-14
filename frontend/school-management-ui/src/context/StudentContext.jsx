import { createContext, useContext, useEffect, useState } from "react";

export const StudentContext = createContext();

export const StudentProvider = ({ children }) => {
    const [students, setStudents] = useState(() => {
        const savedStudents = localStorage.getItem("students");

        if (savedStudents) {
            return JSON.parse(savedStudents);
        }

        return [
            {
                id: "ST001",
                name: "Ahmed",
                className: "8",
                gender: "Male",
            },
            {
                id: "ST002",
                name: "Sara",
                className: "7",
                gender: "Female",
            },
            {
                id: "ST003",
                name: "Ali",
                className: "9",
                gender: "Male",
            },
        ];
    });

useEffect(() => {
    localStorage.setItem("students", JSON.stringify(students));
}, [students]);
      return (
    <StudentContext.Provider value={{ students, setStudents }}>
      {children}
    </StudentContext.Provider>
  );
};
export const useStudents = () => {
    const context = useContext(StudentContext);

     if (!context) {
        throw new Error(
            "useStudents must be used inside StudentProvider"
        );
    }

    return context;
};
