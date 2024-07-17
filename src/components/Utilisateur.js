import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import { addUser, getAllUsers } from '../services/UtilisateurService';

const Utilisateur = () => {
  const [showModal, setShowModal] = useState(false);
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [numerotel, setNumerotel] = useState('');
  const [adresse, setAdresse] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('USER');
  const [utilisateurs, setUtilisateurs] = useState([]);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadUtilisateurs();
  }, []);

  const loadUtilisateurs = async () => {
    try {
      const data = await getAllUsers();
      setUtilisateurs(data);
    } catch (error) {
      console.error('Erreur lors du chargement des utilisateurs:', error);
    }
  };

  const openModal = () => {
    setShowModal(true);
    resetForm();
  };

  const closeModal = () => {
    setShowModal(false);
    resetForm();
  };

  const resetForm = () => {
    setNom('');
    setPrenom('');
    setEmail('');
    setNumerotel('');
    setAdresse('');
    setPassword('');
    setRole('USER');
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nom || !prenom || !email || !numerotel || !adresse || !password) {
      setError('Veuillez remplir tous les champs.');
      return;
    }

    const utilisateurDTO = {
      nom,
      prenom,
      email,
      numerotel,
      adresse,
      password,
      role,
    };

    try {
      await addUser(utilisateurDTO);
      await loadUtilisateurs();
      closeModal();
    } catch (error) {
      console.error('Erreur lors de l\'ajout de l\'utilisateur :', error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredUser = utilisateurs.filter(utilisateur =>
    utilisateur.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 overflow-hidden">
      <Navbar />
      <div className="container mx-auto mt-16 p-4 text-center overflow-y-auto h-screen">
        <h2 className="text-2xl font-bold mb-10">Home / Gestion des utilisateurs</h2>

        <div className="flex justify-between mb-4">
          <div className="relative text-gray-600 mb-4">
            <input
              type="search"
              name="search"
              placeholder="Recherche par Nom"
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
              Ajouter un utilisateur
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="sticky top-0 bg-orange-200 text-black-800">
              <tr className="flex w-full mb-2">
                <th className="p-2 w-1/5 text-left font-medium">NOM</th>
                <th className="p-2 w-1/5 text-left font-medium">PRENOM</th>
                <th className="p-2 w-1/5 text-left font-medium">EMAIL</th>
                <th className="p-2 w-1/5 text-left font-medium">ROLE</th>
                <th className="p-2 w-1/5 text-left font-medium">ACTION</th>
                <th className="w-6"></th>
              </tr>
            </thead>

            <tbody className="bg-white flex flex-col items-center justify-start overflow-y-scroll" style={{ maxHeight: '50vh' }}>
              {filteredUser.map((utilisateur) => (
                <tr key={utilisateur.id} className="flex w-full mb-3 border-b border-gray-300">
                  <td className="p-2 w-1/5">{utilisateur.nom}</td>
                  <td className="p-2 w-1/5">{utilisateur.prenom}</td>
                  <td className="p-2 w-1/5">{utilisateur.email}</td>
                  <td className="p-2 w-1/5">{utilisateur.role}</td>
                  <td className="p-2 w-1/5 flex items-center">
                    <button className="text-gray-700 hover:text-gray-800">
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

      {showModal && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-2/4 relative">
            <button type="button" className="text-gray-400 hover:text-gray-600 absolute top-2 right-3" onClick={closeModal}>
              &times;
            </button>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col space-y-4">
                <div className="flex space-x-4">
                  <div className="w-1/2">
                    <label htmlFor="nom" className="block text-sm font-medium text-gray-700">Nom</label>
                    <input
                      type="text"
                      id="nom"
                      name="nom"
                      value={nom}
                      onChange={(e) => setNom(e.target.value)}
                      className="border border-gray-300 p-2 w-full rounded-md"
                      required
                    />
                  </div>

                  <div className="w-1/2">
                    <label htmlFor="prenom" className="block text-sm font-medium text-gray-700">Prénom</label>
                    <input
                      type="text"
                      id="prenom"
                      name="prenom"
                      value={prenom}
                      onChange={(e) => setPrenom(e.target.value)}
                      className="border border-gray-300 p-2 w-full rounded-md"
                      required
                    />
                  </div>
                </div>

                <div className="w-full">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">Mot de passe</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`border ${error && !password ? 'border-red-500' : 'border-gray-300'} p-2 w-full rounded-md`}
                    required
                  />
                  {error && !password && <p className="text-red-500 text-xs mt-1">Mot de passe requis.</p>}
                </div>

                <div className="w-full">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`border ${error && !email ? 'border-red-500' : 'border-gray-300'} p-2 w-full rounded-md`}
                    required
                  />
                  {error && !email && <p className="text-red-500 text-xs mt-1">Email requis.</p>}
                </div>

                <div className="flex space-x-4">
                  <div className="w-1/2">
                    <label htmlFor="adresse" className="block text-sm font-medium text-gray-700">Adresse</label>
                    <input
                      type="text"
                      id="adresse"
                      name="adresse"
                      value={adresse}
                      onChange={(e) => setAdresse(e.target.value)}
                      className={`border ${error && !adresse ? 'border-red-500' : 'border-gray-300'} p-2 w-full rounded-md`}
                      required
                    />
                    {error && !adresse && <p className="text-red-500 text-xs mt-1">Adresse requise.</p>}
                  </div>

                  <div className="w-1/2">
                    <label htmlFor="numerotel" className="block text-sm font-medium text-gray-700">Numéro téléphone</label>
                    <input
                      type="number"
                      id="numerotel"
                      name="numerotel"
                      value={numerotel}
                      onChange={(e) => setNumerotel(e.target.value)}
                      className={`border ${error && !numerotel ? 'border-red-500' : 'border-gray-300'} p-2 w-full rounded-md`}
                      required
                    />
                    {error && !numerotel && <p className="text-red-500 text-xs mt-1">Numéro de téléphone requis.</p>}
                  </div>
                </div>

                <div className="w-full">
                  <label htmlFor="role" className="block text-sm font-medium text-gray-700">Rôle</label>
                  <select
                    id="role"
                    name="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="border border-gray-300 p-2 w-full rounded-md"
                  >
                    <option value="USER">Utilisateur</option>
                    <option value="ADMIN_BO">Administrateur Back Office</option>
                    <option value="ADMIN_CENTRAL">Administrateur Central</option>
                    <option value="ADMIN_TECHNIQUE">Administrateur Technique</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end">
                <button type="button" className="bg-gray-300 text-gray-700 px-6 py-1 rounded-md hover:bg-gray-400 mr-2" onClick={closeModal}>
                  Annuler
                </button>
                <button type="submit" className="bg-red-900 text-white px-6 py-1 rounded-md hover:bg-green-600">
                  Valider
                </button>
              </div>
              {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Utilisateur;
