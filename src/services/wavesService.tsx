import axios from 'axios'
import { API_URL, PATIENT_ID } from '../../config'

export const createStudy = async (file: File) => {
    try {
        const response = await axios.post(`${API_URL}/api/studies/${PATIENT_ID}`, file);
        return response.data;
    } catch (error) {
        throw error;
    }
};


