import { NavLink } from "react-router-dom";

import {
    FaHome,
    FaUserGraduate,
    FaChalkboardTeacher,
    FaClipboardCheck,
    FaMoneyBill,
    FaChartBar,
} from "react-icons/fa";

const menuItems = [
    {
        name: "Dashboard",
        path: "/",
        icon: FaHome,
    },
    {
        name: "Studens",
        path: "/students",
        icon: FaUserGraduate,
    },
    {
        name: "Teachers",
        path: "/teachers",
        icon: FaChalkboardTeacher,
    },
    {
        name: "Attendance",
        path: "/attendance",
        icon: FaClipboardCheck,
    },
    {
        name: "Fees",
        path: "/fees",
        icon: FaMoneyBill,
    },
    {
        name: "Reports",
        path: "/reports",
        icon: FaChartBar,
    },
];

function Sidebar() {
    return (
        <div
            className="bg-dark text-whit vh-100 p-3"
            style={{ width: "250px" }}
        >
            <h3 className="text-center mb-4">🎓School MS</h3>

             <nav className="nav flex-column">
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    return (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) =>
                                isActive
                                    ? "nav-link text-white bg-primary rounded mb-2"
                                    : "nav-link text-white mb-2"
                            }
                        >
                            <Icon className="me-2" />
                            {item.name}
                        </NavLink>
                    );
                })}
            
              </nav>
        </div>
  );
}

export default Sidebar;