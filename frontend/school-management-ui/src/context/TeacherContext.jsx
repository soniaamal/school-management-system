import { createContext, useContext, useEffect, useState } from "react";

export const TeacherContext = createContext();

const API_URL = "http://localhost:5132/api/Teachers";

export const TeacherProvider = ({ children }) => {
    const [teachers, setTeachers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // GET TEACHERS
    const fetchTeachers = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await fetch(API_URL);

            if (!response.ok) {
                throw new Error("Failed to fetch teachers");
            }

            const data = await response.json();

            setTeachers(data);
        } catch (error) {
            console.error("Error fetching teachers:", error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    // ADD TEACHER - POST
    const addTeacher = async (teacher) => {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(teacher),
        });

        if (!response.ok) {
            throw new Error("Failed to add teacher");
        }

        const newTeacher = await response.json();

        setTeachers((currentTeachers) => [
            ...currentTeachers,
            newTeacher,
        ]);

        return newTeacher;
    };

    // UPDATE TEACHER - PUT
    const updateTeacher = async (id, teacher) => {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(teacher),
        });

        if (!response.ok) {
            throw new Error("Failed to update teacher");
        }

        const updatedTeacher = await response.json();

        setTeachers((currentTeachers) =>
            currentTeachers.map((teacher) =>
                teacher.id === id ? updatedTeacher : teacher
            )
        );

        return updatedTeacher;
    };

    // DELETE TEACHER - DELETE
    const deleteTeacher = async (id) => {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "DELETE",
        });

        if (!response.ok) {
            throw new Error("Failed to delete teacher");
        }

        setTeachers((currentTeachers) =>
            currentTeachers.filter(
                (teacher) => teacher.id !== id
            )
        );
    };

    // LOAD TEACHERS WHEN APP STARTS
    useEffect(() => {
        fetchTeachers();
    }, []);

    return (
        <TeacherContext.Provider
            value={{
                teachers,
                setTeachers,
                loading,
                error,
                fetchTeachers,
                addTeacher,
                updateTeacher,
                deleteTeacher,
            }}
        >
            {children}
        </TeacherContext.Provider>
    );
};

export const useTeachers = () => {
    const context = useContext(TeacherContext);

    if (!context) {
        throw new Error(
            "useTeachers must be used inside TeacherProvider"
        );
    }

    return context;
};