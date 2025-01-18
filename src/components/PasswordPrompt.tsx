import React, { useState } from "react";
import { motion } from "framer-motion";

interface PasswordPromptProps {
    onPasswordCorrect: () => void;
}

const PasswordPrompt: React.FC<PasswordPromptProps> = ({ onPasswordCorrect }) => {
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === "$meftah2025hmed") { // Replace with your secure password
            onPasswordCorrect();
            setError(null);
        } else {
            setError("Incorrect password");
        }
    };

    return (
        <motion.div
            className="bg-white p-4 rounded-lg shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <h2 className="text-xl font-semibold mb-4">Enter Password</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-neutral-700">Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="mt-1 block w-full p-2 border border-neutral-300 rounded-md"
                        required
                    />
                </div>
                {error && <p className="text-red-600">{error}</p>}
                <motion.button
                    type="submit"
                    className="bg-neutral-700 text-white px-4 py-2 rounded-md hover:bg-neutral-600"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Submit
                </motion.button>
            </form>
        </motion.div>
    );
};

export default PasswordPrompt;