import React, { useEffect, useState } from "react";
import { fetchPrets, addPret } from "../api";

interface Pret {
    id: number;
    livreId: number;
    utilisateurId: number;
    datePret: string;
    dateRetour: string;
}

const PretTable: React.FC = () => {
    const [prets, setPrets] = useState<Pret[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch prets on component mount
    useEffect(() => {
        const getPrets = async () => {
            try {
                const data = await fetchPrets();
                setPrets(data);
            } catch (err) {
                setError("Failed to fetch prets");
            } finally {
                setLoading(false);
            }
        };

        getPrets();
    }, []);

    // Handle adding a new pret
    const handleAddPret = async (pret: {
        livreId: number;
        utilisateurId: number;
        datePret: string;
        dateRetour: string;
    }) => {
        try {
            const newPret = await addPret(pret);
            setPrets([...prets, newPret]); // Update the table with the new pret
        } catch (err) {
            setError("Failed to add pret");
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
            <h2 className="text-xl font-semibold mb-4">List of Prets</h2>
            <table className="min-w-full bg-white border border-neutral-300 mb-6">
                <thead>
                <tr>
                    <th className="py-2 px-4 border-b">ID</th>
                    <th className="py-2 px-4 border-b">Livre ID</th>
                    <th className="py-2 px-4 border-b">Utilisateur ID</th>
                    <th className="py-2 px-4 border-b">Date Pret</th>
                    <th className="py-2 px-4 border-b">Date Retour</th>
                </tr>
                </thead>
                <tbody>
                {prets.map((pret) => (
                    <tr key={pret.id} className="hover:bg-neutral-50">
                        <td className="py-2 px-4 border-b">{pret.id}</td>
                        <td className="py-2 px-4 border-b">{pret.livreId}</td>
                        <td className="py-2 px-4 border-b">{pret.utilisateurId}</td>
                        <td className="py-2 px-4 border-b">{pret.datePret}</td>
                        <td className="py-2 px-4 border-b">{pret.dateRetour}</td>
                    </tr>
                ))}
                </tbody>
            </table>

            <h2 className="text-xl font-semibold mb-4">Loan a Book</h2>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    const form = e.target as HTMLFormElement;
                    const livreId = parseInt((form.elements.namedItem("livreId") as HTMLInputElement).value);
                    const utilisateurId = parseInt(
                        (form.elements.namedItem("utilisateurId") as HTMLInputElement).value
                    );
                    const datePret = (form.elements.namedItem("datePret") as HTMLInputElement).value;
                    const dateRetour = (form.elements.namedItem("dateRetour") as HTMLInputElement).value;
                    handleAddPret({ livreId, utilisateurId, datePret, dateRetour });
                    form.reset();
                }}
                className="space-y-4"
            >
                <div>
                    <label className="block text-sm font-medium text-neutral-700">Book ID:</label>
                    <input
                        type="number"
                        name="livreId"
                        className="mt-1 block w-full p-2 border border-neutral-300 rounded-md"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-neutral-700">User ID:</label>
                    <input
                        type="number"
                        name="utilisateurId"
                        className="mt-1 block w-full p-2 border border-neutral-300 rounded-md"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-neutral-700">Loan Date:</label>
                    <input
                        type="date"
                        name="datePret"
                        className="mt-1 block w-full p-2 border border-neutral-300 rounded-md"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-neutral-700">Return Date:</label>
                    <input
                        type="date"
                        name="dateRetour"
                        className="mt-1 block w-full p-2 border border-neutral-300 rounded-md"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="bg-neutral-700 text-white px-4 py-2 rounded-md hover:bg-neutral-600"
                >
                    Loan Book
                </button>
            </form>
        </div>
    );
};

export default PretTable;