import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';  // Assurez-vous que ce composant est correctement configuré
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaEdit, FaTrash } from 'react-icons/fa';

const DetailRecouvrementRealise = () => {
  const [etatRecouvrementRealiseList, setEtatRecouvrementRealiseList] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [filteredEtatRecouvrementRealiseList, setFilteredEtatRecouvrementRealiseList] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [etatRecouvrementRealiseData, setEtatRecouvrementRealiseData] = useState({
    idCredit: '',
    recouvrementRealise: '',
    montantFrais: '',
    partTamwil: '',
    dateRecouvrementBq: '',
    dateVirementTamwil: '',
    refReglement: '',
    codeBq: '',
    nbreLigne: '',
    numeroAnnexe: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetchEtatRecouvrementRealiseList();
  }, []);

  const fetchEtatRecouvrementRealiseList = async () => {
    try {
      const response = await axios.get('http://localhost:8084/annexes/getAllEtatRecouvrementRealise');
      if (Array.isArray(response.data)) {
        setEtatRecouvrementRealiseList(response.data);
        setFilteredEtatRecouvrementRealiseList(response.data);
      } else {
        console.error('Les données reçues ne sont pas un tableau');
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des données:', error);
    }
  };

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchInput(value);

    const filteredList = etatRecouvrementRealiseList.filter((item) =>
      item.idCredit.toString().toLowerCase().includes(value.toLowerCase())
    );
    setFilteredEtatRecouvrementRealiseList(filteredList);
  };

  const openModal = (isEdit = false, data = null) => {
    setIsEditMode(isEdit);
    if (isEdit && data) {
      setEtatRecouvrementRealiseData(data);
      setCurrentId(data.id);
    } else {
      setEtatRecouvrementRealiseData({
        idCredit: '',
        recouvrementRealise: '',
        montantFrais: '',
        partTamwil: '',
        dateRecouvrementBq: '',
        dateVirementTamwil: '',
        refReglement: '',
        codeBq: '',
        nbreLigne: '',
        numeroAnnexe: '',
      });
    }
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setIsEditMode(false);
    setEtatRecouvrementRealiseData({
      idCredit: '',
      recouvrementRealise: '',
      montantFrais: '',
      partTamwil: '',
      dateRecouvrementBq: '',
      dateVirementTamwil: '',
      refReglement: '',
      codeBq: '',
      nbreLigne: '',
      numeroAnnexe: '',
    });
    setCurrentId(null);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEtatRecouvrementRealiseData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      let response;
      if (isEditMode) {
        response = await axios.put(`http://localhost:8084/annexes/updateEtatRecouvrementRealise/${currentId}`, etatRecouvrementRealiseData);
      } else {
        response = await axios.post('http://localhost:8084/annexes/addEtatRecouvrementRealise', etatRecouvrementRealiseData);
      }
      if (response.status === 200) {
        console.log('Formulaire soumis avec succès:', response.data);
        fetchEtatRecouvrementRealiseList();
        closeModal();
      } else {
        console.error('Erreur lors de la soumission du formulaire');
      }
    } catch (error) {
      console.error('Erreur lors de la soumission du formulaire:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8084/annexes/deleteEtatRecouvrementRealise/${id}`);
      if (response.status === 200) {
        console.log('État de Recouvrement Réalisé supprimé avec succès');
        fetchEtatRecouvrementRealiseList();
      } else {
        console.error('Erreur lors de la suppression');
      }
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
    }
  };

  const handleNavigationBack = () => {
    navigate('/DemandeEntreprise');
  };

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 overflow-hidden bg-gray-100 dark:bg-gray-900">
      <Navbar />
      <div className="container mx-auto mt-16 p-4 text-center overflow-y-auto h-screen">
        {/* Breadcrumb Navigation */}
        <nav className="flex mb-8" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
            <li className="inline-flex items-center">
              <button
                onClick={handleNavigationBack}
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
                Produit Entreprise
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
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">État de Recouvrement Réalisé</span>
              </div>
            </li>
          </ol>
        </nav>

        <div className="flex justify-between mb-4">
          <button
            onClick={() => openModal(false)}
            className="text-white bg-[#FF9119] hover:bg-[#FF9119]/80 focus:outline-none focus:ring-4 focus:ring-[#FF9119]/50 font-medium rounded-full text-sm px-5 py-2.5 text-center dark:bg-[#FF9119] dark:hover:bg-[#FF9119]/80 dark:focus:ring-[#FF9119]/30"
          >
            Ajouter
          </button>
          <input
            type="text"
            value={searchInput}
            onChange={handleSearch}
            placeholder="Rechercher..."
            className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-[#FF9119] focus:border-[#FF9119]"
          />
        </div>

        {/* Table */}
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg bg-white dark:bg-gray-800">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">ID Crédit</th>
                <th scope="col" className="px-6 py-3">Recouvrement Réalisé</th>
                <th scope="col" className="px-6 py-3">Montant Frais</th>
                <th scope="col" className="px-6 py-3">Part Tamwil</th>
                <th scope="col" className="px-6 py-3">Date Recouvrement BQ</th>
                <th scope="col" className="px-6 py-3">Date Virement Tamwil</th>
                <th scope="col" className="px-6 py-3">Réf Règlement</th>
                <th scope="col" className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEtatRecouvrementRealiseList.map((etat) => (
                <tr
                  key={etat.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="px-6 py-4">{etat.idCredit}</td>
                  <td className="px-6 py-4">{etat.recouvrementRealise}</td>
                  <td className="px-6 py-4">{etat.montantFrais}</td>
                  <td className="px-6 py-4">{etat.partTamwil}</td>
                  <td className="px-6 py-4">{etat.dateRecouvrementBq}</td>
                  <td className="px-6 py-4">{etat.dateVirementTamwil}</td>
                  <td className="px-6 py-4">{etat.refReglement}</td>
                
                  <td className="px-6 py-4 flex items-center space-x-4 rtl:space-x-reverse">
<button
                      onClick={() => openModal(true, etat)}
                      className="text-orange-500 hover:text-orange-700 mr-2"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(etat.id)}
                     className="text-orange-500 hover:text-orange-700 mr-2"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {modalIsOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-11/12 sm:w-1/2 lg:w-1/3">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
              {isEditMode ? 'Modifier' : 'Ajouter'} État de Recouvrement Réalisé
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="idCredit" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                  ID Crédit
                </label>
                <input
                  type="text"
                  id="idCredit"
                  name="idCredit"
                  value={etatRecouvrementRealiseData.idCredit}
                  onChange={handleChange}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#FF9119] focus:border-[#FF9119]"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="recouvrementRealise" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                  Recouvrement Réalisé
                </label>
                <input
                  type="text"
                  id="recouvrementRealise"
                  name="recouvrementRealise"
                  value={etatRecouvrementRealiseData.recouvrementRealise}
                  onChange={handleChange}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#FF9119] focus:border-[#FF9119]"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="montantFrais" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                  Montant Frais
                </label>
                <input
                  type="text"
                  id="montantFrais"
                  name="montantFrais"
                  value={etatRecouvrementRealiseData.montantFrais}
                  onChange={handleChange}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#FF9119] focus:border-[#FF9119]"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="partTamwil" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                  Part Tamwil
                </label>
                <input
                  type="text"
                  id="partTamwil"
                  name="partTamwil"
                  value={etatRecouvrementRealiseData.partTamwil}
                  onChange={handleChange}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#FF9119] focus:border-[#FF9119]"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="dateRecouvrementBq" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                  Date Recouvrement BQ
                </label>
                <input
                  type="date"
                  id="dateRecouvrementBq"
                  name="dateRecouvrementBq"
                  value={etatRecouvrementRealiseData.dateRecouvrementBq}
                  onChange={handleChange}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#FF9119] focus:border-[#FF9119]"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="dateVirementTamwil" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                  Date Virement Tamwil
                </label>
                <input
                  type="date"
                  id="dateVirementTamwil"
                  name="dateVirementTamwil"
                  value={etatRecouvrementRealiseData.dateVirementTamwil}
                  onChange={handleChange}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#FF9119] focus:border-[#FF9119]"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="refReglement" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                  Réf Règlement
                </label>
                <input
                  type="text"
                  id="refReglement"
                  name="refReglement"
                  value={etatRecouvrementRealiseData.refReglement}
                  onChange={handleChange}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#FF9119] focus:border-[#FF9119]"
                  required
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={closeModal}
                  className="text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-700 dark:focus:ring-gray-500"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="text-white bg-[#FF9119] hover:bg-[#FF9119]/80 focus:outline-none focus:ring-4 focus:ring-[#FF9119]/50 font-medium rounded-full text-sm px-5 py-2.5 mb-2 dark:bg-[#FF9119] dark:hover:bg-[#FF9119]/80 dark:focus:ring-[#FF9119]/30"
                >
                  {isEditMode ? 'Modifier' : 'Ajouter'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailRecouvrementRealise;

