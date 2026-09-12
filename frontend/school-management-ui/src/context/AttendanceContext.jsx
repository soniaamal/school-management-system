import { createContext, useContext, useEffect, useState } from "react";

const AttendanceContext = createContext();

export function AttendanceProvider({ children }) {
    const [attendance, setAttendance] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const API_URL = "http://localhost:5132/api/Attendance";

    // GET Attendance
    const fetchAttendance = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await fetch(API_URL);

            if (!response.ok) {
                throw new Error("Failed to fetch attendance");
            }

            const data = await response.json();
            setAttendance(data);
        } catch (err) {
            setError(err.message);
            console.error("GET Attendance Error:", err);
        } finally {
            setLoading(false);
        }
    };

    // POST Attendance
    const addAttendance = async (attendanceData) => {
        try {
            setError("");

            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(attendanceData),
            });

            if (!response.ok) {
                throw new Error("Failed to add attendance");
            }

            const newAttendance = await response.json();

            setAttendance((prev) => [...prev, newAttendance]);

            return newAttendance;
        } catch (err) {
            setError(err.message);
            console.error("POST Attendance Error:", err);
            throw err;
        }
    };

    // PUT Attendance
    const updateAttendance = async (id, attendanceData) => {
        try {
            setError("");

            const response = await fetch(`${API_URL}/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(attendanceData),
            });

            if (!response.ok) {
                throw new Error("Failed to update attendance");
            }

            const updatedAttendance = await response.json();

            setAttendance((prev) =>
                prev.map((item) =>
                    item.id === id ? updatedAttendance : item
                )
            );

            return updatedAttendance;
        } catch (err) {
            setError(err.message);
            console.error("PUT Attendance Error:", err);
            throw err;
        }
    };

    // DELETE Attendance
    const deleteAttendance = async (id) => {
        try {
            setError("");

            const response = await fetch(`${API_URL}/${id}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error("Failed to delete attendance");
            }

            setAttendance((prev) =>
                prev.filter((item) => item.id !== id)
            );
        } catch (err) {
            setError(err.message);
            console.error("DELETE Attendance Error:", err);
            throw err;
        }
    };

    // Load attendance when application starts
    useEffect(() => {
        fetchAttendance();
    }, []);

    return (
        <AttendanceContext.Provider
            value={{
                attendance,
                loading,
                error,
                fetchAttendance,
                addAttendance,
                updateAttendance,
                deleteAttendance,
            }}
        >
            {children}
        </AttendanceContext.Provider>
    );
}

export function useAttendance() {
    const context = useContext(AttendanceContext);

    if (!context) {
        throw new Error(
            "useAttendance must be used inside AttendanceProvider"
        );
    }

    return context;
}