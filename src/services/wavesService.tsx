import axios from 'axios'
import { API_URL, PATIENT_ID, TOKEN_AUTH } from '../../config'

export const createStudy = async (file: File) => {
    const request = {
        headers: {
            'Authorization': `Bearer ${TOKEN_AUTH}`,
        },
        data: file
    };

    console.log("token: ", request)

    try {
        const response = await axios.post(`${API_URL}/api/studies/${PATIENT_ID}`, request);
        console.log(response)
        return response.data;
    } catch (error) {
        throw error;
    }
};


