function AuthLayout({ children }) {
    return (
        <div className="min-h-screen bg-background-300 flex flex-col justify-center items-center px-4">
            <div className="w-full max-w-sm bg-background-300 rounded-3xl shadow-lg p-6 text-center">
                {children}
            </div>
        </div>
    );
}

export default AuthLayout;
