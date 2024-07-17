import axios from 'axios';

const API_URL = 'http://localhost:8084';

// Ajout d'une annexe
export const addAnnexe = async (AnnexeDTO) => {
  try {
    const response = await axios.post(`${API_URL}/addAnnexe`, AnnexeDTO);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de l\'ajout de annexe:', error);
    throw error;
  }
};


export const updateAnnexe = async (id, updatedAnnexeDTO) => {
  try {
    const response = await axios.put(`${API_URL}/updateAnnexe/${id}`, updatedAnnexeDTO);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la mise à jour de annexe:', error);
    throw error;
  }
};

export const getAllAnnexe = async () => {
  try {
    const response = await axios.get(`${API_URL}/getAllAnnexe`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des annexes:', error);
    throw error;
  }
};


export const getAnnexeById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/getAnnexeById/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération de annexe par ID:', error);
    throw error;
  }
};

