import axios from 'axios';
import { toast } from 'react-toastify';
import config from '../config';
import 'react-toastify/dist/ReactToastify.css';  

const API_URL = `${config.API_URL}/enterprise`;

export const getCompanies = async () => {
  const token = localStorage.getItem('token'); //token del localStorage

  try {
    //token en los headers
    const response = await axios.get(`${API_URL}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Incluye el token 
      },
    });

   
    if (response.status !== 200) {
      throw new Error('Error al obtener las empresas');
    }

    const data = response.data; 
    console.log(data); 
    return data; 
  } catch (error) {
    console.error('Error al obtener las empresas:', error);
    throw error;
  }
};

// Agregar una nueva empresa
export const createCompany = async (newCompany) => {
  const token = localStorage.getItem('token'); 

  try {
    const response = await axios.post(API_URL, newCompany, {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });
    
    return response.data; 
  } catch (error) {
    toast.error('Error al crear la empresa'); 
  }
};

export const updateCompany = async (companyId, company) => {
  const token = localStorage.getItem('token'); 

  try {
    const response = await axios.put(`${API_URL}/${companyId}`, company, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status !== 200) {
      throw new Error('Error al actualizar la empresa');
    }
    return response.data; 
  } catch (error) {
    toast.error('Error al actualizar la empresa');
    console.error('Error al actualizar la empresa:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const deleteCompany = async (companyId) => {
  const token = localStorage.getItem('token'); 
  try {
    const response = await axios.delete(`${API_URL}/${companyId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status !== 204) {
      throw new Error('Error al eliminar la empresa');
    }
    console.log('La empresa ha sido eliminada exitosamente');
    return response.data; 
  } catch (error) {
    console.error('Error al eliminar la empresa:', error);
    throw error; 
  }
};
