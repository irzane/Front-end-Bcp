import React, { useState } from 'react';
import Navbar from './Navbar'; // Importez votre Navbar personnalisé
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons'; // Importer l'icône faTimes

const MonCompte = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [showPasswordModal, setShowPasswordModal] = useState(false); // État pour afficher/cacher le popup

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedImage(URL.createObjectURL(event.target.files[0]));
    }
  };

  const handleModifierClick = () => {
    setShowPasswordModal(true); // Afficher le popup lors du clic sur "Modifier mot de passe"
  };

  const handleCloseModal = () => {
    setShowPasswordModal(false); // Fonction pour fermer le popup
  };

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 overflow-hidden">
      <Navbar />
      <div className="container mx-auto mt-20 p-4">
        <div className="bg-white p-6 rounded-lg shadow-lg mx-auto w-full md:w-4/5 -mt-16 relative">

          {/* Icône en haut à droite cliquable */}
          <button
            className="absolute top-4 right-4"
            onClick={handleModifierClick}
          >
            <svg className="h-8 w-8 text-orange-500" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />
              <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />
              <line x1="16" y1="5" x2="19" y2="8" />
            </svg>
          </button>

          <h2 className="text-2xl font-bold mb-6 text-center">Mon Compte</h2>

          {/* Section image */}
          <div className="flex justify-center mb-8">
            <div className="relative inline-block">
              <label htmlFor="file-upload" className="absolute right-0 top-0">
                <div className="bg-orange-500 rounded-full p-1 cursor-pointer" style={{ width: '24px', height: '24px', lineHeight: '0', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <FontAwesomeIcon icon={faPlus} className="text-white text-xs" />
                </div>
              </label>
              <img
                src={selectedImage || "/user.png"}
                alt="User"
                className="h-20 w-20 mx-auto mb-2 rounded-full border border-gray-300 cursor-pointer"
              />
              <input
                id="file-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </div>
          </div>

          {/* Section des champs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="text-left">
              <label htmlFor="nom" className="block text-gray-700 text-sm font-bold mb-2">Nom</label>
              <input
                type="text"
                id="nom"
                name="nom"
                value="testt" // Remplacez par la valeur appropriée
                readOnly
                className="w-full md:w-full px-3 py-2 border border-gray-300 bg-gray-200 rounded-lg focus:outline-none focus:border-orange-500"
              />
            </div>
            <div className="text-left">
              <label htmlFor="prenom" className="block text-gray-700 text-sm font-bold mb-2">Prénom</label>
              <input
                type="text"
                id="prenom"
                name="prenom"
                value="Test" // Remplacez par la valeur appropriée
                readOnly
                className="w-full md:w-full px-3 py-2 border border-gray-300 bg-gray-200 rounded-lg focus:outline-none focus:border-orange-500"
              />
            </div>
            <div className="text-left">
              <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value="test@example.com" // Remplacez par la valeur appropriée
                readOnly
                className="w-full md:w-full px-3 py-2 border border-gray-300 bg-gray-200 rounded-lg focus:outline-none focus:border-orange-500"
              />
            </div>
            <div className="text-left">
              <label htmlFor="numerotel" className="block text-gray-700 text-sm font-bold mb-2">Numéro de téléphone</label>
              <input
                type="tel"
                id="numerotel"
                name="numerotel"
                value="06******" // Remplacez par la valeur appropriée
                readOnly
                className="w-full md:w-full px-3 py-2 border border-gray-300 bg-gray-200 rounded-lg focus:outline-none focus:border-orange-500"
              />
            </div>
            <div className="text-left col-span-2">
              <label htmlFor="adresse" className="block text-gray-700 text-sm font-bold mb-2">Adresse</label>
              <textarea
                id="adresse"
                name="adresse"
                rows="3" // Augmentez le nombre de lignes selon votre préférence
                value="CASABLANCA, BD ANFA" // Remplacez par la valeur appropriée
                readOnly
                className="w-full md:w-full px-3 py-2 border border-gray-300 bg-gray-200 rounded-lg focus:outline-none focus:border-orange-500"
              />
            </div>
            <div className="text-left col-span-2">
              <label htmlFor="role" className="block text-gray-700 text-sm font-bold mb-2">Poste</label>
              <input
                type="text"
                id="role"
                name="role"
                value="Admin Back Office" // Remplacez par la valeur appropriée
                readOnly
                className="w-full md:w-full px-3 py-2 border border-gray-300 bg-gray-200 rounded-lg focus:outline-none focus:border-orange-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Popup pour modifier le mot de passe */}
      {showPasswordModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
          <div className="bg-white p-6 rounded-lg shadow-lg z-10 relative w-96"> {/* Ajuster la largeur ici */}
            <FontAwesomeIcon
              icon={faTimes}
              className="absolute top-2 right-2 text-gray-500 cursor-pointer text-lg"
              onClick={handleCloseModal}
            />
            <div className="mb-4">
              <label htmlFor="oldPassword" className="block text-sm font-bold text-gray-700 mb-1">Ancien mot de passe</label>
              <input type="password" id="oldPassword" name="oldPassword" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none" />
            </div>
            <div className="mb-4">
              <label htmlFor="newPassword" className="block text-sm font-bold text-gray-700 mb-1">Nouveau mot de passe</label>
              <input type="password" id="newPassword" name="newPassword" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none" />
            </div>
            <div className="flex justify-end">
              <button onClick={handleCloseModal} className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg mr-2 focus:outline-none hover:bg-gray-400">Annuler</button>
              <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
                Valider
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MonCompte;
