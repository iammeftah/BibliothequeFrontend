import React from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
    return (
        <nav className="bg-neutral-800 p-4 text-white">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-2xl font-bold">Bibliothèque</h1>
                <div className="space-x-4">
                    <Link to="/livres" className="hover:text-neutral-300">
                        Livres
                    </Link>
                    <Link to="/utilisateurs" className="hover:text-neutral-300">
                        Utilisateurs
                    </Link>
                    <Link to="/prets" className="hover:text-neutral-300">
                        Prets
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;