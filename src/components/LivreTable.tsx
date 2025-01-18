import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fetchLivres, addLivre } from "../api";
import AddLivreForm from "./AddLivreForm";
import {Loader} from "lucide-react";

interface Livre {
    id: number;
    titre: string;
    auteur: string;
}

const LivreTable: React.FC = () => {
    const [livres, setLivres] = useState<Livre[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getLivres = async () => {
            try {
                const data = await fetchLivres();
                setLivres(data);
            } catch (err) {
                setError("Failed to fetch livres");
            } finally {
                setLoading(false);
            }
        };

        getLivres();
    }, []);

    const handleAddLivre = async (livre: { titre: string; auteur: string }) => {
        try {
            const newLivre = await addLivre(livre);
            setLivres([...livres, newLivre]);
        } catch (err) {
            setError("Failed to add livre");
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
            className="bg-neutral-100 p-4 md:p-6 rounded-lg shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <h2 className="text-xl font-semibold mb-4">List of Livres</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-neutral-300 mb-6">
                    <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">ID</th>
                        <th className="py-2 px-4 border-b">Titre</th>
                        <th className="py-2 px-4 border-b">Auteur</th>
                    </tr>
                    </thead>
                    <tbody>
                    <AnimatePresence>
                        {livres.map((livre) => (
                            <motion.tr
                                key={livre.id}
                                className="hover:bg-neutral-50"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <td className="py-2 px-4 border-b">{livre.id}</td>
                                <td className="py-2 px-4 border-b">{livre.titre}</td>
                                <td className="py-2 px-4 border-b">{livre.auteur}</td>
                            </motion.tr>
                        ))}
                    </AnimatePresence>
                    </tbody>
                </table>
            </div>

            <AddLivreForm onAddLivre={handleAddLivre} />
        </motion.div>
    );
};

export default LivreTable;

