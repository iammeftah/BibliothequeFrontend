import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-neutral-800 p-4 text-white">
            <div className="container mx-auto flex justify-between items-center">
                <motion.h1
                    className="text-2xl font-bold"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    Bibliothèque
                </motion.h1>
                <div className="hidden md:flex space-x-4">
                    <NavLink to="/livres">Livres</NavLink>
                    <NavLink to="/utilisateurs">Utilisateurs</NavLink>
                    <NavLink to="/prets">Prets</NavLink>
                </div>
                <button
                    className="md:hidden"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X /> : <Menu />}
                </button>
            </div>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="md:hidden"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="flex flex-col items-center space-y-2 py-2">
                            <NavLink to="/livres" onClick={() => setIsOpen(false)}>Livres</NavLink>
                            <NavLink to="/utilisateurs" onClick={() => setIsOpen(false)}>Utilisateurs</NavLink>
                            <NavLink to="/prets" onClick={() => setIsOpen(false)}>Prets</NavLink>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

const NavLink: React.FC<{ to: string; children: React.ReactNode; onClick?: () => void }> = ({ to, children, onClick }) => (
    <Link
        to={to}
        className="hover:text-neutral-300 transition-colors duration-200"
        onClick={onClick}
    >
        <motion.span
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
        >
            {children}
        </motion.span>
    </Link>
);

export default Navbar;

