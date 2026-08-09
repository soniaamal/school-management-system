const students = [
    {
        id: 1,
        name: "Ahmed",
        className: "Class 4",
        status: "Active",
        gender: "Male",
            
    },
    {
        id: 2,
        name: "Muhammad",
        className: "Class 9",
        status: "Active",
        gender: "Male",

    },
    {
        id: 3,
        name: "Sonia",
        className: "Class 4",
        status: "Active",
        gender: "Female",

    },
    {
        id: 4,
        name: "Hiba",
        className: "Class 5",
        status: "Inactive",
        gender: "Female",

    },
];

function Student() {
    return (
        <div className="container-fluid p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h1 className="mb-1">Students</h1>
                    <p className="text-muted mb-0">
                        Manage student records
                    </p>
                </div>

                <button className="btn btn-primary">
                    +Add Student
                </button>
            </div>

            <div className="card shadow-sm border-0">
                <div className="caard-body">
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
                                {students.map((student) => (
                                    <tr key={student.id}>
                                        <td>{ student.id}</td>
                                        <td>{ student.name}</td>
                                        <td>{ student.className}</td>
                                        <td>{student.gender}</td>
                                        <td>
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

export default Student;