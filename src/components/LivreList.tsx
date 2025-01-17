import React, { useEffect, useState } from "react";
import { fetchLivres } from "../api";

interface Livre {
    id: number;
    titre: string;
    auteur: string;
}

const LivreList: React.FC = () => {
    const [livres, setLivres] = useState<Livre[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

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

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h1>List of Livres</h1>
            <ul>
                {livres.map((livre) => (
                    <li key={livre.id}>
                        {livre.titre} by {livre.auteur}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default LivreList;