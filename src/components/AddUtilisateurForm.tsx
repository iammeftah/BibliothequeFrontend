import React, { useState } from "react";
import { addUtilisateur } from "../api";

const AddUtilisateurForm: React.FC = () => {
    const [nom, setNom] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await addUtilisateur({ nom, email });
            setSuccess(true);
            setError(null);
            setNom("");
            setEmail("");
        } catch (err) {
            setError("Failed to add user");
            setSuccess(false);
        }
    };

    return (
        <div className="bg-neutral-100 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Add a New User</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-neutral-700">Name:</label>
                    <input
                        type="text"
                        value={nom}
                        onChange={(e) => setNom(e.target.value)}
                        className="mt-1 block w-full p-2 border border-neutral-300 rounded-md"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-neutral-700">Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-1 block w-full p-2 border border-neutral-300 rounded-md"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="bg-neutral-700 text-white px-4 py-2 rounded-md hover:bg-neutral-600"
                >
                    Add User
                </button>
            </form>
            {success && <p className="mt-4 text-green-600">User added successfully!</p>}
            {error && <p className="mt-4 text-red-600">{error}</p>}
        </div>
    );
};

export default AddUtilisateurForm;