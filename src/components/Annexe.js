import React, { useState, useEffect, useRef } from 'react';
import Navbar from './Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { getAllProduitsParticulier, getAllProduitsEntreprise } from '../services/ProduitService';
import { addAnnexe, getAllAnnexe } from '../services/AnnexeService';
import Particulier from './Particulier'; // Remplacez par le bon chemin vers Particulier
import Entreprise from './Entreprise';

const Annexe = () => {
  const [showModal, setShowModal] = useState(false);
  const [isDropdown1Open, setIsDropdown1Open] = useState(false);
  const [isDropdown2Open, setIsDropdown2Open] = useState(false);
  const [isDropdown3Open, setIsDropdown3Open] = useState(false);


  const [inputText, setInputText] = useState('');
  const [annexes, setAnnexes] = useState([]);
  const [particuliers, setParticuliers] = useState([]);
  const [entreprises, setEntreprises] = useState([]);
  const [selectedCodeProduit, setSelectedCodeProduit] = useState('');
  const dropdownRef1 = useRef(null);
  const dropdownRef2 = useRef(null);
  const dropdownRef3 = useRef(null);

  const [numeroAnnexe, setNumeroAnnexe] = useState('');
  const [libelle, setLibelle] = useState('');
  const [codeBq, setCodeBq] = useState('');

  useEffect(() => {
    loadAnnexes();
    loadParticuliers();
    loadEntreprises();
  }, []);

  const loadAnnexes = async () => {
    try {
      const data = await getAllAnnexe();
      const formattedData = data.map(annexe => ({
        ...annexe,
      }));
      setAnnexes(formattedData);
    } catch (error) {
      console.error('Erreur lors du chargement des annexes :', error);
    }
  };

  const loadParticuliers = async () => {
    try {
      const data = await getAllProduitsParticulier();
      setParticuliers(data); // Assurez-vous que data est bien formaté comme un tableau d'objets
    } catch (error) {
      console.error('Erreur lors du chargement des produits particuliers :', error);
    }
  };

  const loadEntreprises = async () => {
    try {
      const data = await getAllProduitsEntreprise();
      setEntreprises(data); // Assurez-vous que data est bien formaté comme un tableau d'objets
    } catch (error) {
      console.error('Erreur lors du chargement des produits d\'entreprise :', error);
    }
  };
  

  const handleClickOutside = event => {
    if (
      dropdownRef1.current && !dropdownRef1.current.contains(event.target) &&
      dropdownRef2.current && !dropdownRef2.current.contains(event.target) &&
      dropdownRef3.current && !dropdownRef3.current.contains(event.target)

    ) {
      setIsDropdown1Open(false);
      setIsDropdown2Open(false);
      setIsDropdown3Open(false);

    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const toggleDropdown1 = () => {
    setIsDropdown1Open(!isDropdown1Open);
    setIsDropdown2Open(false);
    setIsDropdown3Open(false);

  };

  const toggleDropdown2 = () => {
    setIsDropdown2Open(!isDropdown2Open);
    setIsDropdown1Open(false);
    setIsDropdown3Open(false);

  };

  const toggleDropdown3 = () => {
    setIsDropdown3Open(!isDropdown3Open);
    setIsDropdown1Open(false);
    setIsDropdown2Open(false);

  };

  const handleInputChange = event => {
    setInputText(event.target.value);
  };

  const handleDropdown1Click = event => {
    event.stopPropagation();
  };

  const handleDropdown2Click = event => {
    event.stopPropagation();
  };

  const handleDropdown3Click = event => {
    event.stopPropagation();
  };

  const handleFilterClick = () => {
    loadAnnexes();
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const annexeDTO = {
      codeProduit: selectedCodeProduit,
      numeroAnnexe,
      codeBq,
      libelle,
    };

    try {
      await addAnnexe(annexeDTO);
      await loadAnnexes();
      closeModal();
    } catch (error) {
      console.error('Erreur lors de l\'ajout de l\'annexe :', error);
    }
  };

  const openModal = () => setShowModal(true);

  const closeModal = () => {
    setShowModal(false);
    setNumeroAnnexe('');
    setCodeBq('');
    setLibelle('');
  };

  const filterOptionsByCodeProduit = () => {
    const filteredParticuliers = particuliers.filter(produit =>
      produit.codeProduit.toLowerCase().includes(inputText.toLowerCase())
    );
    const filteredEntreprises = entreprises.filter(produit =>
      produit.codeProduit.toLowerCase().includes(inputText.toLowerCase())
    );
    const filteredCodes = [...filteredParticuliers, ...filteredEntreprises].map(produit => produit.codeProduit);
    return [...new Set(filteredCodes)]; // Utiliser un ensemble pour éviter les doublons
  };

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 overflow-hidden">
      <Navbar />
      <div className="container mx-auto mt-20 p-4 text-center">
        <h2 className="text-2xl font-bold mb-10">Home / Annexe</h2>
        <div className="flex space-x-4 items-center mb-10">
          <div className="relative flex-1" onClick={handleDropdown1Click}>
            <button
              id="dropdownButton1"
              className={`text-black font-bold hover:text-[#EF6011] px-4 py-2 bg-white hover:bg-white-smoke focus:ring-1 focus:outline-none focus:ring-[#f7af88] font-medium rounded-lg text-sm inline-flex items-center w-full h-[40px] ${isDropdown1Open ? 'shadow-md' : ''}`}
              onClick={toggleDropdown1}
            >
              Code Produit <FontAwesomeIcon icon={faChevronDown} className="ml-1" />
            </button>
            {isDropdown1Open && (
              <div ref={dropdownRef1} className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-full absolute mt-2" onClick={handleDropdown1Click}>
                <ul className="py-2 text-sm text-gray-700">
                  <li><a href="/option1" className="block px-4 py-2 hover:bg-gray-100"> 1</a></li>
                  <li><a href="/option2" className="block px-4 py-2 hover:bg-gray-100"> 2</a></li>
                </ul>
              </div>
            )}
          </div>

          <div className="relative flex-1" onClick={handleDropdown2Click}>
            <button
              id="dropdownButton2"
              className={`text-black font-bold hover:text-[#EF6011] px-4 py-2 bg-white hover:bg-white-smoke focus:ring-1 focus:outline-none focus:ring-[#f7af88] font-medium rounded-lg text-sm inline-flex items-center w-full h-[40px] ${isDropdown2Open ? 'shadow-md' : ''}`}
              onClick={toggleDropdown2}
            >
              Numéro Annexe <FontAwesomeIcon icon={faChevronDown} className="ml-1" />
            </button>
            {isDropdown2Open && (
              <div ref={dropdownRef2} className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-full absolute mt-2" onClick={handleDropdown2Click}>
                <ul className="py-2 text-sm text-gray-700">
                  <li><a href="/option3" className="block px-4 py-2 hover:bg-gray-100">Option 3</a></li>
                  <li><a href="/option4" className="block px-4 py-2 hover:bg-gray-100">Option 4</a></li>
                </ul>
              </div>
            )}
          </div>

          <div className="relative flex-1">
            <input
              type="text"
              id="textInput"
              name="textInput"
              placeholder="Code Banque"
              value={inputText}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-500 h-[40px]"
            />
          </div>

          <button
            className="bg-green-500 hover:bg-green-600 text-white px-2 py-1.5 rounded-md ml-2 flex items-center justify-center space-x-1"
            onClick={handleFilterClick}
          >
            <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="10" cy="10" r="7" />
              <line x1="21" y1="21" x2="15" y2="15" />
            </svg>
          </button>
        </div>

        <div className="flex justify-end mb-4">
          <button
            className="bg-red-900 text-white px-3 py-1 rounded-full flex items-center text-sm hover:text-white"
            onClick={openModal}
          >
             <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-6 mr-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            Ajouter une annexe
          </button>
        </div>

        <div className="overflow-x-auto">
          <div className="min-w-full shadow-md rounded-lg overflow-hidden">
            <div className="table-container overflow-y-auto h-64">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="sticky top-0 bg-orange-200 text-black-800">
                  <tr className="flex w-full mb-2">
                    <th className="p-2 flex-1 text-left font-medium">CODE PRODUIT</th>
                    <th className="p-2 flex-1 text-left font-medium">NUMÉRO ANNEXE</th>
                    <th className="p-2 flex-1 text-left font-medium">CODE BANQUE</th>
                    <th className="p-2 flex-1 text-left font-medium">LIBELLÉ</th>
                    <th className="p-2 flex-1 text-left font-medium">ACTION</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  {annexes.map((annexe) => (
                    <tr key={annexe.id} className="flex w-full mb-2">
                      <td className="p-2 flex-1">{annexe.codeProduit}</td>
                      <td className="p-2 flex-1">{annexe.numeroAnnexe}</td>
                      <td className="p-2 flex-1">{annexe.codeBq}</td>
                      <td className="p-2 flex-1">{annexe.libelle}</td>
                      <td className="p-2 flex-1"></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Modal pour ajouter une annexe */}
        {showModal && (
  <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
    <div className="bg-white p-8 rounded-lg shadow-lg w-96 relative">
      <button
        type="button"
        className="absolute top-2 right-3 text-gray-400 hover:text-gray-600"
        onClick={() => closeModal('annulationTAM')}
      >
        &times;
      </button>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="codeProduit" className="block text-sm font-medium text-gray-700">
            Code Produit
          </label>
          <div className="relative">
            <div className="bg-white flex flex-col items-center justify-start">
              <div
                id="dropdownButton1"
                className={`border border-gray-300 p-2 w-full rounded-md flex justify-between items-center focus:outline-none focus:ring-1 focus:ring-[#f7af88] ${isDropdown3Open ? 'shadow-md bg-white' : ''}`}
                onClick={toggleDropdown3}
              >
                <span>{selectedCodeProduit || "-- Sélectionnez --"}</span>
                <FontAwesomeIcon icon={faChevronDown} className="ml-1" />
              </div>
              {isDropdown3Open && (
                <div ref={dropdownRef3} className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-full absolute mt-1 max-h-48 overflow-y-auto">
                  <ul className="py-2 text-sm text-gray-700">
                    {/* Utilisez vos données spécifiques pour la liste déroulante */}
                    {filterOptionsByCodeProduit().map((option, index) => (
                      <li key={index}>
                        <button
                          className="block px-4 py-2 hover:bg-gray-100 w-full text-left"
                          onClick={() => {
                            setSelectedCodeProduit(option);
                            toggleDropdown3(); // Ferme la liste déroulante après sélection
                          }}
                        >
                          {option}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mb-4 flex">
          <div className="w-1/2 mr-2">
            <label htmlFor="numeroAnnexe" className="block text-sm font-medium text-gray-700">
              Numéro Annexe
            </label>
            <input
              type="text"
              id="numeroAnnexe"
              name="numeroAnnexe"
              value={numeroAnnexe}
              onChange={(e) => setNumeroAnnexe(e.target.value)}
              className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:ring-1 focus:ring-[#f7af88]"
            />
          </div>
          <div className="w-1/2 ml-2">
            <label htmlFor="codeBq" className="block text-sm font-medium text-gray-700">
              Code Banque
            </label>
            <input
              type="text"
              id="codeBq"
              name="codeBq"
              value={codeBq}
              onChange={(e) => setCodeBq(e.target.value)}
              className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:ring-1 focus:ring-[#f7af88]"
            />
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="libelle" className="block text-sm font-medium text-gray-700">
            Libellé
          </label>
          <input
            type="text"
            id="libelle"
            name="libelle"
            value={libelle}
            onChange={(e) => setLibelle(e.target.value)}
            className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:ring-1 focus:ring-[#f7af88]"
          />
        </div>

        <div className="flex justify-end">
          <button type="button" onClick={closeModal} className="mr-4 bg-gray-300 text-black px-6 py-1 rounded-md">Annuler</button>
          <button type="submit" className="bg-red-900 text-white px-6 py-1 rounded-md">Ajouter</button>
        </div>
      </form>
    </div>
  </div>
)}

      </div>
    </div>
  );
};

export default Annexe;
