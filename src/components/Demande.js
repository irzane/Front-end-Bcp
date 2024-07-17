import React from 'react';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';

const Demande = () => {
  const navigate = useNavigate();

  const handleNavigateHome = () => {
    navigate('/Home');
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 bottom-0 overflow-hidden">
        <Navbar />
        <div className="container mx-auto mt-20 p-4 text-center flex-1">
          <nav className="flex mb-8" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
              <li className="inline-flex items-center">
                <button
                  onClick={handleNavigateHome}
                  className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-[#FF9119] dark:text-gray-400 dark:hover:text-[#FF9119]"
                >
                  <svg
                    className="w-3 h-3 me-2.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z"/>
                  </svg>
                  Home
                </button>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <svg
                    className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 6 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M1 9l4-4-4-4"
                    />
                  </svg>
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Demandes de crédits</span>
                </div>
              </li>
            </ol>
          </nav>
          <h2 className="text-2xl font-bold mb-10">Demandes de crédits</h2>
          <div className="flex flex-col items-center space-y-4">
            <a href="/demandeParticulier" className="px-4 py-2 bg-white text-black rounded hover:text-red-800 transition duration-150 ease-in-out w-4/5 text-center">
              Pour Particulier
            </a>
            <a href="/demandeEntreprise" className="px-4 py-2 bg-white text-black rounded hover:text-red-800 transition duration-150 ease-in-out w-4/5 text-center">
              Pour Entreprise
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Demande;
