import { useState } from "react";
import { useTeachers } from "../context/TeacherContext";

function Teachers() {
    const {
        teachers,
        addTeacher,
        updateTeacher,
        deleteTeacher,
    } = useTeachers();

    const [showForm, setShowForm] = useState(false);
    const [editingTeacher, setEditingTeacher] = useState(null);
    const [selectedTeacher, setSelectedTeacher] = useState(null);
    const [teacherToDelete, setTeacherToDelete] = useState(null);

    const [searchTerm, setSearchTerm] = useState("");
    const [error, setError] = useState("");

    const [formData, setFormData] = useState({
        name: "",
        subject: "",
        gender: "",
    });

    // ADD / UPDATE TEACHER
    const handleSaveTeacher = async () => {
        if (!formData.name.trim()) {
            setError("Please enter teacher name.");
            return;
        }

        if (!formData.subject.trim()) {
            setError("Please enter teacher subject.");
            return;
        }

        if (!formData.gender) {
            setError("Please select teacher gender.");
            return;
        }

        try {
            // UPDATE
            if (editingTeacher) {
                await updateTeacher(editingTeacher.id, {
                    teacherCode: editingTeacher.teacherCode,
                    name: formData.name,
                    subject: formData.subject,
                    gender: formData.gender,
                });
            }
            // ADD
            else {
                const numbers = teachers.map((teacher) => {
                    if (!teacher.teacherCode) {
                        return 0;
                    }

                    return (
                        parseInt(
                            teacher.teacherCode.replace("T", ""),
                            10
                        ) || 0
                    );
                });

                const nextNumber =
                    Math.max(0, ...numbers) + 1;

                const newTeacher = {
                    teacherCode: `T${String(
                        nextNumber
                    ).padStart(3, "0")}`,
                    name: formData.name,
                    subject: formData.subject,
                    gender: formData.gender,
                };

                await addTeacher(newTeacher);
            }

            // RESET FORM
            setFormData({
                name: "",
                subject: "",
                gender: "",
            });

            setEditingTeacher(null);
            setShowForm(false);
            setError("");
        } catch (error) {
            console.error("Teacher save error:", error);
            setError(
                editingTeacher
                    ? "Failed to update teacher."
                    : "Failed to add teacher."
            );
        }
    };

    // EDIT
    const handleEditTeacher = (teacher) => {
        setEditingTeacher(teacher);

        setFormData({
            name: teacher.name,
            subject: teacher.subject,
            gender: teacher.gender || "",
        });

        setError("");
        setShowForm(true);
    };

    // VIEW
    const handleViewTeacher = (teacher) => {
        setSelectedTeacher(teacher);
    };

    // OPEN DELETE MODAL
    const handleDeleteTeacher = (teacher) => {
        setTeacherToDelete(teacher);
    };

    // CONFIRM DELETE
    const confirmDeleteTeacher = async () => {
        if (!teacherToDelete) {
            return;
        }

        try {
            await deleteTeacher(teacherToDelete.id);

            setTeacherToDelete(null);
            setSelectedTeacher(null);
            setError("");
        } catch (error) {
            console.error("Teacher delete error:", error);
            setError("Failed to delete teacher.");
            setTeacherToDelete(null);
        }
    };

    // CANCEL FORM
    const handleCancel = () => {
        setShowForm(false);
        setEditingTeacher(null);

        setFormData({
            name: "",
            subject: "",
            gender: "",
        });

        setError("");
    };

    // SEARCH
    const filteredTeachers = teachers.filter((teacher) => {
        const search = searchTerm.toLowerCase();

        return (
            teacher.name?.toLowerCase().includes(search) ||
            teacher.subject?.toLowerCase().includes(search) ||
            String(teacher.id)
                .toLowerCase()
                .includes(search) ||
            teacher.teacherCode
                ?.toLowerCase()
                .includes(search)
        );
    });

    return (
        <div className="container-fluid p-4">

            {/* HEADER */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h1 className="mb-1">Teachers</h1>

                    <p className="text-muted mb-0">
                        Manage teacher records
                    </p>
                </div>

                <button
                    className="btn btn-primary"
                    onClick={() => {
                        setEditingTeacher(null);

                        setFormData({
                            name: "",
                            subject: "",
                            gender: "",
                        });

                        setError("");
                        setShowForm(true);
                    }}
                >
                    + Add Teacher
                </button>
            </div>

            {/* FORM */}
            {showForm && (
                <div className="card shadow-sm border-0 mb-4">
                    <div className="card-body">

                        <h5 className="fw-bold mb-4">
                            {editingTeacher
                                ? "Edit Teacher"
                                : "Add New Teacher"}
                        </h5>

                        {error && (
                            <div className="alert alert-danger">
                                {error}
                            </div>
                        )}

                        <div className="row g-3">

                            {/* NAME */}
                            <div className="col-md-4">
                                <label className="form-label">
                                    Teacher Name
                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter teacher name"
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

                            {/* SUBJECT */}
                            <div className="col-md-4">
                                <label className="form-label">
                                    Subject
                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter subject"
                                    value={formData.subject}
                                    onChange={(e) => {
                                        setFormData({
                                            ...formData,
                                            subject: e.target.value,
                                        });

                                        setError("");
                                    }}
                                />
                            </div>

                            {/* GENDER */}
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

                        {/* BUTTONS */}
                        <div className="mt-4">

                            <button
                                className="btn btn-primary me-2"
                                onClick={handleSaveTeacher}
                            >
                                {editingTeacher
                                    ? "Update Teacher"
                                    : "Add Teacher"}
                            </button>

                            <button
                                className="btn btn-secondary"
                                onClick={handleCancel}
                            >
                                Cancel
                            </button>

                        </div>
                    </div>
                </div>
            )}

            {/* VIEW DETAILS */}
            {selectedTeacher && (
                <div className="card shadow-sm border-0 mb-4">
                    <div className="card-body">

                        <div className="d-flex justify-content-between align-items-center mb-4">

                            <h5 className="fw-bold mb-0">
                                Teacher Details
                            </h5>

                            <button
                                className="btn btn-sm btn-secondary"
                                onClick={() =>
                                    setSelectedTeacher(null)
                                }
                            >
                                Close
                            </button>

                        </div>

                        <div className="row g-3">

                            <div className="col-md-6">
                                <strong>Teacher ID:</strong>

                                <p className="text-muted">
                                    {selectedTeacher.id}
                                </p>
                            </div>

                            <div className="col-md-6">
                                <strong>Teacher Code:</strong>

                                <p className="text-muted">
                                    {selectedTeacher.teacherCode}
                                </p>
                            </div>

                            <div className="col-md-6">
                                <strong>Name:</strong>

                                <p className="text-muted">
                                    {selectedTeacher.name}
                                </p>
                            </div>

                            <div className="col-md-6">
                                <strong>Subject:</strong>

                                <p className="text-muted">
                                    {selectedTeacher.subject}
                                </p>
                            </div>

                            <div className="col-md-6">
                                <strong>Gender:</strong>

                                <p className="text-muted">
                                    {selectedTeacher.gender}
                                </p>
                            </div>

                        </div>
                    </div>
                </div>
            )}

            {/* TABLE */}
            <div className="card shadow-sm border-0">

                <div className="card-body">

                    {/* SEARCH */}
                    <div className="mb-4">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search teachers by name, subject or ID..."
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
                                    <th>Code</th>
                                    <th>Name</th>
                                    <th>Subject</th>
                                    <th>Gender</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>

                            <tbody>

                                {filteredTeachers.length > 0 ? (
                                    filteredTeachers.map(
                                        (teacher) => (
                                            <tr key={teacher.id}>

                                                <td>
                                                    {teacher.id}
                                                </td>

                                                <td>
                                                    {teacher.teacherCode}
                                                </td>

                                                <td>
                                                    {teacher.name}
                                                </td>

                                                <td>
                                                    {teacher.subject}
                                                </td>

                                                <td>
                                                    {teacher.gender}
                                                </td>

                                                <td>

                                                    {/* VIEW */}
                                                    <button
                                                        className="btn btn-sm btn-outline-primary me-2"
                                                        onClick={() =>
                                                            handleViewTeacher(
                                                                teacher
                                                            )
                                                        }
                                                    >
                                                        View
                                                    </button>

                                                    {/* EDIT */}
                                                    <button
                                                        className="btn btn-sm btn-outline-warning me-2"
                                                        onClick={() =>
                                                            handleEditTeacher(
                                                                teacher
                                                            )
                                                        }
                                                    >
                                                        Edit
                                                    </button>

                                                    {/* DELETE */}
                                                    <button
                                                        className="btn btn-sm btn-outline-danger"
                                                        onClick={() =>
                                                            handleDeleteTeacher(
                                                                teacher
                                                            )
                                                        }
                                                    >
                                                        Delete
                                                    </button>

                                                </td>

                                            </tr>
                                        )
                                    )
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="6"
                                            className="text-center py-5"
                                        >
                                            <h5 className="fw-bold mb-2">
                                                {searchTerm
                                                    ? "No Matching Teachers"
                                                    : "No Teachers Found"}
                                            </h5>

                                            <p className="text-muted mb-0">
                                                {searchTerm
                                                    ? "No teachers match your search."
                                                    : "There are no teachers to display."}
                                            </p>
                                        </td>
                                    </tr>
                                )}

                            </tbody>

                        </table>

                    </div>
                </div>
            </div>

            {/* DELETE MODAL */}
            {teacherToDelete && (
                <div
                    className="modal fade show d-block"
                    tabIndex="-1"
                    style={{
                        backgroundColor:
                            "rgba(0, 0, 0, 0.5)",
                    }}
                >
                    <div className="modal-dialog modal-dialog-centered">

                        <div className="modal-content">

                            <div className="modal-header">

                                <h5 className="modal-title">
                                    Delete Teacher
                                </h5>

                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() =>
                                        setTeacherToDelete(null)
                                    }
                                ></button>

                            </div>

                            <div className="modal-body">

                                <p className="mb-0">
                                    Are you sure you want to delete{" "}
                                    <strong>
                                        {teacherToDelete.name}
                                    </strong>
                                    ?
                                </p>

                            </div>

                            <div className="modal-footer">

                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() =>
                                        setTeacherToDelete(null)
                                    }
                                >
                                    Cancel
                                </button>

                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={confirmDeleteTeacher}
                                >
                                    Delete Teacher
                                </button>

                            </div>

                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}

export default Teachers;