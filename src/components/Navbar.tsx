import React from "react";

const Navbar: React.FC = () => {
    return (
        <nav className="bg-neutral-800 p-4 text-white">
            <div className="container mx-auto">
                <h1 className="text-2xl font-bold">Bibliothèque</h1>
            </div>
        </nav>
    );
};

export default Navbar;