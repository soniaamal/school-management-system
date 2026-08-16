import { useState } from "react";
import { useClasses } from "../context/ClassContext";

function Classes() {
    const { classes, setClasses } = useClasses();

    const [showForm, setShowForm] = useState(false);
    const [editingClass, setEditingClass] = useState(null);
    
    const [selectedClass, setSelectedClass] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [formData, setFormData] = useState({
        name: "",
        section:"",
        teacher:"",
    })
    const handleAddClass = () => {
    const numbers = classes.map((classItem) => {
        if (!classItem.id) return 0;

        return (
            parseInt(
                String(classItem.id).replace("C", ""),
                10
            ) || 0
        );
    });

    const nextId = Math.max(0, ...numbers) + 1;

    const newClass = {
        id: `C${String(nextId).padStart(3, "0")}`,
        name: formData.name,
        section: formData.section,
        teacher: formData.teacher,
    };

    setClasses([...classes, newClass]);

    setFormData({
        name: "",
        section: "",
        teacher: "",
    });

    setShowForm(false);
};
const handleDeleteClass = (id) => {
    const updatedClasses = classes.filter(
        (classItem) => classItem.id !== id
    );

    setClasses(updatedClasses);
};
    
const handleEditClass = (classItem) => {
    setEditingClass(classItem);

    setFormData({
    
        name: classItem.name,
        section: classItem.section,
        teacher: classItem.teacher,
    });

    setShowForm(true);
};

const handleUpdateClass = () => {
    const updatedClasses = classes.map((classItem) => {
        if (classItem.id === editingClass.id) {
            return {
                ...classItem,
                name: formData.name,
                section: formData.section,
                teacher: formData.teacher,
            };
        }

        return classItem;
    });

    setClasses(updatedClasses);

    setEditingClass(null);

    setFormData({
        name: "",
        section: "",
        teacher: "",
    });

    setShowForm(false);
};
const handleViewClass = (classItem) => {
        setSelectedClass(classItem);
    
};
const filteredClasses = classes.filter((classItem) =>
        classItem.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        classItem.section.toLowerCase().includes(searchTerm.toLowerCase()) ||
        classItem.teacher.toLowerCase().includes(searchTerm.toLowerCase()) ||
        classItem.id.toLowerCase().includes(searchTerm.toLowerCase())
);    
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
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={formData.teacher}
                                            onChange={(e) => 
                                                setFormData({
                                                    ...formData,
                                                    teacher: e.target.value,
                                            })
                                        }
                                            placeholder="Enter teacher name"
                                        />
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
                                                teacher: "",
                                          
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
                                                {selectedClass.teacher}
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
                                    <th>Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {filteredClasses.map((classItem) => (
                                    <tr key={classItem.id}>
                                        <td>{classItem.id}</td>
                                        <td>{classItem.name}</td>
                                        <td>{classItem.section}</td>
                                        <td>{classItem.teacher}</td>

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