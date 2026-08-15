import { useStudents } from "../context/StudentContext";
import { Link, useParams } from "react-router-dom";

function StudentDetails() {
    const { students } = useStudents();
    const { id } = useParams();

    const student = students.find((student) => student.id == id);

    if (!student) {
        return (
            <div className="container-fluid p-4">
                <h2>Student Not Found</h2>

                <Link to="/students" className="btn btn-primary mt=3">
                    Back to Students
                </Link>
            </div>
        );
    }

    return (
        <div className="container-fluid p-4">
            <h1 className="mb-4"> Student Details</h1>

            <div className="card shadow-sm border-0">
                <div className="card-body">
                    <h4 className="mb-4">{student.name}</h4>

                    <p>
                        <strong>Student ID:</strong> {student.id}
                    </p>
                    <p>
                        <strong>Class: </strong> {student.className}
                    </p>

                    <p>
                        <strong>Gender:</strong> {student.gender}
                    </p>

                    <Link
                        to="/students"
                        className="btn btn-secondary mt-3"
                    >
                        Back to Students
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default StudentDetails;