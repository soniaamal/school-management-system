import { useStudents } from "../context/StudentContext";
import { useTeachers } from "../context/TeacherContext";
import { useClasses } from "../context/ClassContext";
import { useAttendance } from "../context/AttendanceContext";
import { useFees } from "../context/FeeContext";
import Attendance from "./Attendance";
import { useState } from "react";

function Reports() {
    const { students } = useStudents();
    const { teachers } = useTeachers();
    const { classes } = useClasses();
    const { attendance } = useAttendance();
    const { fees } = useFees();
    const [studentSearch, setStudentSearch] = useState("");
    const [teacherSearch, setTeacherSearch] = useState("");
    const [classSearch, setClassSearch] = useState("");
    const [attendanceSearch, setAttendanceSearch] = useState("");
    const [feeSearch, setFeeSearch] = useState("");
    
    const filteredFees = fees.filter((fee) =>
    fee.studentId.toString().toLowerCase().includes(feeSearch.toLowerCase()) ||
    fee.studentName.toLowerCase().includes(feeSearch.toLowerCase()) ||
    fee.className.toLowerCase().includes(feeSearch.toLowerCase()) ||
    fee.status.toLowerCase().includes(feeSearch.toLowerCase())
    );
    
    const filteredClasses = classes.filter((classItem) =>
        classItem.id.toString().toLowerCase().includes(classSearch.toLowerCase()) ||
        classItem.name.toLowerCase().includes(classSearch.toLowerCase()) ||
        (classItem.teacherName || "")
            .toLowerCase()
            .includes(classSearch.toLowerCase())
    );
    
    const filteredTeachers = teachers.filter((teacher) =>
        teacher.id.toString().toLowerCase().includes(teacherSearch.toLowerCase()) ||
        teacher.name.toLowerCase().includes(teacherSearch.toLowerCase()) ||
        teacher.subject.toLowerCase().includes(teacherSearch.toLowerCase())
    );


    const filteredStudents = students.filter((student) =>
    student.id.toString().toLowerCase().includes(studentSearch.toLowerCase()) ||
    student.name.toLowerCase().includes(studentSearch.toLowerCase()) ||
    student.className.toLowerCase().includes(studentSearch.toLowerCase())
    );
    
    const presentCount = attendance.filter(
        (record) => record.status === "Present"
    ).length;

    const absentCount = attendance.filter(
        (record) => record.status === "Absent"
    ).length;

    const totalMarked = presentCount + absentCount;

    const attendancePercentage =
        totalMarked > 0
            ? Math.round((presentCount / totalMarked) * 100)
            : 0;
    
    const paidFees = fees
        .filter((fee) => fee.status === "Paid")
            .reduce(
            (total, fee ) => total + Number(fee.amount),
            0
    );
    
    const pendingFees = fees
        .filter((fee) => fee.status === "Pending")
        .reduce(
            (total, fee) => total + Number(fee.amount),
            0
        );
    const sortedAttendance = [...attendance].sort(
        (a, b) => new Date(b.date) - new Date(a.date)
    );
    const filteredAttendance = sortedAttendance.filter((record) =>
    record.studentId.toString().toLowerCase().includes(attendanceSearch.toLowerCase()) ||
    record.studentName.toLowerCase().includes(attendanceSearch.toLowerCase()) ||
    record.className.toLowerCase().includes(attendanceSearch.toLowerCase()) ||
    record.status.toLowerCase().includes(attendanceSearch.toLowerCase()) ||
    record.date.toLowerCase().includes(attendanceSearch.toLowerCase())
    );

    return (
        <div className="container-fluit p-4">
            <h1 className="mb-4">Reports</h1>

            <div className="card shadow-sm border-0">
                <div className="card-body">

                    <h5 className="fw-bold mb-4">
                        School Overview
                    </h5>

                    <div className="row g-3">

                        <div className="col-md-4 col-log-3">
                            <div className="card border-0 bg-light">
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
                        <div className="col-md-4 col-lg-3">
                            <div className="card border-0 bg-light">
                                <div className="card-body">
                                    <h6 className="text-muted">
                                        Total Teachers
                                    </h6>

                                    <h3 className="fw-bold">
                                        {teachers.length}
                                    </h3>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4 col-lg-3">
                            <div className="card border-0 bg-light">
                                <div className="card-body">
                                    <h6 className="text-muted">
                                        Total Classes
                                    </h6>

                                    <h3 className="fw-bold">
                                        {classes.length}
                                    </h3>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4 col-lg-3">
                            <div className="card border-0 bg-light">
                                <div className="card-body">
                                    <h6 className="text-muted">
                                        Attendance
                                    </h6>

                                    <h3 className="fw-bold text-success">
                                        {attendancePercentage}%
                                    </h3>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4 col-lg-3">
                            <div className="card- border-0 bg-light">
                                <div className="card-body">
                                    <h6 className="text-muted">
                                        Paid Fees
                                    </h6>

                                    <h3 className="fw-bold text-success">
                                        Rs. {paidFees.toLocaleString()}
                                    </h3>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4- col-lg-3">
                            <div className="card border-0 bg-light">
                                <div className="card-body">
                                    <h6 className="text-muted">
                                        Pending Fees
                                    </h6>
                                    <h3 className="fw-bold text-warning">
                                        Rs. {pendingFees.toLocaleString()}
                                    </h3>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            </div>

            <div className="card shadow-sm border-0 mt-4">
                <div className="card-body">
                    <h5 className="fw-bold mb-4">
                        Student Report
                    </h5>

                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search by student ID, name or class..."
                            value={studentSearch}
                            onChange={(e) => setStudentSearch(e.target.value)}
                        />
                    </div>

                    <div className="table-resposive">
                        <table className="table table-hover align-middle">

                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Class</th>
                                    <th>Gender</th>
                                </tr>
                            </thead>

                            <tbody>
                                {filteredStudents.length > 0 ? (
                                    filteredStudents.map((student) => (
                                        <tr key={student.id }>
                                            <td>{ student.id }</td>
                                            <td>{ student.name }</td>
                                            <td>{ student.className }</td>
                                            <td>{ student.gender }</td>
                                        </tr>
                                    ))
                                ) : (
                                        <tr>
                                            <td
                                                colSpan="4"
                                                className="text-center text-muted py-4"
                                            >
                                                No students found.
                                            </td>
                                        </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>

            <div className="card shadow-sm border-0 mt-4">
                <div className="card-body">

                    <h5 className="fw-bold mb-4">
                        Teacher Report
                    </h5>

                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search by teacher ID, name or subject..."
                            value={teacherSearch}
                            onChange={(e) => setTeacherSearch(e.target.value)}
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
                                </tr>
                            </thead>

                            <tbody>
                                {filteredTeachers.length > 0 ? (
                                    filteredTeachers.map((teacher) => (
                                        <tr key={teacher.id}>
                                            <td>{teacher.id}</td>
                                            <td>{teacher.name}</td>
                                            <td>{teacher.subject}</td>
                                            <td>{teacher.gender}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="4"
                                            className="text-center text-muted py-4"
                                        >
                                            No teachers found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>

                        </table>
                    </div>

                </div>
            </div>

            <div className="card shadow-sm border-0 mt-4">
                <div className="card-body">

                    <h5 className="fw-bold mb-4">
                        Class Report
                    </h5>

                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search by class ID, class name or teacher..."
                            value={classSearch}
                            onChange={(e) => setClassSearch(e.target.value)}
                        />
                    </div>

                    <div className="table-responsive">
                        <table className="table table-hover align-middle">

                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Class Name</th>
                                    <th>Teacher</th>
                                </tr>
                            </thead>

                            <tbody>
                                {filteredClasses.length > 0 ? (
                                    filteredClasses.map((classItem) => (
                                        <tr key={classItem.id}>
                                            <td>{classItem.id}</td>
                                            <td>{classItem.name}</td>
                                            <td>{classItem.teacherName}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="3"
                                            className="text-center text-muted py-4"
                                        >
                                            No classes found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>

                        </table>
                    </div>

                </div>
            </div>

            <div className="card shadow-sm border-0 mt-4">
                <div className="card-body">

                    <h5 className="fw-bold mb-4">
                        Attendance Report
                    </h5>

                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search by student, class, status or date..."
                            value={attendanceSearch}
                            onChange={(e) => setAttendanceSearch(e.target.value)}
                        />
                    </div>


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
                                {filteredAttendance.length > 0 ? (
                                    filteredAttendance.map((record) => (
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
                                            No attendance records found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>

                        </table>
                    </div>

                </div>
            </div>

            <div className="card shadow-sm border-0 mt-4">
                <div className="card-body">

                    <h5 className="fw-bold mb-4">
                        Fee Report
                    </h5>

                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search by student, class or status..."
                            value={feeSearch}
                            onChange={(e) => setFeeSearch(e.target.value)}
                        />
                    </div>

                    <div className="table-responsive">
                        <table className="table table-hover align-middle">

                            <thead>
                                <tr>
                                    <th>Student ID</th>
                                    <th>Student Name</th>
                                    <th>Class</th>
                                    <th>Amount</th>
                                    <th>Status</th>
                                </tr>
                            </thead>

                            <tbody>
                                {filteredFees.length > 0 ? (
                                    filteredFees.map((fee) => (
                                        <tr key={`${fee.id}-${fee.studentId}`}>
                                            <td>{fee.studentId}</td>
                                            <td>{fee.studentName}</td>
                                            <td>{fee.className}</td>
                                            <td>
                                                Rs. {Number(fee.amount).toLocaleString()}
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
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="5"
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
        </div>
    );
}


export default Reports;