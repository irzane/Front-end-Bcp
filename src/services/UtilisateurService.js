import axios from 'axios';

const API_URL = 'http://localhost:8084/users';

// Ajout d'un utilisateur
export const addUser = async (utilisateurDTO) => {
  try {
    const response = await axios.post(`${API_URL}/addUser`, utilisateurDTO);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de l\'ajout de l\'utilisateur:', error);
    throw error;
  }
};

// Mise à jour d'un utilisateur par ID
export const updateUser = async (id, updatedUtilisateurDTO) => {
  try {
    const response = await axios.put(`${API_URL}/updateUser/${id}`, updatedUtilisateurDTO);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'utilisateur:', error);
    throw error;
  }
};

// Récupération de tous les utilisateurs
export const getAllUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/getAllUsers`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des utilisateurs:', error);
    throw error;
  }
};

// Suppression d'un utilisateur par ID
export const deleteUserById = async (id) => {
  try {
    await axios.delete(`${API_URL}/deleteUser/${id}`);
    console.log('Utilisateur supprimé avec ID:', id);
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'utilisateur:', error);
    throw error;
  }
};

// Récupération d'un utilisateur par ID
export const getUserById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/getUserById/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'utilisateur par ID:', error);
    throw error;
  }
};

// Récupération des utilisateurs par rôle
export const getUsersByRole = async (role) => {
  try {
    const response = await axios.get(`${API_URL}/getUsersByRole/${role}`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des utilisateurs par rôle:', error);
    throw error;
  }
};
