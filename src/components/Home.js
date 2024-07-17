import React from 'react';
import Navbar from './Navbar'; // Assurez-vous d'importer correctement votre composant Navbar ici

const Home = () => {
  return (
    <div>
      <Navbar /> {/* Incluez votre Navbar */}
      <div className="container mx-auto mt-20 p-4 text-center">
      <h2 className="text-2xl font-bold mb-10">Tableau de bord</h2>
      {/* Votre contenu de tableau de bord peut être ajouté ici */}
      </div>
    </div>
  );
};

export default Home;
