import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faChevronDown, faUserCircle } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);

  const openServicesDropdown = () => {
    setIsServicesOpen(true);
  };

  const closeServicesDropdown = () => {
    setIsServicesOpen(false);
  };

  const openAccountDropdown = () => {
    setIsAccountOpen(true);
  };

  const closeAccountDropdown = () => {
    setIsAccountOpen(false);
  };

  return (
<nav className="bg-white h-18 mx-auto mt-3 p-3 rounded-full shadow-lg w-4/5">
<div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <div className="text-black text-lg font-bold" style={{ fontFamily: 'Arial', color: '#2C0B07' }}>
            <img src="/logo.png" alt="Logo" className="h-10 mr-2" />
          </div>
        </div>
        <ul className="flex space-x-8 text-center">
          <li className="text-black hover:text-[#EF6011] px-4 py-3" style={{ fontFamily: 'Arial' }}>
            <FontAwesomeIcon icon={faHome} className="mr-2" />
            <a href="/">Home</a>
          </li>
          <li className="relative text-black px-4 py-3" style={{ fontFamily: 'Arial' }}
              onMouseEnter={openServicesDropdown} onMouseLeave={closeServicesDropdown}>
            <button className="focus:outline-none hover:text-[#EF6011]">
              Nos services <FontAwesomeIcon icon={faChevronDown} className="ml-1" />
            </button>
            {isServicesOpen && (
              <ul className="absolute mt-2 bg-white text-gray-800 rounded shadow-lg" style={{ fontFamily: 'Arial' }}
                  onMouseEnter={openServicesDropdown} onMouseLeave={closeServicesDropdown}>
                <li className="px-4 py-2 hover:bg-white-smoke">
                  <a href="/entreprise" className="hover:text-[#EF6011]">Entreprise</a>
                </li>
                <li className="px-4 py-2 hover:bg-white-smoke">
                  <a href="/particulier" className="hover:text-[#EF6011]">Particulier</a>
                </li>
              </ul>
            )}
          </li>
          <li className="text-black hover:text-[#EF6011] px-4 py-3" style={{ fontFamily: 'Arial' }}>
            <a href="/demande">Demandes de crédits</a>
          </li>
          <li className="text-black hover:text-[#EF6011] px-4 py-3" style={{ fontFamily: 'Arial' }}>
            <a href="/annexe">Annexe</a>
          </li>
        
        
          <li className="relative text-black px-4 py-3" style={{ fontFamily: 'Arial' }}
              onMouseEnter={openAccountDropdown} onMouseLeave={closeAccountDropdown}>
            <button className="focus:outline-none hover:text-[#EF6011]">
            Mon Compte <FontAwesomeIcon icon={faUserCircle} className="ml-1" />  
            </button>
            {isAccountOpen && (
              <ul className="absolute mt-2 bg-white text-gray-800 rounded shadow-lg " style={{ fontFamily: 'Arial' }}
                  onMouseEnter={openAccountDropdown} onMouseLeave={closeAccountDropdown}>
                <li className="px-3 py-2 hover:bg-white-smoke">
                  <a href="/moncompte" className="hover:text-[#EF6011]">Mon profil </a>
                </li>
                <li className="px-3 py-2 hover:bg-white-smoke">
                <a href="/utilisateur" className="hover:text-[#EF6011]">Gestion des utilisateurs</a>
                </li>
                <li className="px-3 py-2 hover:bg-white-smoke flex items-center">
                <svg class="h-5 w-5 text-stone-900"  width="14" height="14" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />  <path d="M7 12h14l-3 -3m0 6l3 -3" /></svg>
                <a href="/login" className="text-black hover:text-[#EF6011] ml-2">Logout</a>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
