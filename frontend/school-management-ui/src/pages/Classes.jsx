import { useState } from "react";
import { useClasses } from "../context/ClassContext";
import { useTeachers } from "../context/TeacherContext";
import { useStudents } from "../context/StudentContext";

function Classes() {
    const {
    classes,
    addClass,
    updateClass,
    deleteClass,
    loading,
    error,
    } = useClasses();
    const { teachers } = useTeachers();
    const { students } = useStudents();

    const [showForm, setShowForm] = useState(false);
    const [editingClass, setEditingClass] = useState(null);
    
    
    const [selectedClass, setSelectedClass] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [formData, setFormData] = useState({
        name: "",
        section:"",
        teacherCode:"",
    })
  const handleAddClass = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
        alert("Please enter class name.");
        return;
    }

    if (!formData.section.trim()) {
        alert("Please enter section.");
        return;
    }

    if (!formData.teacherCode) {
        alert("Please select a teacher.");
        return;
    }

    try {
        // Generate the next ClassCode
        const numbers = classes.map((classItem) => {
            if (!classItem.classCode) return 0;

            return (
                parseInt(
                    String(classItem.classCode).replace("C", ""),
                    10
                ) || 0
            );
        });

        const nextCodeNumber = Math.max(0, ...numbers) + 1;

        const newClass = {
            classCode: `C${String(nextCodeNumber).padStart(3, "0")}`,
            name: formData.name,
            section: formData.section,
            teacherCode: formData.teacherCode,
        };

        await addClass(newClass);

        alert("Class added successfully.");

        setFormData({
            name: "",
            section: "",
            teacherCode: "",
        });

        setShowForm(false);
    } catch (error) {
        console.error("Error adding class:", error);
        alert("Failed to add class.");
    }
};
const handleDeleteClass = async (id) => {
    const confirmed = window.confirm(
        "Are you sure you want to delete this class?"
    );

    if (!confirmed) {
        return;
    }

    try {
        await deleteClass(id);

        alert("Class deleted successfully.");
    } catch (error) {
        console.error("Error deleting class:", error);
        alert("Failed to delete class.");
    }
};
    
const handleEditClass = (classItem) => {
    setEditingClass(classItem);
    setSelectedClass(classItem);

    setFormData({
        name: classItem.name,
        section: classItem.section,
        teacherCode: classItem.teacherCode,
    });

    setShowForm(true);
};

const handleUpdateClass = async (e) => {
    e.preventDefault();

    if (!selectedClass) {
        return;
    }

    if (!formData.name.trim()) {
        alert("Please enter class name.");
        return;
    }

    if (!formData.section.trim()) {
        alert("Please enter section.");
        return;
    }

    if (!formData.teacherCode) {
        alert("Please select a teacher.");
        return;
    }

    try {
        const updatedClassData = {
            classCode: selectedClass.classCode,
            name: formData.name,
            section: formData.section,
            teacherCode: formData.teacherCode,
        };

        await updateClass(
            selectedClass.id,
            updatedClassData
        );

        alert("Class updated successfully.");

        setFormData({
            name: "",
            section: "",
            teacherCode: "",
        });

        setSelectedClass(null);
        setShowForm(false);
    } catch (error) {
        console.error("Error updating class:", error);
        alert("Failed to update class.");
    }
};
const handleViewClass = (classItem) => {
        setSelectedClass(classItem);
    
};
const filteredClasses = classes.filter((classItem) => {
    const teacherName =
        teachers.find(
            (teacher) =>
                teacher.teacherCode === classItem.teacherCode
        )?.name || "";

    const search = searchTerm.toLowerCase();

    return (
        (classItem.classCode || "")
            .toLowerCase()
            .includes(search) ||

        (classItem.name || "")
            .toLowerCase()
            .includes(search) ||

        (classItem.section || "")
            .toLowerCase()
            .includes(search) ||

        (classItem.teacherCode || "")
            .toLowerCase()
            .includes(search) ||

        teacherName
            .toLowerCase()
            .includes(search)
    );
});
    return (
        <div className="container-fluid p-4">
            <h1 className="mb-4">Classes</h1>

            <div className="card shadow-sm border-0">
                <div className="card-body">
                    
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h5 className="fw-bold mb-0">
                            Class List
                        </h5>

                        <button
                            className="btn btn-primary"
                            onClick={() => setShowForm(true)}
                        >
                            Add Class
                        </button>
                    </div>

                    {showForm && (
                        <div className="card border-0 bg-light mb-4">
                            <div className="card-body">

                                <h5 className="fw-bold mb-3">
                                    Add Class
                                </h5>

                                <div className="row g-3">
                                    <div className="col-md-4">
                                        <label className="form-label">
                                            Class Name
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
                                            placeholder="Enter class name"
                                        />
                                    </div>

                                    <div
                                        className="col-md-4"
                                    >
                                        <label className="form-label">
                                            Section
                                        </label>

                                        <input
                                            type="text"
                                            className="form-control"
                                            value={formData.section}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    section: e.target.value,
                                            })
                                        }
                                            placeholder="Enter section"
                                        />
                                    </div>

                                    <div className="col-md-4">
                                        <label className="form-label">
                                            Teacher
                                        </label>

                                        <select
                                            className="form-select"
                                            value={formData.teacherCode}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    teacherCode: e.target.value,
                                                })
                                            }
                                        >
                                            <option value="">
                                                Select Teacher
                                            </option>

                                            {teachers.map((teacher) => (
                                                <option
                                                    key={teacher.id}
                                                    value={teacher.teacherCode}>
                                                    {teacher.teacherCode} - {teacher.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                </div>

                                <div className="mt-3">
                                    <button
                                        className="btn btn-success me-2"
                                        onClick={
                                            editingClass
                                                ? handleUpdateClass
                                                : handleAddClass
                                        }
                                    >
                                        {editingClass ? "Update Class" : "Save Class"}
                                    </button>

                                    <button
                                        className="btn btn-secondary"
                                        onClick={() => {
                                            setShowForm(false);
                                            setEditingClass(null);

                                            setFormData({
                                                name: "",
                                                section: "",
                                                teacherCode: "",
                                          
                                            });
                                        }}
                                    >
                                        Cancel
                                    </button>
                                </div>

                            </div>
                        
                        </div>

                    )}
                    {selectedClass && (
                        <div className="card shadow-sm border-0 mb-4">
                            <div className="card-body">

                               <div className="d-flex justify-content-between align-items-center mb-4">
                                    <h5 className="fw-bold mb-0">
                                       Class Details
                                    </h5>

                                    <button
                                        className="btn btn-sm btn-secondary"
                                        onClick={() => setSelectedClass(null)}
                                    >
                                     Close
                                   </button>
                               </div>

                               <div className="row g-3">

                                    <div className="col-md-6">
                                        <strong>Class ID:</strong>
                                           <p className="text-muted">
                                                {selectedClass.id}
                                           </p>
                                    </div>

                                    <div className="col-md-6">
                                       <strong>Class Name:</strong>
                                            <p className="text-muted">
                                                {selectedClass.name}
                                            </p>
                                    </div>

                                    <div className="col-md-6">
                                       <strong>Section:</strong>
                                            <p className="text-muted">
                                               {selectedClass.section}
                                            </p>
                                    </div>

                                    <div className="col-md-6">
                                        <strong>Teacher:</strong>
                                            <p className="text-muted">
                                                {teachers.find(
                                                    (teacher) => teacher.teacherCode  === selectedClass.teacherCode 
                                                    )?.name || "Not Assigned"}
                                            </p>
                                    </div>

                                     <div className="col-md-6">
                                        <strong>Students: </strong>
                                            <p className="text-muted">
                                                {students.filter(
                                                (student) => 
                                                student.className == selectedClass.name
                                                ).length}
                                            </p> 
                                </div>
                                
                                <div className="col-12">
                                    <strong>Student List:</strong>

                                    <div className="table-responsive mt-2">
                                        <table className="table table-sm table-bordered align-middle">
                                            <thead>
                                                <tr>
                                                    <th>Student ID</th>
                                                    <th>Student Name</th>
                                                    <th>Gender</th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {students.filter(
                                                        (student) =>
                                                            student.className === selectedClass.name
                                                ).length > 0 ? (
                                                        students
                                                            .filter(
                                                                (student) =>
                                                                    student.className === selectedClass.name
                                                        )
                                                    .map((student) => (
                                                        <tr key={student.id}>
                                                            <td>{student.id}</td>
                                                            <td>{student.name}</td>
                                                            <td>{student.gender}</td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                        <tr>
                                                            <td colSpan="3" className="text-center text-muted">
                                                                No students assigned to this class
                                                            </td>
                                                    </tr>    
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                </div>
                            </div>
                        </div>
                    )}

                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search classes by name, section, teacher or ID...."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="table-responsive">
                        <table className="table table-hover align-middle">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Class</th>
                                    <th>Section</th>
                                    <th>Teacher</th>
                                    <th>Students</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {filteredClasses.map((classItem) => (
                                    <tr key={classItem.id}>
                                        <td>{classItem.classCode}</td>
                                        <td>{classItem.name}</td>
                                        <td>{classItem.section}</td>
                                        <td>{teachers.find(
                                            (teacher) => teacher.teacherCode  === classItem.teacherCode 
                                            )?.name || "Not Assigned"}
                                        </td>
                                        <td>
                                            {students.filter(
                                                (student) => student.className === classItem.name
                                            ).length}
                                        </td>

                                        <td>
                                            <button
                                                className="btn btn-sm btn-outline-primary me-2"
                                                onClick={() => handleViewClass(classItem)}
                                            >
                                                View
                                            </button>

                                            <button
                                                className="btn btn-sm btn-outline-warning me-2"
                                                onClick={() => handleEditClass(classItem)}
                                            >
                                                Edit
                                            </button>

                                            <button
                                                className="btn btn-sm btn-outline-danger"
                                                onClick={() => handleDeleteClass(classItem.id)}
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
export default Classes;