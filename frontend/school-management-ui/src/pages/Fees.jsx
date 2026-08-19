import { useState } from "react";
import { useStudents } from "../context/StudentContext";
import { useFees } from "../context/FeeContext";

function Fees() {
    const { students } = useStudents();
    const { fees, setFees } = useFees();

    const [showForm, setShowForm] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [editingFee, setEditingFee] = useState(null);
    const [selectedFee, setSelectedFee] = useState(null);

    const [formData, setFormData] = useState({
        studentId: "",
        amount: "",
        status: "Pending",
    });

    const filteredFees = fees.filter((fee) =>
    fee.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    fee.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    fee.className.toLowerCase().includes(searchTerm.toLowerCase()) ||
    fee.status.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalFees = fees.reduce(
    (total, fee) => total + Number(fee.amount),
    0
);

const paidFees = fees
    .filter((fee) => fee.status === "Paid")
    .reduce(
        (total, fee) => total + Number(fee.amount),
        0
    );

const pendingFees = fees
    .filter((fee) => fee.status === "Pending")
    .reduce(
        (total, fee) => total + Number(fee.amount),
        0
    );

    
    const handleAddFee = () => {
        if (!formData.studentId || !formData.amount) {
            alert("Please select a student and enter fee amount.");
            return;
        }

        const selectedStudent = students.find(
            (student) => student.id === formData.studentId
        );

        if (!selectedStudent) {
            return;
        }

        // UPDATE existing fee
        if (editingFee) {
            const updatedFees = fees.map((fee) => {
                if (fee.id === editingFee.id) {
                    return {
                        ...fee,
                        studentId: selectedStudent.id,
                        studentName: selectedStudent.name,
                        className: selectedStudent.className,
                        amount: Number(formData.amount),
                        status: formData.status,
                    };
                }

                return fee;
            });

            setFees(updatedFees);
        } 
        
        // ADD new fee
        else {
            const newFee = {
                id: `FEE${String(
                    fees.reduce((max, fee) => {
                        const number = parseInt(fee.id.replace("FEE", ""), 10);
                        return number > max ? number : max;
                    }, 0) + 1
                ).padStart(3, "0")}`,
                studentId: selectedStudent.id,
                studentName: selectedStudent.name,
                className: selectedStudent.className,
                amount: Number(formData.amount),
                status: formData.status,
                createdAt: new Date().toISOString(),
            };

            setFees([...fees, newFee]);
        }

        setFormData({
            studentId: "",
            amount: "",
            status: "Pending",
        });

        setEditingFee(null);
        setShowForm(false);
    };
    const handleEditFee = (fee) => {
    setEditingFee(fee);

    setFormData({
        studentId: fee.studentId,
        amount: fee.amount,
        status: fee.status,
    });

    setShowForm(true);
    };
  const handleDeleteFee = (feeId) => {
    const confirmDelete = window.confirm(
        "Are you sure you want to delete this fee record?"
    );

    if (!confirmDelete) {
        return;
    }

    const updatedFees = fees.filter(
        (fee) => fee.id !== feeId
    );

    setFees(updatedFees);
    };  
    
    const handleViewFee = (fee) => {
    setSelectedFee(fee);
    };
    

    return (
        <div className="container-fluid p-4">
            <h1 className="mb-4">Fees</h1>

            <div className="row g-3 mb-4">

                <div className="col-md-3">
                    <div className="card shadow-sm border-0">
                        <div className="card-body">
                            <h6 className="text-muted">
                                Total Fees
                            </h6>

                            <h3 className="fw-bold">
                                Rs. {totalFees.toLocaleString()}
                            </h3>
                        </div>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="card shadow-sm border-0">
                        <div className="card-body">
                            <h6 className="text-muted">
                                Paid
                            </h6>

                            <h3 className="fw-bold text-success">
                                Rs. {paidFees.toLocaleString()}
                            </h3>
                        </div>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="card shadow-sm border-0">
                        <div className="card-body">
                            <h6 className="text-muted">
                                Pending
                            </h6>

                            <h3 className="fw-bold text-warning">
                                Rs. {pendingFees.toLocaleString()}
                            </h3>
                        </div>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="card shadow-sm border-0">
                        <div className="card-body">
                            <h6 className="text-muted">
                                Fee Records
                            </h6>

                            <h3 className="fw-bold">
                                {fees.length}
                            </h3>
                        </div>
                    </div>
                </div>

            </div>

            <div className="card shadow-sm border-0">
                <div className="card-body">

                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h5 className="fw-bold mb-0">
                            Student Fees
                        </h5>
                        <button
                            className="btn btn-primary"
                            onClick={() => setShowForm(true)}
                        >
                            Add Fee
                        </button>
                    </div>

                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search by student ID, name, class or status..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    {showForm && (
                        <div className="card border-0 bg-light mb-4">
                            <div className="card-body">

                                <h5 className="fw-bold mb-3">
                                    Add Fee
                                </h5>

                                <div className="row g-3">

                                    <div className="col-md-4">
                                        <label className="form-label">
                                            Student
                                        </label>

                                        <select
                                            className="form-select"
                                            value={formData.studentId}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    studentId: e.target.value,
                                                })
                                            }  
                                        >
                                            <option value="">
                                                Select Student
                                            </option>
                                            
                                            {students.map((student) => (
                                                <option
                                                    key={student.id}
                                                    value={student.id}
                                                >
                                                    {student.id} - {student.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="col-md-4">
                                        <label className="form-label">
                                            Fee Amount
                                        </label>

                                        <input
                                            type="number"
                                            className="form-control"
                                            placeholder="Enter amount"
                                            value={formData.amount}
                                            onChange={(e) => 
                                                setFormData({
                                                    ...formData,
                                                    amount: e.target.value,
                                                })
                                            }
                                        />
                                    </div>

                                    <div className="col-md-4">
                                        <label className="form-label">
                                            Status
                                        </label>

                                        <select
                                            className="form-select"
                                            value={formData.status}
                                            onChange={(e) => 
                                                setFormData({
                                                    ...formData,
                                                    status: e.target.value,
                                                })
                                            }
                                        >
                                            <option value="Pending">
                                                Pending
                                            </option>

                                            <option value="Paid">
                                                Paid
                                            </option>
                                        </select>
                                    </div>

                                </div>

                                <div className="mt-3">

                                    <button
                                        className="btn btn-success me-2"
                                        onClick={handleAddFee}
                                    >
                                        Save Fee
                                    </button>

                                    <button
                                        className="btn btn-secondary"
                                        onClick={() => setShowForm(false)}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>

                        </div>
                    )}

                    <div className="table-responsive">
                        <table className="table table-hover align-middle">

                            <thead>
                                <tr>
                                    <th>Student ID</th>
                                    <th>Student Name</th>
                                    <th>Class</th>
                                    <th>Fee Amount</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {filteredFees.length > 0 ? (
                                    filteredFees.map((fee) => (
                                        <tr key={fee.id}>
                                            <td>{fee.studentId}</td>

                                            <td>{fee.studentName}</td>

                                            <td>{fee.className}</td>

                                            <td>
                                                Rs. {fee.amount.toLocaleString()}
                                            </td>

                                            <td>
                                                <span
                                                    className={`badge ${
                                                        fee.status === "Paid"
                                                            ? "bg-success"
                                                            : "bg-warning text-dark"
                                                    }`}
                                                >
                                                    {fee.status}
                                                </span>
                                            </td>

                                            <td>
                                                <button className="btn btn-sm btn-outline-warning me-2"
                                                    onClick={() => handleEditFee(fee)}
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    className="btn btn-sm btn-outline-primary"
                                                    onClick={() => handleViewFee(fee)}
                                                >
                                                    View
                                                </button>
                                                <button
                                                    className="btn btn-sm btn-outline-danger "
                                                    onClick={() => handleDeleteFee(fee.id)}
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="6"
                                            className="text-center text-muted py-4"
                                        >
                                            No fee records found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>

                        </table>
                    </div>

                </div>
            </div>

            {selectedFee && (
                <div className="card shadow-sm border-0 mt-4">
                    <div className="card-body">

                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <h5 className="fw-bold mb-0">
                                Fee Details
                            </h5>

                            <button
                                className="btn btn-sm btn-secondary"
                                onClick={() => setSelectedFee(null)}
                            >
                                Close
                            </button>
                        </div>

                        <div className="row g-3">

                            <div className="col-md-6">
                                <strong>Fee ID:</strong>
                                <p className="text-muted">
                                    {selectedFee.id}
                                </p>
                            </div>

                            <div className="col-md-6">
                                <strong>Student ID:</strong>
                                <p className="text-muted">
                                    {selectedFee.studentId}
                                </p>
                            </div>

                            <div className="col-md-6">
                                <strong>Student Name:</strong>
                                <p className="text-muted">
                                    {selectedFee.studentName}
                                </p>
                            </div>

                            <div className="col-md-6">
                                <strong>Class:</strong>
                                <p className="text-muted">
                                    {selectedFee.className}
                                </p>
                            </div>

                            <div className="col-md-6">
                                <strong>Fee Amount:</strong>
                                <p className="text-muted">
                                    Rs. {selectedFee.amount.toLocaleString()}
                                </p>
                            </div>

                            <div className="col-md-6">
                                <strong>Status:</strong>
                                <p>
                                    <span
                                        className={`badge ${
                                            selectedFee.status === "Paid"
                                                ? "bg-success"
                                                : "bg-warning text-dark"
                                        }`}
                                    >
                                        {selectedFee.status}
                                    </span>
                                </p>
                            </div>

                        </div>
                    </div>
                </div>
            )}
            
        </div>
    );
}

export default Fees;