import React, { useState } from "react";
import {AnimatePresence, motion} from "framer-motion";

interface AddLivreFormProps {
    onAddLivre: (livre: { titre: string; auteur: string }) => Promise<void>;
}

const AddLivreForm: React.FC<AddLivreFormProps> = ({ onAddLivre }) => {
    const [titre, setTitre] = useState<string>("");
    const [auteur, setAuteur] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await onAddLivre({ titre, auteur });
            setSuccess(true);
            setError(null);
            setTitre("");
            setAuteur("");
        } catch (err) {
            setError("Failed to add livre");
            setSuccess(false);
        }
    };

    return (
        <motion.div
            className="bg-white p-4 rounded-lg shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <h2 className="text-xl font-semibold mb-4">Add a New Book</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-neutral-700">Title:</label>
                    <input
                        type="text"
                        value={titre}
                        onChange={(e) => setTitre(e.target.value)}
                        className="mt-1 block w-full p-2 border border-neutral-300 rounded-md"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-neutral-700">Author:</label>
                    <input
                        type="text"
                        value={auteur}
                        onChange={(e) => setAuteur(e.target.value)}
                        className="mt-1 block w-full p-2 border border-neutral-300 rounded-md"
                        required
                    />
                </div>
                <motion.button
                    type="submit"
                    className="bg-neutral-700 text-white px-4 py-2 rounded-md hover:bg-neutral-600"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Add Book
                </motion.button>
            </form>
            <AnimatePresence>
                {success && (
                    <motion.p
                        className="mt-4 text-green-600"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                    >
                        Book added successfully!
                    </motion.p>
                )}
                {error && (
                    <motion.p
                        className="mt-4 text-red-600"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                    >
                        {error}
                    </motion.p>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default AddLivreForm;

