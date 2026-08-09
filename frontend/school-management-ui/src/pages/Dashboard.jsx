import StatCard from "../components/StatCard";
import {
    FaUserGraduate,
    FaChalkboardTeacher,
    FaSchool,
    FaClipboardCheck,
} from "react-icons/fa";
const state = [
    {
        title: "Total Students",
        value: "520",
        icon: FaUserGraduate,

    },
    {
        title: "Total Teachers",
        value: "42",
        icon: FaChalkboardTeacher,

    },
    {
        title: "Total Classes",
        value: "18",
        icon: FaSchool,

    },
    {
        title: "Attendance",
        value: "94%",
        icon: FaClipboardCheck,

    },
];
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

function Dashboard() {
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
                                                
                <div className="card shadow-sm border-0 mt-4">
                    <div className="card-body">
                        <h5 className="fw-bold mb-4">Recent Activity</h5>

                        {activities.map((activity, index) => (
                            <div
                                key={index}
                                className="d-flex align-item-center vorder-bottom py-3"
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
                </div>                 
            </div>
        </div>

    ); 
}

export default Dashboard;