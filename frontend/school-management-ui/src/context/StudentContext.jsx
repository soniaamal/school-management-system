import { createContext, useContext, useState } from "react";

export const StudentContext = createContext();

export const StudentProvider = ({ children }) => {
      const [students, setStudents] = useState([
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
      ]);
      return (
    <StudentContext.Provider value={{ students, setStudents }}>
      {children}
    </StudentContext.Provider>
  );
};
