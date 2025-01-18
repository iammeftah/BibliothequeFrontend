import React from "react";

const Home: React.FC = () => {
    return (
        <div className="text-center p-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to the Library Management System</h1>
            <p className="text-lg text-gray-600">
                Manage your library efficiently with our easy-to-use tools for books, users, and loans.
            </p>
            <div className="mt-6">
                <p className="text-gray-700">
                    Navigate through the system using the navigation bar above to view and manage books, users, and loans.
                </p>
            </div>
        </div>
    );
};

export default Home;