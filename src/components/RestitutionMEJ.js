import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';  // Assurez-vous que ce composant est correctement configuré
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaEdit, FaTrash } from 'react-icons/fa';

const RestitutionMEJ = () => {
  const [restitutionMEJList, setRestitutionMEJList] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [filteredRestitutionMEJList, setFilteredRestitutionMEJList] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [restitutionMEJData, setRestitutionMEJData] = useState({
    idCredit: '',
    montantRest: '',
    dateRestitution: '',
    refRestitution: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetchRestitutionMEJList();
  }, []);

  const fetchRestitutionMEJList = async () => {
    try {
      const response = await axios.get('http://localhost:8084/annexes/getAllRestitutionMEJ');
      if (Array.isArray(response.data)) {
        setRestitutionMEJList(response.data);
        setFilteredRestitutionMEJList(response.data);
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

    const filteredList = restitutionMEJList.filter((item) =>
      item.idCredit.toString().toLowerCase().includes(value.toLowerCase())
    );

    setFilteredRestitutionMEJList(filteredList);
  };

  const openModal = (isEdit = false, data = null) => {
    setIsEditMode(isEdit);
    if (isEdit && data) {
      setRestitutionMEJData(data);
      setCurrentId(data.id);
    } else {
      setRestitutionMEJData({
        idCredit: '',
        montantRest: '',
        dateRestitution: '',
        refRestitution: '',
      });
      setCurrentId(null);
    }
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setIsEditMode(false);
    setRestitutionMEJData({
      idCredit: '',
      montantRest: '',
      dateRestitution: '',
      refRestitution: '',
    });
    setCurrentId(null);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setRestitutionMEJData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      let response;
      if (isEditMode) {
        response = await axios.put(`http://localhost:8084/annexes/updateRestitutionMEJ/${currentId}`, restitutionMEJData);
      } else {
        response = await axios.post('http://localhost:8084/annexes/addRestitutionMEJ', restitutionMEJData);
      }
      
      if (response.status === 200) {
        console.log('Formulaire soumis avec succès:', response.data);
        fetchRestitutionMEJList(); // Mettre à jour la liste après soumission
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
      const response = await axios.delete(`http://localhost:8084/annexes/deleteRestitutionMEJ/${id}`);
      if (response.status === 200) {
        console.log('Enregistrement supprimé avec succès:', response.data);
        fetchRestitutionMEJList();
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
                Demande Entreprise
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
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Restitution MEJ</span>
              </div>
            </li>
          </ol>
        </nav>

        <div className="flex justify-between mb-4">
          <button
            onClick={() => openModal(false)}
            className="text-white bg-[#FF9119] hover:bg-[#FF9119]/80 focus:outline-none focus:ring-4 focus:ring-[#FF9119]/50 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-[#FF9119] dark:hover:bg-[#FF9119]/80 dark:focus:ring-[#FF9119]/30 transition duration-150"
          >
            Ajouter une nouvelle restitution MEJ
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
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  ID Crédit
                </th>
                <th scope="col" className="px-6 py-3">
                  Montant Restitution
                </th>
                <th scope="col" className="px-6 py-3">
                  Date de Restitution
                </th>
                <th scope="col" className="px-6 py-3">
                  Référence Restitution
                </th>
                <th scope="col" className="px-6 py-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredRestitutionMEJList.map((item) => (
                <tr key={item.id}>
                  <td className="px-6 py-4">{item.idCredit}</td>
                  <td className="px-6 py-4">{item.montantRest}</td>
                  <td className="px-6 py-4">{item.dateRestitution}</td>
                  <td className="px-6 py-4">{item.refRestitution}</td>
                  <td className="px-6 py-4 flex space-x-2">
                   <button
                      onClick={() => openModal(true, item)}
                      className="text-orange-500 hover:text-orange-700 mr-2"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
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

        {/* Modal */}
        {modalIsOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
              <h2 className="text-lg font-semibold mb-4">
                {isEditMode ? 'Modifier Restitution MEJ' : 'Ajouter Restitution MEJ'}
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="idCredit" className="block text-sm font-medium text-gray-700">
                    ID Crédit
                  </label>
                  <input
                    type="text"
                    id="idCredit"
                    name="idCredit"
                    value={restitutionMEJData.idCredit}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-[#FF9119] focus:ring-[#FF9119] sm:text-sm"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="montantRest" className="block text-sm font-medium text-gray-700">
                    Montant Restitution
                  </label>
                  <input
                    type="number"
                    name="montantRest"
                    value={restitutionMEJData.montantRest}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="dateRestitution" className="block text-sm font-medium text-gray-700">
                    Date de Restitution
                  </label>
                  <input
                    type="date"
                    id="dateRestitution"
                    name="dateRestitution"
                    value={restitutionMEJData.dateRestitution}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-[#FF9119] focus:ring-[#FF9119] sm:text-sm"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="refRestitution" className="block text-sm font-medium text-gray-700">
                    Référence Restitution
                  </label>
                  <input
                    type="text"
                    id="refRestitution"
                    name="refRestitution"
                    value={restitutionMEJData.refRestitution}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-[#FF9119] focus:ring-[#FF9119] sm:text-sm"
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

export default RestitutionMEJ;
