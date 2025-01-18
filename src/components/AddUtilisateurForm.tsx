import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Mail, CheckCircle, XCircle } from 'lucide-react';
import PasswordPrompt from "./PasswordPrompt"; // Import the PasswordPrompt component

interface AddUtilisateurFormProps {
    onAddUtilisateur: (utilisateur: { nom: string; email: string }) => Promise<void>;
}

const AddUtilisateurForm: React.FC<AddUtilisateurFormProps> = ({ onAddUtilisateur }) => {
    const [nom, setNom] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);
    const [isPasswordCorrect, setIsPasswordCorrect] = useState<boolean>(false); // Add password state

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await onAddUtilisateur({ nom, email });
            setSuccess(true);
            setError(null);
            setNom("");
            setEmail("");
            setTimeout(() => setSuccess(false), 3000);
        } catch (err) {
            setError("Failed to add user");
            setSuccess(false);
        }
    };

    return (
        <motion.div
            className="bg-neutral-100 p-6 rounded-lg shadow-md mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <h3 className="text-xl font-semibold mb-4 text-neutral-800">Add a New User</h3>
            {!isPasswordCorrect ? (
                <PasswordPrompt onPasswordCorrect={() => setIsPasswordCorrect(true)} />
            ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="nom" className="block text-sm font-medium text-neutral-700 mb-1">Name:</label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" size={18} />
                            <input
                                id="nom"
                                type="text"
                                value={nom}
                                onChange={(e) => setNom(e.target.value)}
                                className="pl-10 mt-1 block w-full p-2 border border-neutral-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1">Email:</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" size={18} />
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="pl-10 mt-1 block w-full p-2 border border-neutral-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>
                    </div>
                    <motion.button
                        type="submit"
                        className="bg-neutral-700 text-white px-4 py-2 rounded-md hover:bg-neutral-600"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Add User
                    </motion.button>
                </form>
            )}
            <AnimatePresence>
                {success && (
                    <motion.p
                        className="mt-4 text-green-600 flex items-center"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                    >
                        <CheckCircle className="mr-2" size={18} />
                        User added successfully!
                    </motion.p>
                )}
                {error && (
                    <motion.p
                        className="mt-4 text-red-600 flex items-center"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                    >
                        <XCircle className="mr-2" size={18} />
                        {error}
                    </motion.p>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default AddUtilisateurForm;