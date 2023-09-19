import axios from "axios";
import { API_URL, PATIENT_ID, TOKEN_AUTH } from "../../config";
import { Study } from "@/models/study";

export const createStudy = async (file: File): Promise<Study> => {
  const formData = new FormData();
  formData.append("csv", file);

  try {
    const response = await axios.post<{
      data: Study;
    }>(`${API_URL}/api/studies/${PATIENT_ID}`, formData, {
      headers: {
        Authorization: `Bearer ${TOKEN_AUTH}`,
      },
    });
    return response.data.data;
  } catch (error) {
    throw error;
  }
};
