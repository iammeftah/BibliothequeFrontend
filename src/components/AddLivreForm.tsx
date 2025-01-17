import React, { useState } from "react";
import { addLivre } from "../api";

const AddLivreForm: React.FC = () => {
    const [titre, setTitre] = useState<string>("");
    const [auteur, setAuteur] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await addLivre({ titre, auteur });
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
        <div className="bg-neutral-100 p-6 rounded-lg shadow-md">
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
                <button
                    type="submit"
                    className="bg-neutral-700 text-white px-4 py-2 rounded-md hover:bg-neutral-600"
                >
                    Add Book
                </button>
            </form>
            {success && <p className="mt-4 text-green-600">Book added successfully!</p>}
            {error && <p className="mt-4 text-red-600">{error}</p>}
        </div>
    );
};

export default AddLivreForm;