import { createContext, useContext, useEffect, useState } from "react";

export const StudentContext = createContext();

const API_URL = "http://localhost:5132/api/Students";

export const StudentProvider = ({ children }) => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // GET STUDENTS
    const fetchStudents = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await fetch(API_URL);

            if (!response.ok) {
                throw new Error("Failed to fetch students");
            }

            const data = await response.json();

            setStudents(data);
        } catch (error) {
            console.error("Error fetching students:", error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    // ADD STUDENT - POST
    const addStudent = async (student) => {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(student),
        });

        if (!response.ok) {
            throw new Error("Failed to add student");
        }

        const newStudent = await response.json();

        setStudents((currentStudents) => [
            ...currentStudents,
            newStudent,
        ]);

        return newStudent;
    };

    // UPDATE STUDENT - PUT
    const updateStudent = async (id, student) => {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(student),
        });

        if (!response.ok) {
            throw new Error("Failed to update student");
        }

        const updatedStudent = await response.json();

        setStudents((currentStudents) =>
            currentStudents.map((student) =>
                student.id === id ? updatedStudent : student
            )
        );

        return updatedStudent;
    };

    // DELETE STUDENT - DELETE
    const deleteStudent = async (id) => {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "DELETE",
        });

        if (!response.ok) {
            throw new Error("Failed to delete student");
        }

        setStudents((currentStudents) =>
            currentStudents.filter(
                (student) => student.id !== id
            )
        );
    };

    // LOAD STUDENTS WHEN APP STARTS
    useEffect(() => {
        fetchStudents();
    }, []);

    return (
        <StudentContext.Provider
            value={{
                students,
                setStudents,
                loading,
                error,
                fetchStudents,
                addStudent,
                updateStudent,
                deleteStudent,
            }}
        >
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