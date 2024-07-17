import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';

const EtatAnnulationMEJ = () => {
  const [etatAnnulationMejList, setEtatAnnulationMejList] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [filteredEtatAnnulationMejList, setFilteredEtatAnnulationMejList] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [etatAnnulationMejData, setEtatAnnulationMejData] = useState({
    idCredit: '',
    codeMotif: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetchEtatAnnulationMejList();
  }, []);

  const fetchEtatAnnulationMejList = async () => {
    try {
      const response = await axios.get('http://localhost:8084/annexes/getAllEtatAnnulationMej');
      if (Array.isArray(response.data)) {
        setEtatAnnulationMejList(response.data);
        setFilteredEtatAnnulationMejList(response.data);
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

    const filteredList = etatAnnulationMejList.filter((item) =>
      item.idCredit.toString().toLowerCase().includes(value.toLowerCase())
    );

    setFilteredEtatAnnulationMejList(filteredList);
  };

  const openModal = (isEdit = false, data = null) => {
    setIsEditMode(isEdit);
    if (isEdit && data) {
      setEtatAnnulationMejData(data);
      setCurrentId(data.id);
    } else {
      setEtatAnnulationMejData({
        idCredit: '',
        codeMotif: '',
      });
    }
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setIsEditMode(false);
    setEtatAnnulationMejData({
      idCredit: '',
      codeMotif: '',
    });
    setCurrentId(null);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEtatAnnulationMejData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      let response;
      if (isEditMode) {
        response = await axios.put(`http://localhost:8084/annexes/updateEtatAnnulationMej/${currentId}`, etatAnnulationMejData);
      } else {
        response = await axios.post('http://localhost:8084/annexes/addEtatAnnulationMej', etatAnnulationMejData);
      }
      
      if (response.status === 200) {
        console.log('Formulaire soumis avec succès:', response.data);
        fetchEtatAnnulationMejList(); // Mettre à jour la liste après soumission
        closeModal(); // Fermer le formulaire après soumission
      } else {
        console.error('Erreur lors de la soumission du formulaire');
      }
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8084/annexes/deleteEtatAnnulationMej/${id}`);
      if (response.status === 200) {
        console.log('Enregistrement supprimé avec succès:', response.data);
        fetchEtatAnnulationMejList();
      } else {
        console.error('Erreur lors de la suppression de l\'enregistrement');
      }
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  const handleNavigationBack = () => {
    navigate('/demandeEntreprise');
  };

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="container mx-auto mt-16 p-4 text-center flex-1">
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
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">État d'Annulation MEJ</span>
              </div>
            </li>
          </ol>
        </nav>

        <div className="flex justify-between mb-4">
          <button
            onClick={() => openModal()}
            className="text-white bg-[#FF9119] hover:bg-[#FF9119]/80 focus:outline-none focus:ring-4 focus:ring-[#FF9119]/50 font-medium rounded-full text-sm px-5 py-2.5 text-center dark:bg-[#FF9119] dark:hover:bg-[#FF9119]/80 dark:focus:ring-[#FF9119]/30 transition duration-150"
          >
            Ajouter un nouvel État d'Annulation MEJ
          </button>
          <input
            type="text"
            value={searchInput}
            onChange={handleSearch}
            placeholder="Rechercher..."
            className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-[#FF9119] focus:border-[#FF9119]"
          />
        </div>

        <div className="flex-1 overflow-y-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 table-fixed">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 sticky top-0">
              <tr>
                <th scope="col" className="px-6 py-3 w-1/2">
                  ID Crédit
                </th>
                <th scope="col" className="px-6 py-3 w-1/2">
                  Code Motif
                </th>
                <th scope="col" className="px-6 py-3 w-1/4 text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredEtatAnnulationMejList.map((etatAnnulationMej, index) => (
                <tr
                  key={index}
                  className={`border-b dark:border-gray-700 ${
                    index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-700'
                  }`}
                >
                  <td className="px-6 py-4">{etatAnnulationMej.idCredit}</td>
                  <td className="px-6 py-4">{etatAnnulationMej.codeMotif}</td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => openModal(true, etatAnnulationMej)}
                      className="text-[#FF9119] hover:text-[#FF9119]/80"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(etatAnnulationMej.id)}
                      className="ml-2 text-red-600 hover:text-red-700"
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {modalIsOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-lg">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                {isEditMode ? 'Modifier État d\'Annulation MEJ' : 'Ajouter un État d\'Annulation MEJ'}
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="idCredit" className="block text-sm font-medium text-gray-900 dark:text-gray-100">
                    ID Crédit
                  </label>
                  <input
                    type="text"
                    id="idCredit"
                    name="idCredit"
                    value={etatAnnulationMejData.idCredit}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#FF9119] focus:border-[#FF9119] dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="codeMotif" className="block text-sm font-medium text-gray-900 dark:text-gray-100">
                    Code Motif
                  </label>
                  <select
                    id="codeMotif"
                    name="codeMotif"
                    value={etatAnnulationMejData.codeMotif}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#FF9119] focus:border-[#FF9119] dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300"
                    required
                  >
                    <option value="" disabled>Choisir un motif</option>
                    <option value="Apurement">Apurement</option>
                    <option value="Reechelonnement_Consolidation">Reechelonnement/Consolidation</option>
                  </select>
                </div>
 <div className="flex justify-end">
                <button
                  type="button"
                  onClick={closeModal}
                  className="mr-4 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#FF9119] text-white rounded-lg hover:bg-[#FF9119]/80"
                >
                  {isEditMode ? 'Enregistrer les modifications' : 'Ajouter'}
                </button>
              </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EtatAnnulationMEJ;
