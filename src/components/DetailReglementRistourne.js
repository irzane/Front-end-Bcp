import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';

const DetailReglementRistourne = () => {
  const [detailReglementRistourneList, setDetailReglementRistourneList] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [filteredDetailReglementRistourneList, setFilteredDetailReglementRistourneList] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [detailReglementRistourneData, setDetailReglementRistourneData] = useState({
    idCredit: '',
    dateEcheance: '',
    montantRistoune: '',
    dateReglement: '',
    refReglement: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetchDetailReglementRistourneList();
  }, []);

  const fetchDetailReglementRistourneList = async () => {
    try {
      const response = await axios.get('http://localhost:8084/annexes/getAllDetailReglementRistourne');
      if (Array.isArray(response.data)) {
        setDetailReglementRistourneList(response.data);
        setFilteredDetailReglementRistourneList(response.data);
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

    const filteredList = detailReglementRistourneList.filter((item) =>
      item.idCredit.toString().toLowerCase().includes(value.toLowerCase())
    );

    setFilteredDetailReglementRistourneList(filteredList);
  };

  const openModal = (isEdit = false, data = null) => {
    setIsEditMode(isEdit);
    if (isEdit && data) {
      setDetailReglementRistourneData(data);
      setCurrentId(data.id);
    } else {
      setDetailReglementRistourneData({
        idCredit: '',
        dateEcheance: '',
        montantRistoune: '',
        dateReglement: '',
        refReglement: '',
      });
    }
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setIsEditMode(false);
    setDetailReglementRistourneData({
      idCredit: '',
      dateEcheance: '',
      montantRistoune: '',
      dateReglement: '',
      refReglement: '',
    });
    setCurrentId(null);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setDetailReglementRistourneData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      let response;
      if (isEditMode) {
        response = await axios.put(`http://localhost:8084/annexes/updateDetailReglementRistourne/${currentId}`, detailReglementRistourneData);
      } else {
        response = await axios.post('http://localhost:8084/annexes/addDetailReglementRistourne', detailReglementRistourneData);
      }
      
      if (response.status === 200) {
        console.log('Formulaire soumis avec succès:', response.data);
  
        fetchDetailReglementRistourneList(); // Mettre à jour la liste après soumission
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
      const response = await axios.delete(`http://localhost:8084/annexes/deleteDetailReglementRistourne/${id}`);
      if (response.status === 200) {
        console.log('Enregistrement supprimé avec succès:', response.data);
        fetchDetailReglementRistourneList();
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
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Détail Ristourne</span>
              </div>
            </li>
          </ol>
        </nav>

        <div className="flex justify-between mb-4">
          <button
            onClick={() => openModal()}
            className="text-white bg-[#FF9119] hover:bg-[#FF9119]/80 focus:outline-none focus:ring-4 focus:ring-[#FF9119]/50 font-medium rounded-full text-sm px-5 py-2.5 text-center dark:bg-[#FF9119] dark:hover:bg-[#FF9119]/80 dark:focus:ring-[#FF9119]/30 transition duration-150"
          >
            Ajouter un nouveau détail de règlement
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
                <th scope="col" className="px-6 py-3 w-1/6">
                  ID Crédit
                </th>
                <th scope="col" className="px-6 py-3 w-1/6">
                  Date d’Échéance
                </th>
                <th scope="col" className="px-6 py-3 w-1/6">
                  Montant Ristourne
                </th>
                <th scope="col" className="px-6 py-3 w-1/6">
                  Date de Règlement
                </th>
                <th scope="col" className="px-6 py-3 w-1/6">
                  Référence de Règlement
                </th>
                <th scope="col" className="px-6 py-3 w-1/6 text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredDetailReglementRistourneList.map((detailReglementRistourne, index) => (
                <tr
                  key={index}
                  className={`border-b dark:border-gray-700 ${
                    index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-700'
                  }`}
                >
                  <td className="px-6 py-4">{detailReglementRistourne.idCredit}</td>
                  <td className="px-6 py-4">{detailReglementRistourne.dateEcheance}</td>
                  <td className="px-6 py-4">{detailReglementRistourne.montantRistoune}</td>
                  <td className="px-6 py-4">{detailReglementRistourne.dateReglement}</td>
                  <td className="px-6 py-4">{detailReglementRistourne.refReglement}</td>
                  <td className="px-6 py-4 flex items-center justify-center">
                    <button
                      onClick={() => openModal(true, detailReglementRistourne)}
                      className="text-orange-500 hover:text-orange-700 mr-2"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(detailReglementRistourne.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {modalIsOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md mx-auto">
            <h2 className="text-2xl font-semibold mb-4">
              {isEditMode ? 'Modifier le détail de règlement' : 'Ajouter un nouveau détail de règlement'}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="idCredit" className="block mb-2 font-medium text-gray-700">
                  ID Crédit
                </label>
                <input
                  type="text"
                  id="idCredit"
                  name="idCredit"
                  value={detailReglementRistourneData.idCredit}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="dateEcheance" className="block mb-2 font-medium text-gray-700">
                  Date d’Échéance
                </label>
                <input
                  type="date"
                  id="dateEcheance"
                  name="dateEcheance"
                  value={detailReglementRistourneData.dateEcheance}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="montantRistoune" className="block mb-2 font-medium text-gray-700">
                  Montant Ristourne
                </label>
                <input
                  type="number"
                  id="montantRistoune"
                  name="montantRistoune"
                  value={detailReglementRistourneData.montantRistoune}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="dateReglement" className="block mb-2 font-medium text-gray-700">
                  Date de Règlement
                </label>
                <input
                  type="date"
                  id="dateReglement"
                  name="dateReglement"
                  value={detailReglementRistourneData.dateReglement}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="refReglement" className="block mb-2 font-medium text-gray-700">
                  Référence de Règlement
                </label>
                <input
                  type="text"
                  id="refReglement"
                  name="refReglement"
                  value={detailReglementRistourneData.refReglement}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded-lg"
                />
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
  );
};

export default DetailReglementRistourne;