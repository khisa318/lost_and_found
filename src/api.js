import axios from 'axios'

const BASE_URL = 'http://localhost:5000/api';

export const getItems = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/items`);
        return response.data;
    } catch (error) {
        console.error('Error fetching items:', error);
        throw error;
    }
};