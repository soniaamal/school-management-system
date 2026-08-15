import { useState } from "react";
import { useTeachers } from "../context/TeacherContext";

function Teachers() {
    const { teachers, setTeachers } = useTeachers();
    
    const [showForm, setShowForm] = useState(false);

    const [editingTeacher, setEditingTeacher] = useState(null);
 
    const [selectedTeacher, setSelectedTeacher] = useState(null);

    const [searchTerm, setSearchTerm] = useState("");

    const [formData, setFormData] = useState({
        name: "",
        subject: "",
        gender: "",
    });

    const handleAddTeacher = () => {
    const numbers = teachers
        .map((teacher) => {
            if (!teacher.id) return 0;

            return parseInt(
                String(teacher.id).replace("T", ""),
                10
            ) || 0;
        });

    const nextId = Math.max(0, ...numbers) + 1;

    const newTeacher = {
        id: `T${String(nextId).padStart(3, "0")}`,
        name: formData.name,
        subject: formData.subject,
        gender: formData.gender,
    };

    setTeachers([...teachers, newTeacher]);

    setFormData({
        name: "",
        subject: "",
        gender: "",
    });

    setShowForm(false);
};

const handleDeleteTeacher = (id) => {
    const updatedTeachers = teachers.filter(
        (teacher) => teacher.id !== id
    );

    setTeachers(updatedTeachers);
};
    
const handleEditTeacher = (teacher) => {
    setEditingTeacher(teacher);

    setFormData({
        name: teacher.name,
        subject: teacher.subject,
        gender: teacher.gender,
    });

    setShowForm(true);
};
const handleUpdateTeacher = () => {
    const updatedTeachers = teachers.map((teacher) => {
        if (teacher.id === editingTeacher.id) {
            return {
                ...teacher,
                name: formData.name,
                subject: formData.subject,
                gender: formData.gender,
            };
        }

        return teacher;
    });

    setTeachers(updatedTeachers);

    setEditingTeacher(null);

    setFormData({
        name: "",
        subject: "",
        gender: "",
    });

    setShowForm(false);
};
    
const handleViewTeacher = (teacher) => {
    setSelectedTeacher(teacher);
};

const filteredTeachers = teachers.filter((teacher) =>
    teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.id.toLowerCase().includes(searchTerm.toLowerCase())
);
    return (
        <div className="container-fluid p-4">
            <h1 className="mb-4">Teachers</h1>

            <div className="card shadow-sm border-0">
                <div className="card-body">

                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h5 className="fw-bold mb-0">
                            Teacher List
                        </h5>

                        <button
                            className="btn btn-primary"
                            onClick={() => setShowForm(true)}
                        >
                            Add Teacher
                        </button>
                    </div>

                    {showForm && (
                        <div className="card border-0 bg-light mb-4">
                            <div className="card-body">

                                <h5 className="fw-bold mb-3">
                                    Add Teacher
                                </h5>

                                <div className="row g-3">
                                    <div className="col-md-4">
                                        <label className="form-label">
                                            Name
                                        </label>

                                        <input
                                            type="text"
                                            className="form-control"
                                            value={formData.name}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    name: e.target.value,
                                            })
                                        }
                                            placeholder="Enter teacher name"
                                        />
                                    </div>

                                    <div className="col-md-4">
                                        <label className="form-label">
                                            Subject
                                        </label>

                                        <input
                                            type="text"
                                            className="form-control"
                                            value={formData.subject}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    subject: e.target.value,
                                            })
                                        }
                                            placeholder="Enter subject"
                                        />
                                    </div>
                                    
                                    <div className="col-md-4">
                                            <label className="form-label">
                                                Gender
                                            </label>

                                            <select
                                                className="form-select"
                                                value={formData.gender}
                                                onChange={(e) =>
                                                    setFormData({
                                                        ...formData,
                                                        gender: e.target.value,
                                                    })
                                                }
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

                                <div className="mt-3">
                                
                                    <button
                                        className="btn btn-success me-2"
                                        onClick={
                                            editingTeacher
                                                ? handleUpdateTeacher
                                                : handleAddTeacher
                                        }
                                    >
                                        {editingTeacher ? "Update Teacher": "Save Teacher"}
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

                    {selectedTeacher && (
                        <div className="card shadow-sm border-0 mb-4">
                            <div className="card-body">

                                <div className="d-flex justify-content-between align-items-center mb-4">
                                    <h5 className="fw-bold mb-0">
                                        Teacher Details
                                    </h5>

                                    <button
                                        className="btn btn-sm btn-secondary"
                                        onClick={() => setSelectedTeacher(null)}
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

                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search teachers by name, subject or ID..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="table-responsive">
                        <table className="table table-hover align-middle">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Subject</th>
                                    <th>Gender</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {filteredTeachers.map((teacher) => (
                                    <tr key={teacher.id}>
                                        <td>{teacher.id}</td>
                                        <td>{teacher.name}</td>
                                        <td>{teacher.subject}</td>
                                        <td>{teacher.gender}</td>

                                        <td>
                                            <button
                                                className="btn btn-sm btn-outline-primary me-2"
                                                onClick={() => handleViewTeacher(teacher)}
                                            >
                                                View
                                            </button>

                                            <button
                                                className="btn btn-sm btn-outline-warning me-2"
                                                onClick={() => handleEditTeacher(teacher)}
                                                >
                                                Edit
                                            </button>

                                            <button
                                                className="btn btn-sm btn-outline-danger"
                                                onClick={() => handleDeleteTeacher(teacher.id)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Teachers;