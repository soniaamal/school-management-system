import { createContext, useContext, useState, useEffect } from "react";

export const ClassContext = createContext();

const API_URL = "http://localhost:5132/api/Classes";


export const ClassProvider = ({ children }) => {
    const [classes, setClasses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
        //() => {
 // Get all classes from backend
    const fetchClasses = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await fetch(API_URL);

            if (!response.ok) {
                throw new Error("Failed to fetch classes");
            }

            const data = await response.json();

            setClasses(data);
        } catch (error) {
            console.error("Error fetching classes:", error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    // Add a new class
    const addClass = async (classItem) => {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(classItem),
        });

        if (!response.ok) {
            throw new Error("Failed to add class");
        }

        const newClass = await response.json();

        setClasses((currentClasses) => [
            ...currentClasses,
            newClass,
        ]);

        return newClass;
    };

    // Update an existing class
    const updateClass = async (id, classItem) => {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(classItem),
        });

        if (!response.ok) {
            throw new Error("Failed to update class");
        }

        const updatedClass = await response.json();

        setClasses((currentClasses) =>
            currentClasses.map((classItem) =>
                classItem.id === id
                    ? updatedClass
                    : classItem
            )
        );

        return updatedClass;
    };

    // Delete a class
    const deleteClass = async (id) => {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "DELETE",
        });

        if (!response.ok) {
            throw new Error("Failed to delete class");
        }

        setClasses((currentClasses) =>
            currentClasses.filter(
                (classItem) => classItem.id !== id
            )
        );
    };

    // Load classes when application starts
    useEffect(() => {
        fetchClasses();
    }, []);

    ///

    return (
        <ClassContext.Provider
            value={{
                classes,
                setClasses,
                loading,
                error,
                fetchClasses,
                addClass,
                updateClass,
                deleteClass,
            }}
        >
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