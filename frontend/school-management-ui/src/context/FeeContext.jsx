import { createContext, useContext, useState, useEffect } from "react";

export const FeeContext = createContext();

const API_URL = "http://localhost:5132/api/Fee";

export const FeeProvider = ({ children }) => {
    const [fees, setFees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Get all fees
    const fetchFees = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await fetch(API_URL);

            if (!response.ok) {
                throw new Error("Failed to fetch fees");
            }

            const data = await response.json();

            setFees(data);
        } catch (error) {
            console.error("Error fetching fees:", error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    // Add fee
    const addFee = async (fee) => {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(fee),
        });

        if (!response.ok) {
            throw new Error("Failed to add fee");
        }

        const newFee = await response.json();

        setFees((currentFees) => [
            ...currentFees,
            newFee,
        ]);

        return newFee;
    };

    // Update fee
    const updateFee = async (id, fee) => {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(fee),
        });

        if (!response.ok) {
            throw new Error("Failed to update fee");
        }

        const updatedFee = await response.json();

        setFees((currentFees) =>
            currentFees.map((feeItem) =>
                feeItem.id === id
                    ? updatedFee
                    : feeItem
            )
        );

        return updatedFee;
    };

    // Delete fee
    const deleteFee = async (id) => {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "DELETE",
        });

        if (!response.ok) {
            throw new Error("Failed to delete fee");
        }

        setFees((currentFees) =>
            currentFees.filter(
                (feeItem) => feeItem.id !== id
            )
        );
    };

    // Load fees when application starts
    useEffect(() => {
        fetchFees();
    }, []);

    return (
        <FeeContext.Provider
            value={{
                fees,
                setFees,
                loading,
                error,
                fetchFees,
                addFee,
                updateFee,
                deleteFee,
            }}
        >
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