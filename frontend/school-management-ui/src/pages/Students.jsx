import { useState } from "react";
import { useStudents } from "../context/StudentContext";
import { useNavigate } from "react-router-dom";

function Students() {
    const navigate = useNavigate();

    const {
        students,
        addStudent,
        updateStudent,
        deleteStudent,
    } = useStudents();

    const [formData, setFormData] = useState({
        name: "",
        className: "",
        gender: "",
    });

    const [showForm, setShowForm] = useState(false);
    const [error, setError] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [editingStudent, setEditingStudent] = useState(null);
    const [studentToDelete, setStudentToDelete] = useState(null);

    // ADD / UPDATE STUDENT
    const handleAddStudent = async () => {
        // Validation
        if (!formData.name.trim()) {
            setError("Please enter student name.");
            return;
        }

        if (!formData.className.trim()) {
            setError("Please enter student class.");
            return;
        }

        if (!formData.gender) {
            setError("Please select student gender.");
            return;
        }

        // UPDATE STUDENT
        if (editingStudent) {
            try {
                await updateStudent(editingStudent.id, {
                    studentCode: editingStudent.studentCode,
                    name: formData.name,
                    className: formData.className,
                    gender: formData.gender,
                });

                setEditingStudent(null);

                setFormData({
                    name: "",
                    className: "",
                    gender: "",
                });

                setError("");
                setShowForm(false);
            } catch (error) {
                console.error("Error updating student:", error);
                setError("Failed to update student.");
            }

            return;
        }

        // ADD NEW STUDENT
        const newStudent = {
            studentCode: `ST${String(
                students.length + 1
            ).padStart(3, "0")}`,
            name: formData.name,
            className: formData.className,
            gender: formData.gender,
        };

        try {
            await addStudent(newStudent);

            setFormData({
                name: "",
                className: "",
                gender: "",
            });

            setError("");
            setShowForm(false);
        } catch (error) {
            console.error("Error adding student:", error);
            setError("Failed to add student.");
        }
    };

    // VIEW STUDENT
    const handleViewStudent = (student) => {
        navigate(`/students/${student.id}`);
    };

    // EDIT STUDENT
    const handleEditStudent = (student) => {
        setEditingStudent(student);

        setFormData({
            name: student.name,
            className: student.className,
            gender: student.gender,
        });

        setError("");
        setShowForm(true);
    };

    // OPEN DELETE MODAL
    const handleDeleteStudent = (student) => {
        setStudentToDelete(student);
    };

    // CONFIRM DELETE
    const confirmDeleteStudent = async () => {
        if (!studentToDelete) {
            return;
        }

        try {
            await deleteStudent(studentToDelete.id);

            setStudentToDelete(null);
        } catch (error) {
            console.error("Error deleting student:", error);
            setError("Failed to delete student.");
            setStudentToDelete(null);
        }
    };

    // SEARCH
    const filteredStudents = students.filter((student) =>
        student.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container-fluid p-4">

            {/* Page Header */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h1 className="mb-1">Students</h1>
                    <p className="text-muted mb-0">
                        Manage student records
                    </p>
                </div>

                <button
                    className="btn btn-primary"
                    onClick={() => {
                        setEditingStudent(null);
                        setFormData({
                            name: "",
                            className: "",
                            gender: "",
                        });
                        setError("");
                        setShowForm(true);
                    }}
                >
                    + Add Student
                </button>
            </div>

            {/* Add / Edit Student Form */}
            {showForm && (
                <div className="card shadow-sm border-0 mb-4">
                    <div className="card-body">

                        <h5 className="fw-bold mb-4">
                            {editingStudent
                                ? "Edit Student"
                                : "Add New Student"}
                        </h5>

                        {error && (
                            <div className="alert alert-danger">
                                {error}
                            </div>
                        )}

                        <div className="row g-3">

                            {/* Student Name */}
                            <div className="col-md-4">
                                <label className="form-label">
                                    Student Name
                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter student name"
                                    value={formData.name}
                                    onChange={(e) => {
                                        setFormData({
                                            ...formData,
                                            name: e.target.value,
                                        });

                                        setError("");
                                    }}
                                />
                            </div>

                            {/* Class */}
                            <div className="col-md-4">
                                <label className="form-label">
                                    Class
                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter class"
                                    value={formData.className}
                                    onChange={(e) => {
                                        setFormData({
                                            ...formData,
                                            className: e.target.value,
                                        });

                                        setError("");
                                    }}
                                />
                            </div>

                            {/* Gender */}
                            <div className="col-md-4">
                                <label className="form-label">
                                    Gender
                                </label>

                                <select
                                    className="form-select"
                                    value={formData.gender}
                                    onChange={(e) => {
                                        setFormData({
                                            ...formData,
                                            gender: e.target.value,
                                        });

                                        setError("");
                                    }}
                                >
                                    <option value="">
                                        Select Gender
                                    </option>

                                    <option value="Male">
                                        Male
                                    </option>

                                    <option value="Female">
                                        Female
                                    </option>
                                </select>
                            </div>
                        </div>

                        {/* Form Buttons */}
                        <div className="mt-4">

                            <button
                                className="btn btn-primary me-2"
                                onClick={handleAddStudent}
                            >
                                {editingStudent
                                    ? "Update Student"
                                    : "Add Student"}
                            </button>

                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={() => {
                                    setShowForm(false);
                                    setEditingStudent(null);

                                    setFormData({
                                        name: "",
                                        className: "",
                                        gender: "",
                                    });

                                    setError("");
                                }}
                            >
                                Cancel
                            </button>

                        </div>
                    </div>
                </div>
            )}

            {/* Student Table */}
            <div className="card shadow-sm border-0">

                <div className="card-body">

                    {/* Search */}
                    <div className="mb-4">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search students..."
                            value={searchTerm}
                            onChange={(e) =>
                                setSearchTerm(e.target.value)
                            }
                        />
                    </div>

                    <div className="table-responsive">

                        <table className="table table-hover align-middle">

                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Class</th>
                                    <th>Gender</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>

                            <tbody>

                                {filteredStudents.length > 0 ? (
                                    filteredStudents.map((student) => (
                                        <tr key={student.id}>

                                            <td>{student.id}</td>

                                            <td>{student.name}</td>

                                            <td>{student.className}</td>

                                            <td>{student.gender}</td>

                                            <td>

                                                {/* View */}
                                                <button
                                                    className="btn btn-sm btn-outline-primary me-2"
                                                    onClick={() =>
                                                        handleViewStudent(student)
                                                    }
                                                >
                                                    View
                                                </button>

                                                {/* Edit */}
                                                <button
                                                    className="btn btn-sm btn-outline-warning me-2"
                                                    onClick={() =>
                                                        handleEditStudent(student)
                                                    }
                                                >
                                                    Edit
                                                </button>

                                                {/* Delete */}
                                                <button
                                                    className="btn btn-sm btn-outline-danger"
                                                    onClick={() =>
                                                        handleDeleteStudent(student)
                                                    }
                                                >
                                                    Delete
                                                </button>

                                            </td>

                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="5"
                                            className="text-center py-5"
                                        >
                                            <h5 className="fw-bold mb-2">
                                                {searchTerm
                                                    ? "No Matching Students"
                                                    : "No Student Found"}
                                            </h5>

                                            <p className="text-muted mb-0">
                                                {searchTerm
                                                    ? "No students match your search."
                                                    : "There are no students to display."}
                                            </p>
                                        </td>
                                    </tr>
                                )}

                            </tbody>

                        </table>

                    </div>
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            {studentToDelete && (
                <div
                    className="modal fade show d-block"
                    tabIndex="-1"
                    style={{
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                    }}
                >
                    <div className="modal-dialog modal-dialog-centered">

                        <div className="modal-content">

                            <div className="modal-header">

                                <h5 className="modal-title">
                                    Delete Student
                                </h5>

                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() =>
                                        setStudentToDelete(null)
                                    }
                                ></button>

                            </div>

                            <div className="modal-body">

                                <p className="mb-0">
                                    Are you sure you want to delete{" "}
                                    <strong>
                                        {studentToDelete.name}
                                    </strong>
                                    ?
                                </p>

                            </div>

                            <div className="modal-footer">

                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() =>
                                        setStudentToDelete(null)
                                    }
                                >
                                    Cancel
                                </button>

                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={confirmDeleteStudent}
                                >
                                    Delete Student
                                </button>

                            </div>

                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}

export default Students;