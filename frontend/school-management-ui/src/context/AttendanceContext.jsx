import { createContext, useContext, useState, useEffect } from "react";

export const AttendanceContext = createContext();

export const AttendanceProvider = ({ children }) => {
    const [attendance, setAttendance] = useState(() => {
        const savedAttendance = localStorage.getItem("attendance");

        return savedAttendance
            ? JSON.parse(savedAttendance)
            : [];
    });

    useEffect(() => {
        localStorage.setItem(
            "attendance",
            JSON.stringify(attendance)
        );
    }, [attendance]);

    return (
        <AttendanceContext.Provider
            value={{ attendance, setAttendance }}
        >
            {children}
        </AttendanceContext.Provider>
    );
};

export const useAttendance = () => {
    const context = useContext(AttendanceContext);

    if (!context) {
        throw new Error(
            "useAttendance must be used inside AttendanceProvider"
        );
    }

    return context;
};