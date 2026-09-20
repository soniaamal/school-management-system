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

// ==========================================
// FORMAT ACTIVITY TIME
// ==========================================
const formatActivityTime = (date) => {
    if (!date) {
        return "";
    }

    // Make sure a timezone is included.
    // Backend CreatedAt values are stored in UTC.
    const dateString =
        typeof date === "string" &&
        !date.endsWith("Z") &&
        !/[+-]\d{2}:\d{2}$/.test(date)
            ? `${date}Z`
            : date;

    const activityDate = new Date(dateString);

    if (isNaN(activityDate.getTime())) {
        return "";
    }

    const now = new Date();

    const difference =
        now.getTime() - activityDate.getTime();

    // If the activity is slightly in the future
    if (difference < 0) {
        return "Just now";
    }

    const totalSeconds =
        Math.floor(difference / 1000);

    if (totalSeconds < 60) {
        return "Just now";
    }

    const totalMinutes =
        Math.floor(totalSeconds / 60);

    if (totalMinutes < 60) {
        return `${totalMinutes} minute${
            totalMinutes === 1 ? "" : "s"
        } ago`;
    }

    const totalHours =
        Math.floor(totalMinutes / 60);

    if (totalHours < 24) {
        return `${totalHours} hour${
            totalHours === 1 ? "" : "s"
        } ago`;
    }

    const totalDays =
        Math.floor(totalHours / 24);

    if (totalDays === 1) {
        return "Yesterday";
    }

    return `${totalDays} days ago`;
};

function Dashboard() {
    const { students } = useStudents();
    const { teachers } = useTeachers();
    const { classes } = useClasses();
    const { attendance } = useAttendance();
    const { fees } = useFees();

    // ==========================================
    // TODAY'S DATE
    // ==========================================
   const today = new Date().toLocaleDateString("en-CA");

    // ==========================================
    // TODAY'S ATTENDANCE
    // ==========================================
    const todayAttendance = attendance.filter(
        (record) =>
            record.date &&
            record.date.startsWith(today)
    );

    // ==========================================
    // PRESENT COUNT
    // ==========================================
    const presentCount = todayAttendance.filter(
        (record) =>
            record.status === "Present"
    ).length;

    // ==========================================
    // ABSENT COUNT
    // ==========================================
    const absentCount = todayAttendance.filter(
        (record) =>
            record.status === "Absent"
    ).length;

    const totalMarked =
        presentCount + absentCount;

    // ==========================================
    // ATTENDANCE PERCENTAGE
    // ==========================================
    const attendancePercentage =
        totalMarked > 0
            ? Math.round(
                  (presentCount /
                      totalMarked) *
                      100
              )
            : 0;

    // ==========================================
    // PAID FEES
    // ==========================================
    const paidFees = fees
        .filter(
            (fee) =>
                fee.status === "Paid"
        )
        .reduce(
            (total, fee) =>
                total +
                Number(fee.amount),
            0
        );

    // ==========================================
    // PENDING FEES
    // ==========================================
    const pendingFees = fees
        .filter(
            (fee) =>
                fee.status === "Pending"
        )
        .reduce(
            (total, fee) =>
                total +
                Number(fee.amount),
            0
        );

    // ==========================================
    // RECENT ACTIVITIES
    // ==========================================
    const activities = [
        // --------------------------------------
        // STUDENTS
        // --------------------------------------
        ...students.map((student) => ({
            icon: "👨‍🎓",

            message: `${student.name} joined ${student.className}`,

            type: "student",

            // ASP.NET normally returns createdAt
            date:
                student.createdAt ||
                student.CreatedAt ||
                "",
        })),

        // --------------------------------------
        // TEACHERS
        // --------------------------------------
        ...teachers.map((teacher) => ({
            icon: "👩‍🏫",

            message: `New Teacher added: ${teacher.name}`,

            type: "teacher",

            date:
                teacher.createdAt ||
                teacher.CreatedAt ||
                "",
        })),

        // --------------------------------------
        // ATTENDANCE
        // --------------------------------------
        ...attendance.map((record) => ({
            icon: "📋",

            message: `Attendance marked for ${record.studentName}`,

            type: "attendance",

            // IMPORTANT:
            // Use createdAt, NOT attendance date
            date:
                record.createdAt ||
                record.CreatedAt ||
                "",
        })),

        // --------------------------------------
        // FEES
        // --------------------------------------
        ...fees.map((fee) => ({
            icon: "💰",

            message: `Fee record added for ${fee.studentName}`,

            type: "fee",

            date:
                fee.createdAt ||
                fee.CreatedAt ||
                "",
        })),
    ];

    // ==========================================
    // SORT ACTIVITIES
    // ==========================================
    const sortedActivities = [...activities]
        .filter((activity) => activity.date)
        .sort(
            (a, b) =>
                new Date(b.date) -
                new Date(a.date)
        )
        .slice(0, 5);

    // ==========================================
    // DASHBOARD STATISTICS
    // ==========================================
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

            {/* ==========================================
                DASHBOARD TITLE
            ========================================== */}
            <h1 className="mb-4">
                Dashboard
            </h1>

            {/* ==========================================
                STAT CARDS
            ========================================== */}
            <div className="row g-4">

                {state.map((stat) => (
                    <div
                        className="col-md-6 col-lg-3"
                        key={stat.title}
                    >
                        <StatCard
                            title={stat.title}
                            value={stat.value}
                            icon={stat.icon}
                        />
                    </div>
                ))}

            </div>

            {/* ==========================================
                FEES
            ========================================== */}
            <div className="row g-4 mt-1">

                {/* PAID FEES */}
                <div className="col-md-6">

                    <div className="card shadow-sm border-0">

                        <div className="card-body">

                            <h6 className="text-muted">
                                Paid Fees
                            </h6>

                            <h3 className="fw-bold text-success">
                                Rs.{" "}
                                {paidFees.toLocaleString()}
                            </h3>

                            <small className="text-muted">
                                Total collected fees
                            </small>

                        </div>

                    </div>

                </div>

                {/* PENDING FEES */}
                <div className="col-md-6">

                    <div className="card shadow-sm border-0">

                        <div className="card-body">

                            <h6 className="text-muted">
                                Pending Fees
                            </h6>

                            <h3 className="fw-bold text-warning">
                                Rs.{" "}
                                {pendingFees.toLocaleString()}
                            </h3>

                            <small className="text-muted">
                                Fees still pending
                            </small>

                        </div>

                    </div>

                </div>

            </div>

            {/* ==========================================
                RECENT ACTIVITY
            ========================================== */}
            <div className="card shadow-sm border-0 mt-4">

                <div className="card-body">

                    <h5 className="fw-bold mb-4">
                        Recent Activity
                    </h5>

                    {sortedActivities.length > 0 ? (

                        sortedActivities.map(
                            (activity, index) => (

                                <div
                                    key={`${activity.type}-${index}`}
                                    className="d-flex align-items-center border-bottom py-3"
                                >

                                    {/* ICON */}
                                    <div className="fs-4 me-3">
                                        {activity.icon}
                                    </div>

                                    {/* ACTIVITY */}
                                    <div className="flex-grow-1">

                                        <div className="fw-semibold">
                                            {activity.message}
                                        </div>

                                        <small className="text-muted">
                                            {formatActivityTime(
                                                activity.date
                                            )}
                                        </small>

                                    </div>

                                </div>

                            )
                        )

                    ) : (

                        <div className="text-center py-4">

                            <p className="text-muted mb-1">
                                No recent activity.
                            </p>

                            <small className="text-muted">
                                Add a student, teacher, fee,
                                or attendance record to see
                                activity here.
                            </small>

                        </div>

                    )}

                </div>

            </div>

            {/* ==========================================
                QUICK ACTIONS
            ========================================== */}
            <div className="card shadow-sm border-0 mt-4">

                <div className="card-body">

                    <h5 className="fw-bold mb-4">
                        Quick Actions
                    </h5>

                    <div className="row g-3">

                        {quickActions.map(
                            (action) => (

                                <div
                                    className="col-md-6 col-lg-3"
                                    key={action.title}
                                >

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

                            )
                        )}

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Dashboard;

