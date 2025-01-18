import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fetchUtilisateurs, addUtilisateur } from "../api";
import AddUtilisateurForm from "./AddUtilisateurForm";
import { User, UserPlus, Loader } from 'lucide-react';

interface Utilisateur {
    id: number;
    nom: string;
    email: string;
}

const UtilisateurTable: React.FC = () => {
    const [utilisateurs, setUtilisateurs] = useState<Utilisateur[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [showForm, setShowForm] = useState<boolean>(false);

    useEffect(() => {
        const getUtilisateurs = async () => {
            try {
                const data = await fetchUtilisateurs();
                setUtilisateurs(data);
            } catch (err) {
                setError("Failed to fetch utilisateurs");
            } finally {
                setLoading(false);
            }
        };

        getUtilisateurs();
    }, []);

    const handleAddUtilisateur = async (utilisateur: { nom: string; email: string }) => {
        try {
            const newUtilisateur = await addUtilisateur(utilisateur);
            setUtilisateurs([...utilisateurs, newUtilisateur]);
            setShowForm(false);
        } catch (err) {
            setError("Failed to add utilisateur");
        }
    };

    if (loading) return (
        <div className="flex justify-center items-center h-64">
            <Loader className="animate-spin h-8 w-8 text-neutral-600" />
        </div>
    );

    if (error) return (
        <div className="text-center py-4 text-red-500 bg-red-100 rounded-md">
            <p>{error}</p>
        </div>
    );

    return (
        <motion.div
            className="bg-white p-4 md:p-6 rounded-lg shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-neutral-800">Utilisateurs</h2>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-neutral-700 flex flex-row gap-2 items-center justify-center text-white px-4 py-2 rounded-md hover:bg-neutral-600"
                    onClick={() => setShowForm(!showForm)}
                >
                    <UserPlus className="mr-2" size={18} />
                    {showForm ? "Hide Form" : "Add User"}
                </motion.button>
            </div>

            <AnimatePresence>
                {showForm && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <AddUtilisateurForm onAddUtilisateur={handleAddUtilisateur} />
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="overflow-x-auto mt-6">
                <table className="min-w-full bg-white border border-neutral-200">
                    <thead>
                    <tr className="bg-neutral-100">
                        <th className="py-2 px-4 border-b text-left">ID</th>
                        <th className="py-2 px-4 border-b text-left">Nom</th>
                        <th className="py-2 px-4 border-b text-left">Email</th>
                    </tr>
                    </thead>
                    <tbody>
                    <AnimatePresence>
                        {utilisateurs.map((utilisateur) => (
                            <motion.tr
                                key={utilisateur.id}
                                className="hover:bg-neutral-50"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <td className="py-2 px-4 border-b">{utilisateur.id}</td>
                                <td className="py-2 px-4 border-b">{utilisateur.nom}</td>
                                <td className="py-2 px-4 border-b">{utilisateur.email}</td>
                            </motion.tr>
                        ))}
                    </AnimatePresence>
                    </tbody>
                </table>
            </div>

            {utilisateurs.length === 0 && (
                <motion.p
                    className="text-center py-4 text-neutral-500"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    No users found. Add a new user to get started.
                </motion.p>
            )}
        </motion.div>
    );
};

export default UtilisateurTable;
