import { useStudents } from "../context/StudentContext";
import { useTeachers } from "../context/TeacherContext";
import { useClasses } from "../context/ClassContext";
import { useAttendance } from "../context/AttendanceContext";
import { useFees } from "../context/FeeContext";
import { Link } from "react-router-dom";
import StatCard from "../components/StatCard";

import {
    FaUserGraduate,
    FaChalkboardTeacher,
    FaSchool,
    FaClipboardCheck,
} from "react-icons/fa";

const activities = [
    {
        icon: "👨‍🎓",
        message: "Ahmed joined Class 8",
        time: "10 min ago",
    },
    {
        icon: "💰",
        message: " Fees payment recived",
        time: " 30 mint ago",

    },
    {
        icon: "👩‍🏫",
        message: "New Teacher added",
        time: " 1 hour ago",
    },
    {
        icon: "📋",
        message: "Attendance marked for Class 7",
        time: "2 hours ago",
    },
];

const quickActions = [
    {
        title: "Add Student",
        icon: "👨‍🎓",
        path: "/students",

    },
    {
        title: "Add Teachers",
        icon: "👩‍🏫",
        path: "/Teachers",
    },
    {
        title: "Take Attendance",
        icon: "📋",
        path: "/attendance",
    },
    {
        title: "Collect Fee",
        icon: "💰",
        path: "/fees",
    },
];

function Dashboard() {
    const { students } = useStudents();
    const { teachers } = useTeachers();
    const { classes } = useClasses();
    const { attendance } = useAttendance();
    const { fees } = useFees();

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
        (total, fee) => total + Number(fee.amount),
        0
    );

    const pendingFees = fees
        .filter((fee) => fee.status === "Pending")
        .reduce(
            (total, fee) => total + Number(fee.amount),
        0
    );
     
    const state = [
        {
            title: "Total Students",
            value: students.length,
            icon: FaUserGraduate,

        },
        {
            title: "Total Teachers",
            value: teachers.length,
            icon: FaChalkboardTeacher,

        },
        {
            title: "Total Classes",
            value: classes.length,
            icon: FaSchool,

        },
        {
            title: "Attendance",
            value: `${attendancePercentage}%`,
            icon: FaClipboardCheck,

        },
    ];
    return (
        <div className="container-fluid p-4">
            <h1 className="mb-4">Dashboard</h1>
            
        
            <div className="row g-4">
                {state.map((stat) => (
                    <div className="col-md-6 col-lg-3" key={stat.title}>
                      <StatCard
                        title={stat.title}
                            value={stat.value}
                            icon={stat.icon}
                      />
                    </div>
                ))}
            </div>

            <div className="row g-4 mt-1">

                <div className="col-md-6">
                    <div className="card shadow-sm border-0">
                        <div className="card-body">
                            <h6 className="text-muted">
                                Paid Fees
                            </h6>

                            <h3 className="fw-bold text-success">
                                Rs. {paidFees.toLocaleString()}
                            </h3>

                            <small className="text-muted">
                                Total collected fees
                            </small>
                        </div>
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="card shadow-sm border-0">
                        <div className="card-body">
                            <h6 className="text-muted">
                                Pending Fees
                            </h6>

                            <h3 className="fw-bold text-warning">
                                Rs. {pendingFees.toLocaleString()}
                            </h3>

                            <small className="text-muted">
                                Fees still pending
                            </small>
                        </div>
                    </div>
                </div>

            </div>
                                                
            <div className="card shadow-sm border-0 mt-4">
                    <div className="card-body">
                        <h5 className="fw-bold mb-4">Recent Activity</h5>

                        {activities.map((activity, index) => (
                            <div
                                key={index}
                                className="d-flex align-items-center border-bottom py-3"
                            >
                                <div className="fs-4 me-3">
                                    {activity.icon}
                                </div>
                                
                                <div className="flex-grow-1">
                                    <div className="fw-semibold">
                                        {activity.message}
                                    </div>

                                    <small className="text-muted">
                                        {activity.time}
                                    </small>
                                    
                                </div>
                            </div>        
                            
                        ))}
        
                    </div>
                {/* </div>                  */}
            </div>
            <div className="card shadow-sm border-0 mt-4">
            <div className="card-body">
                <h5 className="fw-bold mb-4">Quick Actions</h5>

                <div className="row g-3">
                {quickActions.map((action) => (
                    <div className="col-md-6 col-lg-3" key={action.title}>
                    <Link
                        to={action.path}
                        className="text-decoration-none"
                    >
                        <div className="border rounded p-3 text-center h-100">
                        <div className="fs-2 mb-2">
                            {action.icon}
                        </div>

                        <div className="fw-semibold text-dark">
                            {action.title}
                        </div>
                        </div>
                    </Link>
                    </div>
                ))}
                </div>
            </div>
            </div>

        </div>
    ); 
}

export default Dashboard;