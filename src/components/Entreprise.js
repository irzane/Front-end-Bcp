import React, { useState, useEffect } from 'react';
import Navbar from './Navbar'; // Importez votre Navbar personnalisé
import { addProduitEntreprise, getAllProduitsEntreprise, updateProduitEntreprise } from '../services/ProduitService';

const Entreprise = () => {
  const [showModal, setShowModal] = useState(false);
  const [codeProduit, setCodeProduit] = useState('');
  const [nom, setNom] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(''); // Nouvelle variable d'état pour la date
  const [produits, setProduits] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // Nouvelle variable d'état pour la recherche
  const [selectedProduit, setSelectedProduit] = useState(null); // État pour stocker le produit sélectionné pour la modification

  // Chargement des produits au montage du composant
  useEffect(() => {
    loadProduits();
  }, []);

  const loadProduits = async () => {
    try {
      const data = await getAllProduitsEntreprise();
      const formattedData = data.map(produit => ({
        ...produit,
        date: new Date(produit.date).toLocaleDateString('fr-FR')
      }));
      setProduits(formattedData);
    } catch (error) {
      console.error('Erreur lors du chargement des produits:', error);
    }
  };

  const openModal = () => setShowModal(true);

  const closeModal = () => {
    setShowModal(false);
    // Réinitialiser les champs du formulaire après fermeture du modal
    setCodeProduit('');
    setNom('');
    setDescription('');
    setDate(''); // Réinitialiser la date
    setSelectedProduit(null); // Réinitialiser le produit sélectionné
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const produitEntrepriseDTO = {
      codeProduit,
      nom,
      description,
      date, // Inclure la date
    };

    try {
      if (selectedProduit) {
        // Si un produit est sélectionné, effectuer une mise à jour
        await updateProduitEntreprise(selectedProduit.id, produitEntrepriseDTO);
      } else {
        // Sinon, ajouter un nouveau produit
        await addProduitEntreprise(produitEntrepriseDTO);
      }
      // Recharger la liste des produits après modification ou ajout
      await loadProduits();
      closeModal();
    } catch (error) {
      console.error('Erreur lors de la mise à jour ou de l\'ajout du produit entreprise:', error);
    }
  };

  const handleEditClick = (produit) => {
    // Mettre à jour l'état du produit sélectionné et ouvrir le modal
    setSelectedProduit(produit);
    setCodeProduit(produit.codeProduit);
    setNom(produit.nom);
    setDescription(produit.description);
    setDate(produit.date);
    openModal();
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredProduits = produits.filter(produit =>
    produit.codeProduit.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 overflow-hidden">
      <Navbar />
      <div className="container mx-auto mt-16 p-4 text-center overflow-y-auto h-screen">
        <h2 className="text-2xl font-bold mb-10">Services / Entreprise</h2>

        <div className="flex justify-between mb-4">
          <div className="relative text-gray-600 mb-4">
            <input
              type="search"
              name="search"
              placeholder="Recherche par Code Produit"
              className="bg-white h-10 px-5 pr-10 rounded-full text-sm focus:outline-none shadow-md"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <button type="submit" className="absolute right-0 top-0 mt-3 mr-4">
              <svg className="h-4 w-4 fill-current text-green-500" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 56.966 56.966" style={{ enableBackground: "new 0 0 56.966 56.966" }} xmlSpace="preserve" width="512px" height="512px">
                <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z"/>
              </svg>
            </button>
          </div>

          <div className="flex justify-end mb-5">
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
              Ajouter un produit
            </button>
          </div>
        </div>

        {/* Table with Fixed Header and Scrollable Body */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="sticky top-0 bg-orange-200 text-black-800">
              <tr className="flex w-full mb-2">
                <th className="p-2 w-1/5 text-left font-medium">CODE PRODUIT</th>
                <th className="p-2 w-1/5 text-left font-medium">NOM</th>
                <th className="p-2 w-1/5 text-left font-medium">DATE</th>
                <th className="p-2 w-2/5 text-left font-medium">DESCRIPTION</th>
                <th className="p-2 w-1/5 text-left font-medium">ACTION</th>
                {/* Placeholder for scrollbar width */}
                <th className="w-6"></th>
              </tr>
            </thead>

            <tbody className="bg-white flex flex-col items-center justify-start overflow-y-scroll" style={{ maxHeight: '50vh' }}>
              {filteredProduits.map((produit) => (
                <tr key={produit.id} className="flex w-full mb-3 border-b border-gray-300">
                  <td className="p-2 w-1/5">{produit.codeProduit}</td>
                  <td className="p-2 w-1/5">{produit.nom}</td>
                  <td className="p-2 w-1/5">{new Date(produit.date).toLocaleDateString()}</td>
                  <td className="p-2 w-2/5">{produit.description}</td>
                  <td className="p-2 w-1/5 flex items-center">
                    <button className="text-gray-700 hover:text-gray-800" onClick={() => handleEditClick(produit)}>
                      <svg className="h-6 w-6" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z"/>
                        <path d="M9 7h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3"/>
                        <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3"/>
                        <line x1="16" y1="5" x2="19" y2="8"/>
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for adding or editing a product */}
      {showModal && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-96 relative">
            <button type="button" className="text-gray-400 hover:text-gray-600 absolute top-2 right-3" onClick={closeModal}>
              &times;
            </button>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="codeProduit" className="block text-sm font-medium text-gray-700">Code Produit</label>
                <input
                  type="text"
                  id="codeProduit"
                  name="codeProduit"
                  value={codeProduit}
                  onChange={(e) => setCodeProduit(e.target.value)}
                  className="border border-gray-300 p-2 w-full rounded-md"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="nom" className="block text-sm font-medium text-gray-700">Nom</label>
                <input
                  type="text"
                  id="nom"
                  name="nom"
                  value={nom}
                  onChange={(e) => setNom(e.target.value)}
                  className="border border-gray-300 p-2 w-full rounded-md"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="border border-gray-300 p-2 w-full rounded-md"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows="3"
                  className="border border-gray-300 p-2 w-full rounded-md"
                ></textarea>
              </div>
              <div className="flex justify-end">
                <button type="button" className="bg-gray-300 text-gray-700 px-6 py-1 rounded-md hover:bg-gray-400 mr-2" onClick={closeModal}>
                  Annuler
                </button>
                <button type="submit" className="bg-red-900 text-white px-6 py-1 rounded-md hover:bg-green-600">
                  {selectedProduit ? 'Modifier' : 'Ajouter'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Entreprise;
