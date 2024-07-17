import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';  

const DemandeEntreprise = () => {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 overflow-hidden">
      <Navbar />

      <div className="container mx-auto mt-16 p-4 text-center overflow-y-auto h-screen">
        <Link to="/Demande"
          className="text-black px-4 py-2 rounded flex items-center transition-colors duration-300 hover:text-orange-500"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
          </svg> 
          retour
        </Link>

        <h2 className="text-2xl font-bold mt-4 mb-20">Demandes de crédits / Pour Entreprise</h2>

        <section className="flex items-center justify-center">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
            <Link
              to="/DetailReglementRistourne"
              className="flex items-center justify-center w-40 h-40 text-gray-700 bg-white transition duration-150 ease-in-out rounded-lg border border-gray-300 hover:text-orange-500 hover:border-orange-500"
            >
              Détail Reglement Ristourne
            </Link>
            <Link
              to="/EtatAnnulationMej"
              className="flex items-center justify-center w-40 h-40 text-gray-700 bg-white transition duration-150 ease-in-out rounded-lg border border-gray-300 hover:text-orange-500 hover:border-orange-500"
            >
                Etat Annulation <br/> Mej
            </Link>
            <Link
              to="/EtatRecouvrementRealise"
              className="flex items-center justify-center w-40 h-40 text-gray-700 bg-white transition duration-150 ease-in-out rounded-lg border border-gray-300 hover:text-orange-500 hover:border-orange-500"
            >
              Etat Recouvrement Realise
            </Link>
            <Link
              to="/ReglementMEJ"
              className="flex items-center justify-center w-40 h-40 text-gray-700 bg-white transition duration-150 ease-in-out rounded-lg border border-gray-300 hover:text-orange-500 hover:border-orange-500"
            >
             Reglement Mej
            </Link>
            <Link
              to="/RestitutionMEJ"
              className="flex items-center justify-center w-40 h-40 text-gray-700 bg-white transition duration-150 ease-in-out rounded-lg border border-gray-300 hover:text-orange-500 hover:border-orange-500"
            >
              Etat Restitution <br/> MEJ
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default DemandeEntreprise;
