import axios from 'axios'
import { API_URL, PATIENT_ID, TOKEN_AUTH } from '../../config'

export const createStudy = async (file: File) => {
    const formData = new FormData()
    formData.append('csv', file);

    try {
        const response = await axios.post(`${API_URL}/api/studies/${PATIENT_ID}`, formData, {
            headers: {
                'Authorization': `Bearer ${TOKEN_AUTH}`,
            }
        });
        console.log(response)
        return response.data;
    } catch (error) {
        throw error;
    }
};


