import { useState } from "react";

function Students() {
  const [students, setStudents] = useState([
    {
      id: "ST001",
      name: "Ahmed Khan",
      className: "8",
      gender: "Male",
    },
    {
      id: "ST002",
      name: "Sara Ahmed",
      className: "7",
      gender: "Female",
    },
    {
      id: "ST003",
      name: "Ali Hassan",
      className: "9",
      gender: "Male",
    },
  ]);

  const [formData, setFormData] = useState({
    name: "",
    className: "",
    gender: "",
  });

  const [showForm, setShowForm] = useState(false);
  
  const [error, setError] = useState("");
    
  const [searchTerm, setSearchTerm] = useState("");

 const handleAddStudent = () => {
     if (!formData.name.trim()) {
         setError("please enter student name. ");
         return;
     }
     if (!formData.className) {
         setError("please enter student class.");
         return;
     }
     if (!formData.gender) {
         setError("Please selsct student gender. ");
         return;
     }

        const newStudent = {
            id: `ST${String(students.length + 1).padStart(3, "0")}`,
            name: formData.name,
            className: formData.className,
            gender: formData.gender,
        };

        setStudents([...students, newStudent]);

        setFormData({
            name: "",
            className: "",
            gender: "",
        });
        setError("");
        setShowForm(false);
    };

    const filteredStudents = students.filter((students) =>
        students.name.toLowerCase().includes(searchTerm.toLowerCase())
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
          onClick={() => setShowForm(true)}
        >
          + Add Student
        </button>
      </div>

      {/* Add Student Form */}
      {showForm && (
        <div className="card shadow-sm border-0 mb-4">
          <div className="card-body">

            <h5 className="fw-bold mb-4">
              Add New Student
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
                    Save Student
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

      {/* Student Table */}
      <div className="card shadow-sm border-0">

        <div className="card-body">
                  
                  {/* search */}
                  <div className="mb-4">
                      <input
                          type="text"
                          className="form-control"
                          placeholder=" search students...."
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
                  <th>Class</th>
                  <th>Gender</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>

                {filteredStudents.map((student) => (
                  <tr key={student.id}>

                    <td>{student.id}</td>

                    <td>{student.name}</td>

                    <td>{student.className}</td>

                    <td>{student.gender}</td>

                    <td>
                      <button className="btn btn-sm btn-outline-primary me-2">
                        View
                      </button>

                      <button className="btn btn-sm btn-outline-secondary">
                        Edit
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

export default Students;