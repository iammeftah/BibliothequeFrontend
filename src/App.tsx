import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import LivreTable from "./components/LivreTable";
import UtilisateurTable from "./components/UtilisateurTable";
import PretTable from "./components/PretTable";
import Home from "./components/Home";

const App: React.FC = () => {
    return (
        <Router>
            <div className="min-h-screen bg-neutral-50">
                <Navbar />
                <div className="container mx-auto p-4">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/livres" element={<LivreTable />} />
                        <Route path="/utilisateurs" element={<UtilisateurTable />} />
                        <Route path="/prets" element={<PretTable />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
};

export default App;