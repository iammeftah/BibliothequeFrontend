import React, { useEffect, useState } from "react";
import { fetchLivres, addLivre } from "../api";

interface Livre {
    id: number;
    titre: string;
    auteur: string;
}

const LivreTable: React.FC = () => {
    const [livres, setLivres] = useState<Livre[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch livres on component mount
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

    // Handle adding a new livre
    const handleAddLivre = async (livre: { titre: string; auteur: string }) => {
        try {
            const newLivre = await addLivre(livre);
            setLivres([...livres, newLivre]); // Update the table with the new livre
        } catch (err) {
            setError("Failed to add livre");
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="bg-neutral-100 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">List of Livres</h2>
            <table className="min-w-full bg-white border border-neutral-300 mb-6">
                <thead>
                <tr>
                    <th className="py-2 px-4 border-b">ID</th>
                    <th className="py-2 px-4 border-b">Titre</th>
                    <th className="py-2 px-4 border-b">Auteur</th>
                </tr>
                </thead>
                <tbody>
                {livres.map((livre) => (
                    <tr key={livre.id} className="hover:bg-neutral-50">
                        <td className="py-2 px-4 border-b">{livre.id}</td>
                        <td className="py-2 px-4 border-b">{livre.titre}</td>
                        <td className="py-2 px-4 border-b">{livre.auteur}</td>
                    </tr>
                ))}
                </tbody>
            </table>

            <h2 className="text-xl font-semibold mb-4">Add a New Book</h2>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    const form = e.target as HTMLFormElement;
                    const titre = (form.elements.namedItem("titre") as HTMLInputElement).value;
                    const auteur = (form.elements.namedItem("auteur") as HTMLInputElement).value;
                    handleAddLivre({ titre, auteur });
                    form.reset();
                }}
                className="space-y-4"
            >
                <div>
                    <label className="block text-sm font-medium text-neutral-700">Title:</label>
                    <input
                        type="text"
                        name="titre"
                        className="mt-1 block w-full p-2 border border-neutral-300 rounded-md"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-neutral-700">Author:</label>
                    <input
                        type="text"
                        name="auteur"
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
        </div>
    );
};

export default LivreTable;