const LIVRE_API_URL = "http://51.120.122.37:8081"; // Livres microservice
const UTILISATEUR_API_URL = "http://51.120.122.37:8082"; // Utilisateurs microservice
const PRET_API_URL = "http://51.120.122.37:8083"; // Prets microservice

// Livres API
export const fetchLivres = async () => {
    try {
        const response = await fetch(`${LIVRE_API_URL}/livres`);
        if (!response.ok) {
            throw new Error("Failed to fetch livres");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching livres:", error);
        throw error;
    }
};

export const addLivre = async (livre: { titre: string; auteur: string }) => {
    try {
        const response = await fetch(`${LIVRE_API_URL}/livres`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(livre),
        });
        if (!response.ok) {
            throw new Error("Failed to add livre");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error adding livre:", error);
        throw error;
    }
};

// Utilisateurs API
export const fetchUtilisateurs = async () => {
    try {
        const response = await fetch(`${UTILISATEUR_API_URL}/utilisateurs`);
        if (!response.ok) {
            throw new Error("Failed to fetch utilisateurs");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching utilisateurs:", error);
        throw error;
    }
};

export const addUtilisateur = async (utilisateur: { nom: string; email: string }) => {
    try {
        const response = await fetch(`${UTILISATEUR_API_URL}/utilisateurs`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(utilisateur),
        });
        if (!response.ok) {
            throw new Error("Failed to add utilisateur");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error adding utilisateur:", error);
        throw error;
    }
};

// Prets API
export const fetchPrets = async () => {
    try {
        const response = await fetch(`${PRET_API_URL}/prets`);
        if (!response.ok) {
            throw new Error("Failed to fetch prets");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching prets:", error);
        throw error;
    }
};

export const addPret = async (pret: { livreId: number; utilisateurId: number; datePret: string; dateRetour: string }) => {
    try {
        const response = await fetch(`${PRET_API_URL}/prets`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(pret),
        });
        if (!response.ok) {
            throw new Error("Failed to add pret");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error adding pret:", error);
        throw error;
    }
};