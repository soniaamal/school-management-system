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
            </div>
        </div>

    ); 
}

export default Dashboard;