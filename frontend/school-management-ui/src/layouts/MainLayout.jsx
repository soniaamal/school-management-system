import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

function MainLayout() {
    return (
        <div className="d-flex">
            <Sidebar />

            <main className="flex-grow-1">
                <Outlet />
            </main>
        </div>
    );
}
export default MainLayout;