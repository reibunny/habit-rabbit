import "./colors.css";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import Dashboard from "./pages/Dashboard.jsx";
import App from "./App.jsx";
import SignUp from "./pages/SignUp.jsx";

createRoot(document.getElementById("root")).render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/register" element={<SignUp />} />
            <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
    </BrowserRouter>
);
