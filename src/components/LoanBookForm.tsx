import React, { useState } from "react";
import { addPret } from "../api";

const LoanBookForm: React.FC = () => {
    const [livreId, setLivreId] = useState<number>(0);
    const [utilisateurId, setUtilisateurId] = useState<number>(0);
    const [datePret, setDatePret] = useState<string>("");
    const [dateRetour, setDateRetour] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await addPret({ livreId, utilisateurId, datePret, dateRetour });
            setSuccess(true);
            setError(null);
            setLivreId(0);
            setUtilisateurId(0);
            setDatePret("");
            setDateRetour("");
        } catch (err) {
            setError("Failed to loan book");
            setSuccess(false);
        }
    };

    return (
        <div className="bg-neutral-100 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Loan a Book</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-neutral-700">Book ID:</label>
                    <input
                        type="number"
                        value={livreId}
                        onChange={(e) => setLivreId(Number(e.target.value))}
                        className="mt-1 block w-full p-2 border border-neutral-300 rounded-md"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-neutral-700">User ID:</label>
                    <input
                        type="number"
                        value={utilisateurId}
                        onChange={(e) => setUtilisateurId(Number(e.target.value))}
                        className="mt-1 block w-full p-2 border border-neutral-300 rounded-md"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-neutral-700">Loan Date:</label>
                    <input
                        type="date"
                        value={datePret}
                        onChange={(e) => setDatePret(e.target.value)}
                        className="mt-1 block w-full p-2 border border-neutral-300 rounded-md"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-neutral-700">Return Date:</label>
                    <input
                        type="date"
                        value={dateRetour}
                        onChange={(e) => setDateRetour(e.target.value)}
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
            {success && <p className="mt-4 text-green-600">Book loaned successfully!</p>}
            {error && <p className="mt-4 text-red-600">{error}</p>}
        </div>
    );
};

export default LoanBookForm;