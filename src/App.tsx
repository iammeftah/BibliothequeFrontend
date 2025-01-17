import React from "react";
import Navbar from "./components/Navbar";
import AddLivreForm from "./components/AddLivreForm";
import AddUtilisateurForm from "./components/AddUtilisateurForm";
import LoanBookForm from "./components/LoanBookForm";

const App: React.FC = () => {
    return (
        <div className="min-h-screen bg-neutral-50">
            <Navbar />
            <div className="container mx-auto p-4 space-y-6">
                <AddLivreForm />
                <AddUtilisateurForm />
                <LoanBookForm />
            </div>
        </div>
    );
};

export default App;