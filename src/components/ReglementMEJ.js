import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';  // Assurez-vous que ce composant est correctement configuré
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaEdit, FaTrash } from 'react-icons/fa';

const ReglementMEJ = () => {
  const [reglementMEJList, setReglementMEJList] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [filteredReglementMEJList, setFilteredReglementMEJList] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [reglementMEJData, setReglementMEJData] = useState({
    idCredit: '',
    montantMEJ: '',
    dateReglement: '',
    refReglement: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetchReglementMEJList();
  }, []);

  const fetchReglementMEJList = async () => {
    try {
      const response = await axios.get('http://localhost:8084/annexes/getAllReglementMej');
      if (Array.isArray(response.data)) {
        setReglementMEJList(response.data);
        setFilteredReglementMEJList(response.data);
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

    const filteredList = reglementMEJList.filter((item) =>
      item.idCredit.toString().toLowerCase().includes(value.toLowerCase())
    );

    setFilteredReglementMEJList(filteredList);
  };

  const openModal = (isEdit = false, data = null) => {
    setIsEditMode(isEdit);
    if (isEdit && data) {
      setReglementMEJData(data);
      setCurrentId(data.id);
    } else {
      setReglementMEJData({
        idCredit: '',
        montantMEJ: '',
        dateReglement: '',
        refReglement: '',
      });
    }
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setIsEditMode(false);
    setReglementMEJData({
      idCredit: '',
      montantMEJ: '',
      dateReglement: '',
      refReglement: '',
    });
    setCurrentId(null);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setReglementMEJData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      let response;
      if (isEditMode) {
        response = await axios.put(`http://localhost:8084/annexes/updateReglementMej/${currentId}`, reglementMEJData);
      } else {
        response = await axios.post('http://localhost:8084/annexes/addReglementMej', reglementMEJData);
      }
      
      if (response.status === 200) {
        console.log('Formulaire soumis avec succès:', response.data);
        fetchReglementMEJList(); // Mettre à jour la liste après soumission
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
      const response = await axios.delete(`http://localhost:8084/annexes/deleteReglementMej/${id}`);
      if (response.status === 200) {
        console.log('Enregistrement supprimé avec succès:', response.data);
        fetchReglementMEJList();
      } else {
        console.error('Erreur lors de la suppression de l\'enregistrement');
      }
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  const handleNavigationBack = () => {
    navigate('/DemandeEntreprise');
  };

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 overflow-hidden">
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
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Règlement MEJ</span>
              </div>
            </li>
          </ol>
        </nav>
        {/* End Breadcrumb Navigation */}

        {/* Main Content */}
        <div className="flex justify-between mb-4">
          <button
            onClick={() => openModal(false)}
            className="text-white bg-[#FF9119] hover:bg-[#FF9119]/80 focus:outline-none focus:ring-4 focus:ring-[#FF9119]/50 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-[#FF9119] dark:hover:bg-[#FF9119]/80 dark:focus:ring-[#FF9119]/30 transition duration-150"
          >
            Ajouter un Règlement MEJ
          </button>
          <input
            type="text"
            value={searchInput}
            onChange={handleSearch}
            placeholder="Rechercher..."
            className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-[#FF9119] focus:border-[#FF9119]"
          />
        </div>
        {/* End Search Bar */}

        {/* Table */}
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-3 py-2">ID Crédit</th>
                <th scope="col" className="px-3 py-2">Montant MEJ</th>
                <th scope="col" className="px-3 py-2">Date de Règlement</th>
                <th scope="col" className="px-3 py-2">Référence Règlement</th>
                <th scope="col" className="px-3 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredReglementMEJList.map((reglement) => (
                <tr key={reglement.id}>
                  <td className="px-3 py-2">{reglement.idCredit}</td>
                  <td className="px-3 py-2">{reglement.montantMEJ}</td>
                  <td className="px-3 py-2">{reglement.dateReglement}</td>
                  <td className="px-3 py-2">{reglement.refReglement}</td>
                  <td className="px-3 py-2 flex space-x-2">
                    <button
                      onClick={() => openModal(true, reglement)}
                      className="text-orange-500 hover:text-orange-700 mr-2"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(reglement.id)}
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
        {/* End Table */}

        {/* Modal */}
        {modalIsOpen && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full">
              <h2 className="text-lg font-semibold mb-4">
                {isEditMode ? 'Modifier' : 'Ajouter'} un Règlement MEJ
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="idCredit" className="block text-sm font-medium text-gray-700 dark:text-gray-400">ID Crédit</label>
                  <input
                    type="text"
                    name="idCredit"
                    value={reglementMEJData.idCredit}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="montantMEJ" className="block text-sm font-medium text-gray-700 dark:text-gray-400">Montant MEJ</label>
                  <input
                    type="number"
                    name="montantMEJ"
                    value={reglementMEJData.montantMEJ}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="dateReglement" className="block text-sm font-medium text-gray-700 dark:text-gray-400">Date de Règlement</label>
                  <input
                    type="date"
                    name="dateReglement"
                    value={reglementMEJData.dateReglement}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="refReglement" className="block text-sm font-medium text-gray-700 dark:text-gray-400">Référence Règlement</label>
                  <input
                    type="text"
                    name="refReglement"
                    value={reglementMEJData.refReglement}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300"
                    required
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="text-white bg-gray-500 hover:bg-gray-600 rounded-full px-4 py-2"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="text-white bg-[#FF9119] hover:bg-[#FF9119]/80 rounded-full px-4 py-2"
                  >
                    {isEditMode ? 'Modifier' : 'Ajouter'}
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

export default ReglementMEJ;
