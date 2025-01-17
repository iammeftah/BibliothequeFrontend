import React, { useEffect, useState } from "react";
import { fetchUtilisateurs } from "../api";

interface Utilisateur {
    id: number;
    nom: string;
    email: string;
}

const UtilisateurList: React.FC = () => {
    const [utilisateurs, setUtilisateurs] = useState<Utilisateur[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

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

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h1>List of Utilisateurs</h1>
            <ul>
                {utilisateurs.map((utilisateur) => (
                    <li key={utilisateur.id}>
                        {utilisateur.nom} - {utilisateur.email}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UtilisateurList;