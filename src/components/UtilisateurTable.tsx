import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fetchUtilisateurs, addUtilisateur } from "../api";

interface Utilisateur {
    id: number;
    nom: string;
    email: string;
}

const UtilisateurTable: React.FC = () => {
    const [utilisateurs, setUtilisateurs] = useState<Utilisateur[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

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
        } catch (err) {
            setError("Failed to add utilisateur");
        }
    };

    if (loading) return <div className="text-center py-4">Loading...</div>;
    if (error) return <div className="text-center py-4 text-red-500">{error}</div>;

    return (
        <motion.div
            className="bg-neutral-100 p-4 md:p-6 rounded-lg shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <h2 className="text-xl font-semibold mb-4">List of Utilisateurs</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-neutral-300 mb-6">
                    <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">ID</th>
                        <th className="py-2 px-4 border-b">Nom</th>
                        <th className="py-2 px-4 border-b">Email</th>
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

            <AddUtilisateurForm onAddUtilisateur={handleAddUtilisateur} />
        </motion.div>
    );
};

export default UtilisateurTable;

