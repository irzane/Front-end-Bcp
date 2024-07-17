import axios from 'axios';

const API_URL = 'http://localhost:8084/produits';

// Ajout de produit entreprise
export const addProduitEntreprise = async (produitEntrepriseDTO) => {
  try {
    const response = await axios.post(`${API_URL}/add/entreprise`, produitEntrepriseDTO);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de l\'ajout du produit entreprise:', error);
    throw error;
  }
};

// Ajout de produit particulier
export const addProduitParticulier = async (produitParticulierDTO) => {
  try {
    const response = await axios.post(`${API_URL}/add/particulier`, produitParticulierDTO);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de l\'ajout du produit particulier:', error);
    throw error;
  }
};

// Vérifie l'existence de produit particulier par codeProduit
export const existsProduitParticulierByCodeProduit = async (codeProduit) => {
  try {
    const response = await axios.get(`${API_URL}/exists/particulier/${codeProduit}`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la vérification de l\'existence du produit particulier par codeProduit:', error);
    throw error;
  }
};

// Vérifie l'existence de produit entreprise par codeProduit
export const existsProduitEntrepriseByCodeProduit = async (codeProduit) => {
  try {
    const response = await axios.get(`${API_URL}/exists/entreprise/${codeProduit}`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la vérification de l\'existence du produit entreprise par codeProduit:', error);
    throw error;
  }
};

// Vérifie l'existence de produit particulier par nom
export const existsProduitParticulierByNom = async (nom) => {
  try {
    const response = await axios.get(`${API_URL}/exists/particulier/nom/${nom}`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la vérification de l\'existence du produit particulier par nom:', error);
    throw error;
  }
};

// Vérifie l'existence de produit entreprise par nom
export const existsProduitEntrepriseByNom = async (nom) => {
  try {
    const response = await axios.get(`${API_URL}/exists/entreprise/nom/${nom}`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la vérification de l\'existence du produit entreprise par nom:', error);
    throw error;
  }
};

// Mise à jour de produit entreprise
export const updateProduitEntreprise = async (id, produitModifieDTO) => {
  try {
    const response = await axios.put(`${API_URL}/update/entreprise/${id}`, produitModifieDTO);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la mise à jour du produit entreprise:', error);
    throw error;
  }
};

// Mise à jour de produit particulier
export const updateProduitParticulier = async (id, produitModifieDTO) => {
  try {
    const response = await axios.put(`${API_URL}/update/particulier/${id}`, produitModifieDTO);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la mise à jour du produit particulier:', error);
    throw error;
  }
};


// Obtenir tous les produits
export const getAllProduits = async () => {
  try {
    const response = await axios.get(`${API_URL}/getAllProduits`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération de tous les produits:', error);
    throw error;
  }
};

// Obtenir tous les produits entreprise
export const getAllProduitsEntreprise = async () => {
  try {
    const response = await axios.get(`${API_URL}/getAllProduitsEntreprise`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération de tous les produits entreprise:', error);
    throw error;
  }
};

// Obtenir tous les produits particulier
export const getAllProduitsParticulier = async () => {
  try {
    const response = await axios.get(`${API_URL}/getAllProduitsParticulier`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération de tous les produits particulier:', error);
    throw error;
  }
};

// Obtenir un produit entreprise par id
export const getProduitEntrepriseById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/getProduitEntrepriseById/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération du produit entreprise par ID:', error);
    throw error;
  }
};

// Obtenir un produit particulier par id
export const getProduitParticulierById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/getProduitParticulierById/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération du produit particulier par ID:', error);
    throw error;
  }
};
