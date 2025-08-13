import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RabbitIcon } from "@phosphor-icons/react";

import Input from "../components/Input";
import Button from "../components/Button";
import AuthLayout from "../components/AuthLayout";
import Modal from "../components/Modal";

import { DEFAULT_THEME, getThemeHex } from "../constants/themes";

import { api } from "../utils/axiosInstance";

export default function SignUp() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [error, setError] = useState({
        isTrue: false,
        message: "",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (form.password !== form.confirmPassword) {
            setError({ isTrue: true, message: "Passwords do not match." });
            return;
        }

        try {
            const data = await api.post("/auth/register", {
                username: form.username,
                email: form.email,
                password: form.password,
            });

            navigate("/");
            setError({ isTrue: false, message: "" });
            console.log("User registered:", data);
        } catch (error) {
            setError({
                isTrue: true,
                message:
                    error.response?.data?.error ||
                    "Registration failed. Try again later.",
            });
            console.error("An error occurred: ", error);
        }
    };

    return (
        <AuthLayout>
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
                    type="email"
                    name="email"
                    value={form.email}
                    placeholder="Email"
                    onChange={handleChange}
                />

                <div className="flex gap-2">
                    <Input
                        type="password"
                        name="password"
                        value={form.password}
                        placeholder="Password"
                        onChange={handleChange}
                    />

                    <Input
                        type="password"
                        name="confirmPassword"
                        value={form.confirmPassword}
                        placeholder="Confirm Password"
                        onChange={handleChange}
                    />
                </div>

                <Button type="submit" variant="primary" onClick={handleSubmit}>
                    Sign Up
                </Button>
            </form>

            {/* Link */}
            <p className="mt-4 text-xs text-text-300">
                Already have an account?{" "}
                <Link to="/" className="text-accent-500 underline">
                    Log in
                </Link>
            </p>

            {/* Register Error Modal*/}
            {error && (
                <Modal
                    status="error"
                    show={error.isTrue}
                    onClose={() => setError(false)}
                >
                    {error.message}
                </Modal>
            )}
        </AuthLayout>
    );
}
