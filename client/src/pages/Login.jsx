import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RabbitIcon } from "@phosphor-icons/react";

import Button from "../components/Button";
import Input from "../components/Input";
import Modal from "../components/Modal";

import { DEFAULT_THEME, getThemeHex } from "../constants/themes";

import { api } from "../utils/axiosInstance";

export default function Login() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        username: "",
        password: "",
    });

    const [loginError, setLoginError] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const { data } = await api.post("/auth/login", form);
            localStorage.setItem("token", data.token);
            navigate("/dashboard");
        } catch (error) {
            setLoginError(true);
            console.error("Error fetching user data:", error);
            localStorage.removeItem("token");
            localStorage.removeItem("userId");
            navigate("/");
        }
    };

    return (
        <>
            {/* Logo */}
            <div className="flex justify-center mb-4">
                <RabbitIcon
                    size={100}
                    weight="duotone"
                    color={getThemeHex(DEFAULT_THEME)}
                />
            </div>

            {/* Heading */}
            <h2 className="text-2xl font-bold text-primary-300 mb-1">
                Welcome back!
            </h2>
            <p className="text-text-300 text-sm mb-6">
                Log in to track your habits!
            </p>

            {/* Form */}
            <form className="space-y-4">
                <Input
                    type="username"
                    name="username"
                    value={form.username}
                    placeholder="Username"
                    onChange={handleChange}
                />
                <Input
                    type="password"
                    name="password"
                    value={form.password}
                    placeholder="Password"
                    onChange={handleChange}
                />

                <Button type="submit" variant="primary" onClick={handleSubmit}>
                    Log In
                </Button>
            </form>

            {/* Register link */}
            <p className="mt-4 text-xs text-text-300">
                Don't have an account?{" "}
                <Link to="/register" className="text-primary-300 underline">
                    Sign up
                </Link>
            </p>

            {/* Login Error Modal */}
            {loginError && (
                <Modal
                    status="error"
                    show={loginError}
                    onClose={() => setLoginError(false)}
                >
                    Login failed. Please try again.
                </Modal>
            )}
        </>
    );
}
