import { useState } from "react";
import { useAttendance } from "../context/AttendanceContext";
import { useStudents } from "../context/StudentContext";

function Attendance() {
    const { attendance, setAttendance } = useAttendance();
    const { students } = useStudents();

    const [selectedDate, setSelectedDate] = useState(
        new Date().toISOString().split("T")[0]
    );
    const [searchTerm, setSearchTerm] = useState("");

    const handleAttendance = (student, status) => {
    const existingAttendance = attendance.find(
        (record) =>
            record.studentId === student.id &&
            record.date === selectedDate
    );

    if (existingAttendance) {
        const updatedAttendance = attendance.map((record) => {
            if (
                record.studentId === student.id &&
                record.date === selectedDate
            ) {
                return {
                    ...record,
                    status: status,
                };
            }

            return record;
        });

        setAttendance(updatedAttendance);
    } else {
        const newRecord = {
            id: `${student.id}-${selectedDate}`,
            studentId: student.id,
            studentName: student.name,
            className: student.className,
            date: selectedDate,
            status: status,
        };

        setAttendance([...attendance, newRecord]);
    }
};
const todayAttendance = attendance.filter(
    (record) => record.date === selectedDate
);

const presentCount = todayAttendance.filter(
    (record) => record.status === "Present"
).length;

const absentCount = todayAttendance.filter(
    (record) => record.status === "Absent"
).length;

const notMarkedCount = students.length - todayAttendance.length;
    
const attendanceRecords = attendance.filter(
    (record) => record.date === selectedDate
);   
    
const filteredStudents = students.filter((student) =>
    student.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.className.toLowerCase().includes(searchTerm.toLowerCase())
);
    return (
        <div className="container-fluid p-4">
            <h1 className="mb-4">Attendance</h1>

            <div className="row g-3 mb-4">

                <div className="col-md-3">
                    <div className="card shadow-sm border-0">
                        <div className="card-body">
                            <h6 className="text-muted">
                                Total Students
                            </h6>

                            <h3 className="fw-bold">
                                {students.length}
                            </h3>
                        </div>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="card shadow-sm border-0">
                        <div className="card-body">
                            <h6 className="text-muted">
                                Present
                            </h6>

                            <h3 className="fw-bold text-success">
                                {presentCount}
                            </h3>
                        </div>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="card shadow-sm border-0">
                        <div className="card-body">
                            <h6 className="text-muted">
                                Absent
                            </h6>

                            <h3 className="fw-bold text-danger">
                                {absentCount}
                            </h3>
                        </div>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="card shadow-sm border-0">
                        <div className="card-body">
                            <h6 className="text-muted">
                                Not Marked
                            </h6>

                            <h3 className="fw-bold text-warning">
                                {notMarkedCount}
                            </h3>
                        </div>
                    </div>
                </div>

            </div>

            <div className="card shadow-sm border-0">
                <div className="card-body">

                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h5 className="fw-bold mb-0">
                            Student Attendance
                        </h5>

                        <div>
                            <label className="form-label me-2">
                                Date:
                            </label>

                            <input
                                type="date"
                                className="form-control d-inline-block"
                                style={{ width: "180px" }}
                                value={selectedDate}
                                onChange={(e) =>
                                    setSelectedDate(e.target.value)
                                }
                            />
                        </div>
                    </div>

                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search student by ID, name or class..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />

                    </div>

                    <div className="table-responsive">
                        <table className="table table-hover align-middle">

                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Student Name</th>
                                    <th>Class</th>
                                    <th>Attendance</th>
                                </tr>
                            </thead>

                            <tbody>
                                {filteredStudents.map((student) => (
                                    <tr key={student.id}>
                                        <td>{student.id}</td>

                                        <td>{student.name}</td>

                                        <td>
                                            {student.className}
                                        </td>

                                        <td>
                                            {(() => {
                                                const record = attendance.find(
                                                    (item) =>
                                                        item.studentId === student.id &&
                                                        item.date === selectedDate
                                                );
                                                return (
                                                    <>
                                                                
                                                        <button
                                                            className={`btn btn-sm me-2 ${record?.status === "Present"
                                                                ? "btn-success"
                                                                : "btn-outline-success"
                                                                }`}
                                                            onClick={() =>
                                                                handleAttendance(student, "Present")
                                                            }
                                                        >
                                                            Present
                                                        </button>

                                                        <button
                                                            className={`btn btn-sm ${record?.status === "Absent"
                                                                ? "btn-danger"
                                                                : "btn-outline-danger"
                                                                }`}
                                                            onClick={() =>
                                                                handleAttendance(student, "Absent")
                                                            }
                                                        >
                                                            Absent
                                                        </button>
                                                    </>
                                                );
                                            })()}    
                                        </td>
                                    </tr>
                                ))}
                            </tbody>

                        </table>
                    </div>

                </div>
            </div>

            <div className="card shadow-sm border-0 mt-4">
                <div className="card-body">

                    <h5 className="fw-bold mb-4">
                        Attendance Records
                    </h5>

                    <div className="table-responsive">
                        <table className="table table-hover align-middle">

                            <thead>
                                <tr>
                                    <th>Student ID</th>
                                    <th>Student Name</th>
                                    <th>Class</th>
                                    <th>Date</th>
                                    <th>Status</th>
                                </tr>
                            </thead>

                            <tbody>
                                {attendanceRecords.length > 0 ? (
                                    attendanceRecords.map((record) => (
                                        <tr key={record.id}>
                                            <td>{record.studentId}</td>
                                            <td>{record.studentName}</td>
                                            <td>{record.className}</td>
                                            <td>{record.date}</td>
                                            <td>
                                                <span
                                                    className={`badge ${
                                                        record.status === "Present"
                                                            ? "bg-success"
                                                            : "bg-danger"
                                                    }`}
                                                >
                                                    {record.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="5"
                                            className="text-center text-muted py-4"
                                        >
                                            No attendance records for this date.
                                        </td>
                                    </tr>
                                )}
                            </tbody>

                        </table>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Attendance;