import { Outlet } from "react-router";

export default function RootLayout() {
    return (
        <div className="min-h-screen bg-red-400">
            <div className="max-w-xl mx-auto bg-white rounded-xl shadow-lg p-6">
                <Outlet />
            </div>
        </div>
    );
}