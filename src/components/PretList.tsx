import React, { useEffect, useState } from "react";
import { fetchPrets } from "../api";

interface Pret {
    id: number;
    livreId: number;
    utilisateurId: number;
    datePret: string;
    dateRetour: string;
}

const PretList: React.FC = () => {
    const [prets, setPrets] = useState<Pret[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

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

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h1>List of Prets</h1>
            <ul>
                {prets.map((pret) => (
                    <li key={pret.id}>
                        Livre ID: {pret.livreId}, Utilisateur ID: {pret.utilisateurId}, Date Pret: {pret.datePret}, Date Retour: {pret.dateRetour}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PretList;