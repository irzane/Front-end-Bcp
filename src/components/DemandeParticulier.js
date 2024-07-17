
  import React, { useState } from 'react';
  import Navbar from './Navbar';  
  
  const DemandeParticulier = () => {
  
    // contrôler l'ouverture et la fermeture des modales
    const [modalIsOpen, setModalIsOpen] = useState({
      annulationTAM: false,
      changementDebiteur: false,
      etatEvenementsAC: false,
      listeDemandesBenifice: false,
      etatDeblocageP: false,
      suiviActionRecouvrtP: false,
      demandeIndemnisationP: false,
    });
  
    const [annulationTAMData, setAnnulationTAMData] = useState({
      numCIN: '',
      numCredit: '',
      codeBq: '',
      nbreLigne: '',
      numeroAnnexe: '',
     
    });
  
    const [changementDebiteurData, setChangementDebiteurData] = useState({
      numCredit: '',
      numCIN: '',
      debiteurInit: '',
      nouveauDebit: '',
      dateEffetTransfert: '',
      codeBq: '',
      nbreLigne: '',
      numeroAnnexe: '',
    });
  
    const [etatEvenementsACData, setEtatEvenementsACData] = useState({
      numCIN: '',
      numCredit: '',
      codeEvenement: '',
      dateEffet: '',
      codeBq: '',
      nbreLigne: '',
      numeroAnnexe: '',
    });
  
    const [listeDemandesBenificeData, setListeDemandesBenificeData] = useState({
      nom: '',
      prenom: '',
      numCIN: '',
      genre: '',
      montant: '',
      duree: '',
      quotiteFinancement: '',
      objetCredit: '',
      tauxInteret: '',
      coutGlobal: '',
      prix: '',
      superficie: '',
      codeVille: '',
      numTF: '',
      venderLogement: '',
      acquisitionIndivision: '', 
      typeCredit: '',
      natureTF: '',
      codeBq: '',
      nbreLigne: '',
      numeroAnnexe: '',
    });
  
    const [etatDeblocagePData, setEtatDeblocagePData] = useState({
      numCIN: '',
      numDebl: '',
      codeBq: '',
      nbreLigne: '',
      numeroAnnexe: '',
    });
  
    const [suiviActionRecouvrtPData, setSuiviActionRecouvrtPData] = useState({
      numCIN: '',
      dateDestination: '',
      codeAssignationPay: '',
      refAssignationPay: '',
      codeRealisationHyp: '',
      refRealisationHyp: '',
      consolidation: '',
      dateRecouvrement: '',
      codeBq: '',
      nbreLigne: '',
      numeroAnnexe: '',
  
    });
  
    const [demandeIndemnisationPData, setDemandeIndemnisationPData] = useState({
      numCIN: '',
      numCredit: '',
      dateEcheance: '',
      montantDemande: '',
      codeBq: '',
      nbreLigne: '',
      numeroAnnexe: '',
    
    });
  
    const handleChange = (event, setData) => {
      const { name, value } = event.target;
      setData(prevState => ({
        ...prevState,
        [name]: name === 'acquisitionIndivision' ? value === 'true' : value,
      }));
    };
  
    const openModal = (modalName) => {
        setModalIsOpen({ ...modalIsOpen, [modalName]: true });
      };
    
      const closeModal = (modalName) => {
        setModalIsOpen({ ...modalIsOpen, [modalName]: false });
      };
  
    const handleSubmit = async (event, data, endpoint, setData, closeModal, modalName) => {
      event.preventDefault();
      try {
        const response = await fetch(`http://localhost:8084/${endpoint}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
        if (response.ok) {
          console.log(`Formulaire ${modalName} soumis avec succès`);
          setData({  // Réinitialisation des données du formulaire
            numCIN: '',
            numCredit: '',
            debiteurInit: '',
            nouveauDebit: '',
            dateEffetTransfert: '',
            codeEvenement: '',
            dateEffet: '',
            nom: '',
            prenom: '',
            genre: '',
            montant: '',
            duree: '',
            quotiteFinancement: '',
            objetCredit: '',
            tauxInteret: '',
            coutGlobal: '',
            prix: '',
            superficie: '',
            codeVille: '',
            numTF: '',
            venderLogement: '',
            acquisitionIndivision: '',
            typeCredit: '',
            natureTF: '',
            dateEcheance: '',
            montantDemande: '',
            codeBq: '',
            nbreLigne: '',
            numeroAnnexe: '',
          });
          closeModal(modalName); 
        } else {
          console.error(`Erreur lors de la soumission du formulaire ${modalName}`);
        }
      } catch (error) {
        console.error(`Erreur: ${error}`);
      }
    };
    
  
    const handleClick = (e) => {
      e.preventDefault(); // Empêche le comportement par défaut du lien
      window.history.back(); };
  
    return (
      <div className="fixed top-0 left-0 right-0 bottom-0 overflow-hidden">
      <Navbar />

      <a href="/Demande"
        onClick={handleClick}
        className="text-black px-4 py-2 rounded flex items-center transition-colors duration-300 hover:text-blue-700"
      >
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
        </svg> 
         retour </a>

      <div className="container mx-auto mt-16 p-4 text-center overflow-y-auto h-screen">
        <h2 className="text-2xl font-bold mb-10">Demande / Pour Particulier</h2>
  
        <section className="flex items-center justify-center ">
      <div className="w-full max-w-2xl overflow-y-auto bg-white rounded-lg shadow-md p-4">
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <li> <button onClick={() => openModal('annulationTAM')} className="w-full py-3 px-4 text-sm text-gray-700 bg-white hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out rounded border border-gray-300 shadow-sm">
            Annulation TAM
          </button> </li>
        <li> <button onClick={() => openModal('changementDebiteur')} className="w-full py-3 px-4 text-sm text-gray-700 bg-white hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out rounded border border-gray-300 shadow-sm">
            Changement de Débiteur
          </button> </li>
        <li>  <button onClick={() => openModal('etatEvenementsAC')} className="w-full py-3 px-4 text-sm text-gray-700 bg-white hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out rounded border border-gray-300 shadow-sm">
            État Événements Avant Crédits
          </button> </li>
        <li>  <button onClick={() => openModal('listeDemandesBenifice')} className="w-full py-3 px-4 text-sm text-gray-700 bg-white hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out rounded border border-gray-300 shadow-sm">
            Liste de Demandes de Bénéfice
          </button> </li>
        <li>  <button onClick={() => openModal('etatDeblocageP')} className="w-full py-3 px-4 text-sm text-gray-700 bg-white hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out rounded border border-gray-300 shadow-sm">
            État de déblocage de Crédits
          </button> </li>
         <li>  <button onClick={() => openModal('suiviActionRecouvrtP')} className="w-full py-3 px-4 text-sm text-gray-700 bg-white hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out rounded border border-gray-300 shadow-sm">
            Suivi Action Recouvrement
          </button> </li>
        <li>  <button onClick={() => openModal('demandeIndemnisationP')} className="w-full py-3 px-4 text-sm text-gray-700 bg-white hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out rounded border border-gray-300 shadow-sm">
            Demande d'Indemnisation
          </button>  </li>
      </ul>
      </div>
  
  
      {modalIsOpen.annulationTAM && (
           <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
           <div className="bg-white rounded-lg shadow-lg max-w-lg w-full">
             <div className="flex justify-between items-center p-4 border-b">
             <h4 className="text-lg font-semibold mb-4">Annulation TAM </h4>
             <button
                 type="button"
                 className="text-gray-400 hover:text-gray-600"
                 onClick={() => closeModal('annulationTAM')}  >
                 &times; </button>
             </div>
         
             <div className="p-4">
        <form onSubmit={(event) => handleSubmit(event, annulationTAMData, '/annexes/addAnnulationTAM', setAnnulationTAMData, 'annulationTAM')}>
          <div className="flex flex-wrap -mx-4 mb-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <label htmlFor="numCIN" className="block text-gray-700">Numéro CIN :</label>
              <input
                type="number"
                name="numCIN"
                placeholder="00"
                value={annulationTAMData.numCIN}
                onChange={(event) => handleChange(event, setAnnulationTAMData)}
                required
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <label htmlFor="numCredit" className="block text-gray-700">Numéro Crédit :</label>
              <input
                type="number"
                name="numCredit"
                placeholder="00"
                value={annulationTAMData.numCredit}
                onChange={(event) => handleChange(event, setAnnulationTAMData)}
                required
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
          </div>
          <hr className="py-2" />
          
          <div className="flex justify-end space-x-4">
          <button  type="button"
              className="px-6 py-1 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition duration-150 ease-in-out"
              onClick={() => closeModal('annulationTAM')}
            > Annuler </button>
            <button type="submit"
              className="px-6 py-1 bg-red-900 text-white rounded-lg hover:bg-red-700 transition duration-150 ease-in-out"
            > Soumettre
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
)}
  
  {modalIsOpen.changementDebiteur && (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
    <div className="bg-white rounded-lg shadow-lg max-w-lg w-full">
      <div className="flex justify-between items-center p-4 border-b">
        <h4 className="text-lg font-semibold"> Changement de Débiteur </h4>
        <button
          type="button"
          className="text-gray-400 hover:text-gray-600"
          onClick={() => closeModal('changementDebiteur')}
        >
          &times;
        </button>
      </div>
      <div className="p-4">
        <form
          onSubmit={(event) => handleSubmit(event, changementDebiteurData, '/annexes/addChangementDebiteur', setChangementDebiteurData, 'changementDebiteur')}
          className="space-y-4"  >
         
              <div className="mb-4">
                <label htmlFor="numCredit" className="block text-gray-700">Numéro Crédit :</label>
                <input
                  type="number"
                  name="numCredit"
                  placeholder="00"
                  value={changementDebiteurData.numCredit}
                  onChange={(event) => handleChange(event, setChangementDebiteurData)}
                  required
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
          <div className="mb-4">
            <div className="flex flex-wrap -mx-4">
              <div className="px-4 mb-4">
                <label htmlFor="numCIN" className="block text-gray-700">Numéro CIN :</label>
                <input
                  type="number"
                  name="numCIN"
                  placeholder="00"
                  value={changementDebiteurData.numCIN}
                  onChange={(event) => handleChange(event, setChangementDebiteurData)}
                  required
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div className=" px-4 mb-4">
                <label htmlFor="debiteurInit" className="block text-gray-700">Débiteur Initial :</label>
                <input
                  type="text"
                  name="debiteurInit"
                  placeholder=""
                  value={changementDebiteurData.debiteurInit}
                  onChange={(event) => handleChange(event, setChangementDebiteurData)}
                  required
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
            </div>
          </div>
          <div className="mb-4">
            <div className="flex flex-wrap -mx-4">
              <div className="px-4 mb-4">
                <label htmlFor="nouveauDebit" className="block text-gray-700">Nouveau Débiteur :</label>
                <input
                  type="text"
                  name="nouveauDebit"
                  placeholder=""
                  value={changementDebiteurData.nouveauDebit}
                  onChange={(event) => handleChange(event, setChangementDebiteurData)}
                  required
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div className="px-4 mb-4">
                <label htmlFor="dateEffetTransfert" className="block text-gray-700">Date Effet Transfert :</label>
                <input
                  type="date"
                  name="dateEffetTransfert"
                  placeholder=""
                  value={changementDebiteurData.dateEffetTransfert}
                  onChange={(event) => handleChange(event, setChangementDebiteurData)}
                  required
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
            </div>
          </div>

          <hr className="py-2" />
          <div className="flex justify-end space-x-4">
            <button type="button"
              className="px-6 py-1 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition duration-150 ease-in-out"
              onClick={() => closeModal('changementDebiteur')}
            > Annuler </button>
            <button  type="submit"
              className="px-6 py-1 bg-red-900 text-white rounded-lg hover:bg-red-700 transition duration-150 ease-in-out"
            > Soumettre </button>
          </div>
        </form>
      </div>
    </div>
  </div>
)}


{modalIsOpen.etatEvenementsAC && (
  <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
    <div className="bg-white rounded-lg shadow-lg max-w-lg w-full">
      <div className="flex justify-between items-center p-4 border-b">
        <h4 className="text-lg font-semibold">État Événements AC</h4>
        <button
          type="button"
          className="text-gray-400 hover:text-gray-600"
          onClick={() => closeModal('etatEvenementsAC')}
        >
          &times;
        </button>
      </div>
      <div className="p-4">
        <form
          onSubmit={(event) => handleSubmit(event, etatEvenementsACData, '/annexes/addEtatEvenementsAC', setEtatEvenementsACData, 'etatEvenementsAC')}
        >
          <div className="flex flex-wrap -mx-4 mb-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <label htmlFor="numCIN" className="block text-gray-700">Numéro CIN :</label>
              <input
                type="number"
                name="numCIN"
                placeholder="00"
                value={etatEvenementsACData.numCIN}
                onChange={(event) => handleChange(event, setEtatEvenementsACData)}
                required
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <label htmlFor="numCredit" className="block text-gray-700">Numéro Crédit :</label>
              <input
                type="number"
                name="numCredit"
                placeholder="00"
                value={etatEvenementsACData.numCredit}
                onChange={(event) => handleChange(event, setEtatEvenementsACData)}
                required
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-4 mb-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <label htmlFor="codeEvenement" className="block text-gray-700">Code Événement :</label>
              <select
                name="codeEvenement"
                value={etatEvenementsACData.codeEvenement}
                onChange={(event) => handleChange(event, setEtatEvenementsACData)}
                required
                className="w-full px-3 py-2 border rounded-lg"
              >
                <option value="">-- Veuillez Sélectionner --</option>
                <option value="1">Remboursement Total Anticipation</option>
                <option value="2">Décès Bénéficiaire</option>
                <option value="3">Cession Logement</option>
                <option value="4">Désistement</option>
                <option value="5">Déchéance Terme</option>
                <option value="6">Remboursement Partiel Anticipation</option>
                <option value="7">Rééchelonnement</option>
                <option value="8">Annulation Échéancier</option>
              </select>
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <label htmlFor="dateEffet" className="block text-gray-700">Date Effet :</label>
              <input
                type="date"
                name="dateEffet"
                placeholder=""
                value={etatEvenementsACData.dateEffet}
                onChange={(event) => handleChange(event, setEtatEvenementsACData)}
                required
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
          </div>

          <hr className="py-2" />
              <div className="flex justify-end space-x-4">
              <button  type="button"
                  className="px-6 py-1 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition duration-150 ease-in-out"
                  onClick={() => closeModal('etatEvenementsAC')}
                > Annuler </button>
                <button type="submit"
                  className="px-6 py-1 bg-red-900 text-white rounded-lg hover:bg-red-700 transition duration-150 ease-in-out"
                > Soumettre
                </button>
                </div> 
        </form>
      </div>
    </div>
  </div>
)}

{modalIsOpen.listeDemandesBenifice && (
  <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white rounded-lg shadow-lg max-w-screen-md w-full">
      <div className="flex justify-between items-center p-4 border-b">
        <h4 className="text-lg font-semibold">Liste de Demandes de Bénéfice</h4>
        <button
          type="button"
          className="text-gray-400 hover:text-gray-600"
          onClick={() => closeModal('listeDemandesBenifice')}
        >
          &times;
        </button>
      </div>
      <div className="p-4 max-h-[50vh] overflow-y-scroll">
        <form onSubmit={(event) => handleSubmit(event, listeDemandesBenificeData, '/annexes/addListeDemandesBenifice', setListeDemandesBenificeData, 'listeDemandesBenifice')}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label htmlFor="nom" className="text-sm font-medium text-gray-700">Nom</label>
              <input type="text" name="nom" value={listeDemandesBenificeData.nom} onChange={(event) => handleChange(event, listeDemandesBenificeData)} required className="w-full px-3 py-2 border rounded-lg" />
            </div>
            <div>
              <label htmlFor="prenom" className="text-sm font-medium text-gray-700">Prénom</label>
              <input type="text" name="prenom" value={listeDemandesBenificeData.prenom} onChange={(event) => handleChange(event, listeDemandesBenificeData)} required className="w-full px-3 py-2 border rounded-lg" />
            </div>
            <div>
              <label htmlFor="numCIN" className="text-sm font-medium text-gray-700">Numéro CIN</label>
              <input type="number" name="numCIN" value={listeDemandesBenificeData.numCIN} onChange={(event) => handleChange(event, listeDemandesBenificeData)} required className="w-full px-3 py-2 border rounded-lg" />
            </div>
          </div>

          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-700">Genre</h4>
            <div className="flex space-x-4">
              <label className={`flex items-center text-gray-700 rounded-md px-3 py-2 my-3 cursor-pointer ${listeDemandesBenificeData.genre === 'H' ? '' : ' hover:bg-gray-200'}`}>
                <input type="radio" name="genre" value="H" checked={listeDemandesBenificeData.genre === 'H'} onChange={(event) => handleChange(event, setListeDemandesBenificeData)} className="hidden" />
                <span className={`inline-block w-3 h-3 mr-2 rounded-full border border-gray-400 ${listeDemandesBenificeData.genre === 'H' ? 'bg-indigo-600' : 'bg-white'}`}></span>
                Homme
              </label>
              <label className={`flex items-center text-gray-700 rounded-md px-3 py-2 my-3 cursor-pointer ${listeDemandesBenificeData.genre === 'F' ? '' : ' hover:bg-gray-200'}`}>
                <input type="radio" name="genre" value="F" checked={listeDemandesBenificeData.genre === 'F'} onChange={(event) => handleChange(event, setListeDemandesBenificeData)} className="hidden" />
                <span className={`inline-block w-3 h-3 mr-2 rounded-full border border-gray-400 ${listeDemandesBenificeData.genre === 'F' ? 'bg-indigo-600' : 'bg-white'}`}></span>
                Femme
              </label>
            </div>
          </div>

          <hr className={"py-3 my-1 "}/>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label htmlFor="montant" className="text-sm font-medium text-gray-700">Montant</label>
              <input type="number" name="montant" value={listeDemandesBenificeData.montant} onChange={(event) => handleChange(event, listeDemandesBenificeData)} required className="w-full px-3 py-2 border rounded-lg" />
            </div>
            <div>
              <label htmlFor="duree" className="text-sm font-medium text-gray-700">Durée</label>
              <input type="number" name="duree" value={listeDemandesBenificeData.duree} onChange={(event) => handleChange(event, listeDemandesBenificeData)} required className="w-full px-3 py-2 border rounded-lg" />
            </div>
            <div>
              <label htmlFor="quotiteFinancement" className="text-sm font-medium text-gray-700">Quotité Financement</label>
              <input type="text" name="quotiteFinancement" value={listeDemandesBenificeData.quotiteFinancement} onChange={(event) => handleChange(event, listeDemandesBenificeData)} required className="w-full px-3 py-2 border rounded-lg" />
            </div>
            <div>
              <label htmlFor="objetCredit" className="text-sm font-medium text-gray-700">Objet Crédit</label>
              <input type="text" name="objetCredit" value={listeDemandesBenificeData.objetCredit} onChange={(event) => handleChange(event, listeDemandesBenificeData)} required className="w-full px-3 py-2 border rounded-lg" />
            </div>
            <div>
              <label htmlFor="tauxInteret" className="text-sm font-medium text-gray-700">Taux d'Intérêt</label>
              <input type="number" name="tauxInteret" value={listeDemandesBenificeData.tauxInteret} onChange={(event) => handleChange(event, listeDemandesBenificeData)} required className="w-full px-3 py-2 border rounded-lg" />
            </div>
            <div>
              <label htmlFor="coutGlobal" className="text-sm font-medium text-gray-700">Cout Global</label>
              <input type="number" name="coutGlobal" value={listeDemandesBenificeData.coutGlobal} onChange={(event) => handleChange(event, listeDemandesBenificeData)} required className="w-full px-3 py-2 border rounded-lg" />
            </div>
            <div>
              <label htmlFor="prix" className="text-sm font-medium text-gray-700">Prix</label>
              <input type="number" name="prix" value={listeDemandesBenificeData.prix} onChange={(event) => handleChange(event, listeDemandesBenificeData)} required className="w-full px-3 py-2 border rounded-lg" />
            </div>
            <div>
              <label htmlFor="superficie" className="text-sm font-medium text-gray-700">Superficie</label>
              <input type="text" name="superficie" value={listeDemandesBenificeData.superficie} onChange={(event) => handleChange(event, listeDemandesBenificeData)} required className="w-full px-3 py-2 border rounded-lg" />
            </div>
            <div>
              <label htmlFor="codeVille" className="text-sm font-medium text-gray-700">Code Ville</label>
              <input type="text" name="codeVille" value={listeDemandesBenificeData.codeVille} onChange={(event) => handleChange(event, listeDemandesBenificeData)} required className="w-full px-3 py-2 border rounded-lg" />
            </div>
            <div>
              <label htmlFor="numTF" className="text-sm font-medium text-gray-700">Numéro TF</label>
              <input type="number" name="numTF" value={listeDemandesBenificeData.numTF} onChange={(event) => handleChange(event, listeDemandesBenificeData)} required className="w-full px-3 py-2 border rounded-lg" />
            </div>
            <div>
              <label htmlFor="vendeurLogement" className="text-sm font-medium text-gray-700">Vendeur de Logement</label>
              <input type="text" name="vendeurLogement" value={listeDemandesBenificeData.vendeurLogement} onChange={(event) => handleChange(event, listeDemandesBenificeData)} required className="w-full px-3 py-2 border rounded-lg" />
            </div>
          </div>

          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-700">Acquisition en Indivision</h4>
            <div className="flex space-x-4">
              <label className={`flex items-center text-gray-700 rounded-md px-3 py-2 my-3 cursor-pointer ${listeDemandesBenificeData.acquisitionIndivision === true ? '' : ' hover:bg-gray-200'}`}>
                <input type="radio" name="acquisitionIndivision" value="true" checked={listeDemandesBenificeData.acquisitionIndivision === true} onChange={(event) => handleChange(event, setListeDemandesBenificeData)} className="hidden" />
                <span className={`inline-block w-3 h-3 mr-2 rounded-full border border-gray-400 ${listeDemandesBenificeData.acquisitionIndivision === true ? 'bg-indigo-600' : 'bg-white'}`}></span>
                Oui
              </label>
              <label className={`flex items-center text-gray-700 rounded-md px-3 py-2 my-3 cursor-pointer ${listeDemandesBenificeData.acquisitionIndivision === false ? '' : ' hover:bg-gray-200'}`}>
                <input type="radio" name="acquisitionIndivision" value="false" checked={listeDemandesBenificeData.acquisitionIndivision === false } onChange={(event) => handleChange(event, setListeDemandesBenificeData)} className="hidden" />
                <span className={`inline-block w-3 h-3 mr-2 rounded-full border border-gray-400 ${listeDemandesBenificeData.acquisitionIndivision === false ? 'bg-indigo-600' : 'bg-white'}`}></span>
                Non
              </label>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label htmlFor="typeCredit" className="text-sm font-medium text-gray-700">Type de Crédit</label>
              <input type="text" name="typeCredit" value={listeDemandesBenificeData.typeCredit} onChange={(event) => handleChange(event, listeDemandesBenificeData)} required className="w-full px-3 py-2 border rounded-lg" />
            </div>
            <div>
              <label htmlFor="natureTF" className="text-sm font-medium text-gray-700">Nature TF</label>
              <input type="text" name="natureTF" value={listeDemandesBenificeData.natureTF} onChange={(event) => handleChange(event, listeDemandesBenificeData)} required className="w-full px-3 py-2 border rounded-lg" />
            </div>
          </div>

          <hr className="py-2" />
          <div className="flex justify-end space-x-4">
            <button type="button" className="px-6 py-1 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition duration-150 ease-in-out" onClick={() => closeModal('listeDemandesBenifice')}>
              Annuler
            </button>
            <button type="submit" className="px-6 py-1 bg-red-900 text-white rounded-lg hover:bg-red-700 transition duration-150 ease-in-out">
              Soumettre
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
)}


  {modalIsOpen.etatDeblocageP && (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
    <div className="bg-white rounded-lg shadow-lg max-w-lg w-full">
      <div className="flex justify-between items-center p-4 border-b">
        <h4 className="text-lg font-semibold"> État de Déblocage de crédits</h4>
        <button
          type="button"
          className="text-gray-400 hover:text-gray-600"
          onClick={() => closeModal('etatDeblocageP')}
        >
          &times;
        </button>
      </div>

      <div className="p-4">
            <form onSubmit={(event) => handleSubmit(event, etatDeblocagePData, '/annexes/addDeblParticulier', setEtatDeblocagePData, 'etatDeblocageP')}>
            <div className="flex flex-wrap -mx-4 mb-4">
            <div className="w-full md:w-1/2 px-4 mb-4">  
                <label htmlFor="numCIN"> Numéro CIN :</label>
                <input type="number" name="numCIN" placeholder="00" value={etatDeblocagePData.numCIN} onChange={(event) => handleChange(event, setEtatDeblocagePData)} required className="w-full px-3 py-2 border rounded-lg"/>
               </div>
                <div className="w-full md:w-1/2 px-4 mb-4">  
                <label htmlFor="numDebl"> Numéro Deblocage :</label>
                <input type="number" name="numDebl" placeholder=" 00" value={etatDeblocagePData.numDebl} onChange={(event) => handleChange(event, setEtatDeblocagePData)} required className="w-full px-3 py-2 border rounded-lg"/>     
              </div>
              </div>

              <hr className="py-2" />
              <div className="flex justify-end space-x-4">
              <button  type="button"
                  className="px-6 py-1 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition duration-150 ease-in-out"
                  onClick={() => closeModal('etatDeblocageP')}
                > Annuler </button>
                <button type="submit"
                  className="px-6 py-1 bg-red-900 text-white rounded-lg hover:bg-red-700 transition duration-150 ease-in-out"
                > Soumettre
                </button>
                </div>
            </form>
          </div>
        </div>
      </div>

  )}
  
  {modalIsOpen.suiviActionRecouvrtP && (
  <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
  <div className="bg-white rounded-lg shadow-lg max-w-lg w-full">
    <div className="flex justify-between items-center p-4 border-b">
    <h4 className="text-lg font-semibold mb-4">Suivi Action Recouvrement</h4>
    <button
        type="button"
        className="text-gray-400 hover:text-gray-600"
        onClick={() => closeModal('suiviActionRecouvrtP')}
      >
        &times;
      </button>
    </div>

    <div className="p-4">
          <form onSubmit={(event) => handleSubmit(event, suiviActionRecouvrtPData, '/annexes/addSuiviActionRecouvrtP', setSuiviActionRecouvrtPData, 'suiviActionRecouvrtP')}>
          
            <div className="w-full md:w-1/2 px-4 mb-4">
            <label htmlFor="numCIN" className="block text-sm font-medium text-gray-700">Numéro CIN :</label>
            <input type="number" name="numCIN" value={suiviActionRecouvrtPData.numCIN} onChange={(event) => handleChange(event, setSuiviActionRecouvrtPData)} className="w-full px-3 py-2 border rounded-lg" required />
            </div>

            <div className="w-full md:w-1/2 px-4 mb-4">
            <label htmlFor="dateSituation" className="block text-sm font-medium text-gray-700">Date Situation :</label>
            <input type="date" name="dateSituation" value={suiviActionRecouvrtPData.dateSituation} onChange={(event) => handleChange(event, setSuiviActionRecouvrtPData)} className="w-full px-3 py-2 border rounded-lg" required />
             </div>

             <div className="w-full md:w-1/2 px-4 mb-4">
            <label htmlFor="codeAssignationPay" className="block text-sm font-medium text-gray-700">Code Assignation Paiement :</label>
            <select name="codeAssignationPay" value={suiviActionRecouvrtPData.codeAssignationPay} onChange={(event) => handleChange(event, setSuiviActionRecouvrtPData)} className="w-full px-3 py-2 border rounded-lg">
              <option value="">-- Veuillez Sélectionner --</option>
              <option value="19">Dépôt de requête</option>
              <option value="21">Jugement</option>
              <option value="24">Exécutions</option>
            </select>
          </div>
          
          <div className="w-full md:w-1/2 px-4 mb-4">
            <label htmlFor="refAssignationPay" className="block text-sm font-medium text-gray-700">Référence Assignation Paiement :</label>
            <input type="text" name="refAssignationPay" value={suiviActionRecouvrtPData.refAssignationPay} onChange={(event) => handleChange(event, setSuiviActionRecouvrtPData)} className="w-full px-3 py-2 border rounded-lg" required />
          </div>

          <div className="w-full md:w-1/2 px-4 mb-4">
            <label htmlFor="codeRealisationHyp" className="block text-sm font-medium text-gray-700">Code Réalisation Hypothèque :</label>
            <input type="text" name="codeRealisationHyp" value={suiviActionRecouvrtPData.codeRealisationHyp} onChange={(event) => handleChange(event, setSuiviActionRecouvrtPData)} className="w-full px-3 py-2 border rounded-lg" required />
          </div>

          <div className="w-full md:w-1/2 px-4 mb-4">
            <label htmlFor="refRealisationHyp" className="block text-sm font-medium text-gray-700">Référence Réalisation Hypothèque :</label>
            <input type="text" name="refRealisationHyp" value={suiviActionRecouvrtPData.refRealisationHyp} onChange={(event) => handleChange(event, setSuiviActionRecouvrtPData)} className="w-full px-3 py-2 border rounded-lg" required />
          </div>

          <div className="w-full md:w-1/2 px-4 mb-4">
          <label htmlFor="consolidation" className="block text-sm font-medium text-gray-700">Consolidation :</label>
            <input type="text" name="consolidation" value={suiviActionRecouvrtPData.consolidation} onChange={(event) => handleChange(event, setSuiviActionRecouvrtPData)} className="w-full px-3 py-2 border rounded-lg" required />
          </div>

          <div className="w-full md:w-1/2 px-4 mb-4">
          <label htmlFor="dateRecouvrement" className="block text-sm font-medium text-gray-700">Date de Recouvrement :</label>
            <input type="date" name="dateRecouvrement" value={suiviActionRecouvrtPData.dateRecouvrement} onChange={(event) => handleChange(event, setSuiviActionRecouvrtPData)} className="w-full px-3 py-2 border rounded-lg" required />
          </div>

          <hr className="py-2" />
          <div className="flex justify-end space-x-4">
          <button  type="button"
           className="px-6 py-1 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition duration-150 ease-in-out"
            onClick={() => closeModal('suiviActionRecouvrtP')}
          > Annuler </button>
          <button type="submit"
          className="px-6 py-1 bg-red-900 text-white rounded-lg hover:bg-red-700 transition duration-150 ease-in-out"
          > Soumettre  </button>
           </div>
      </form>
    </div>
    </div>
  </div>
)}


  {modalIsOpen.demandeIndemnisationP && (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg max-w-lg w-full">
        <div className="flex justify-between items-center p-4 border-b">
        <h4 className="text-lg font-semibold mb-4">Demande d'Indemnisation </h4>
        <button
            type="button"
            className="text-gray-400 hover:text-gray-600"
            onClick={() => closeModal('demandeIndemnisationP')}
          >
            &times;
          </button>
        </div>
    
        <div className="p-4">
            <form onSubmit={(event) => handleSubmit(event, demandeIndemnisationPData, '/annexes/addDemandeIndemnisationP', setDemandeIndemnisationPData, 'demandeIndemnisationP')}>
            <div className="w-full md:w-1/2 px-4 mb-4">
            <label htmlFor="numCIN" className="block text-sm font-medium text-gray-700"> Numéro CIN :</label>
                <input type="number" name="numCIN" placeholder="00 " value={demandeIndemnisationPData.numCIN} onChange={(event) => handleChange(event, setDemandeIndemnisationPData)} required  className="w-full px-3 py-2 border rounded-lg"/>
               
                <label htmlFor="codeIndemnisation" className="block text-sm font-medium text-gray-700"> Code d'Indemnisation :</label>
                <select name="codeIndemnisation" value={demandeIndemnisationPData.codeIndemnisation} onChange={(event) => handleChange(event, setDemandeIndemnisationPData)} required  className="w-full px-3 py-2 border rounded-lg">
                  <option value="">-- Veuillez Sélectionner --</option>
                  <option value="19">Indemnisation partielle</option>
                  <option value="21">Indemnisation totale</option>
                </select>
               
                <label htmlFor="dateRecouvrement" className="block text-sm font-medium text-gray-700"> Date Recouvrement :</label>
                <input type="date" name="dateRecouvrement" placeholder=" " value={demandeIndemnisationPData.dateRecouvrement} onChange={(event) => handleChange(event, setDemandeIndemnisationPData)} required  className="w-full px-3 py-2 border rounded-lg"/>
             
                <label htmlFor="montantDemande" className="block text-sm font-medium text-gray-700"> Montant de la Demande :</label>
                <input type="number" name="montantDemande" placeholder=" 00.00 " value={demandeIndemnisationPData.montantDemande} onChange={(event) => handleChange(event, setDemandeIndemnisationPData)} required  className="w-full px-3 py-2 border rounded-lg"/>
              
                <label htmlFor="codeModeReg" className="block text-sm font-medium text-gray-700"> Code Mode Régularisation :</label>
                <input type="number" name="codeModeReg" placeholder=" " value={demandeIndemnisationPData.codeModeReg} onChange={(event) => handleChange(event, setDemandeIndemnisationPData)} required  className="w-full px-3 py-2 border rounded-lg"/>
              
                <label htmlFor="montantAjuste" className="block text-sm font-medium text-gray-700"> Montant Ajusté :</label>
                <input type="number" name="montantAjuste" placeholder=" 00.00 " value={demandeIndemnisationPData.montantAjuste} onChange={(event) => handleChange(event, setDemandeIndemnisationPData)} required  className="w-full px-3 py-2 border rounded-lg"/>
              
                <label htmlFor="numDebl" className="block text-sm font-medium text-gray-700"> Numéro Deblocage :</label>
                <input type="number" name="numDebl" placeholder=" 00" value={demandeIndemnisationPData.numDebl} onChange={(event) => handleChange(event, setDemandeIndemnisationPData)} required  className="w-full px-3 py-2 border rounded-lg"/>
              </div>

              <hr className="py-2" />
              <div className="flex justify-end space-x-4">
              <button  type="button"
                  className="px-6 py-1 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition duration-150 ease-in-out"
                  onClick={() => closeModal('demandeIndemnisationP')}
                > Annuler </button>
                <button type="submit"
                  className="px-6 py-1 bg-red-900 text-white rounded-lg hover:bg-red-700 transition duration-150 ease-in-out"
                > Soumettre
                </button>
                </div>
            </form>
          </div>
        </div>
      </div>
  )}
      </section>
      </div>
      </div>
  
    );
  };
  
  export default DemandeParticulier;
  