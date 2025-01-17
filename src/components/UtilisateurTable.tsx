import React, { useEffect, useState } from "react";
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

    // Fetch utilisateurs on component mount
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

    // Handle adding a new utilisateur
    const handleAddUtilisateur = async (utilisateur: { nom: string; email: string }) => {
        try {
            const newUtilisateur = await addUtilisateur(utilisateur);
            setUtilisateurs([...utilisateurs, newUtilisateur]); // Update the table with the new utilisateur
        } catch (err) {
            setError("Failed to add utilisateur");
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
            <h2 className="text-xl font-semibold mb-4">List of Utilisateurs</h2>
            <table className="min-w-full bg-white border border-neutral-300 mb-6">
                <thead>
                <tr>
                    <th className="py-2 px-4 border-b">ID</th>
                    <th className="py-2 px-4 border-b">Nom</th>
                    <th className="py-2 px-4 border-b">Email</th>
                </tr>
                </thead>
                <tbody>
                {utilisateurs.map((utilisateur) => (
                    <tr key={utilisateur.id} className="hover:bg-neutral-50">
                        <td className="py-2 px-4 border-b">{utilisateur.id}</td>
                        <td className="py-2 px-4 border-b">{utilisateur.nom}</td>
                        <td className="py-2 px-4 border-b">{utilisateur.email}</td>
                    </tr>
                ))}
                </tbody>
            </table>

            <h2 className="text-xl font-semibold mb-4">Add a New User</h2>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    const form = e.target as HTMLFormElement;
                    const nom = (form.elements.namedItem("nom") as HTMLInputElement).value;
                    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
                    handleAddUtilisateur({ nom, email });
                    form.reset();
                }}
                className="space-y-4"
            >
                <div>
                    <label className="block text-sm font-medium text-neutral-700">Name:</label>
                    <input
                        type="text"
                        name="nom"
                        className="mt-1 block w-full p-2 border border-neutral-300 rounded-md"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-neutral-700">Email:</label>
                    <input
                        type="email"
                        name="email"
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
        </div>
    );
};

export default UtilisateurTable;