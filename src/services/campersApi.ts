import axios from "axios";
import { Camper } from "@/types/camper";

const BASE_URL = "https://66b1f8e71ca8ad33d4f5f63e.mockapi.io";

export interface FetchCampersParams {
  page?: number;
  limit?: number;
  location?: string;
  form?: string;
  AC?: boolean;
  kitchen?: boolean;
  bathroom?: boolean;
}

// export const fetchCampers = async (
//   params?: FetchCampersParams
// ): Promise<Camper[]> => {
//   const response = await axios.get(`${BASE_URL}/campers`, {
//     params,
//   });
//   return response.data;
// };

export const fetchCampers = async (
  params?: FetchCampersParams
) => {
  const response = await axios.get(`${BASE_URL}/campers`, {
    params,
  });

  console.log("API RESPONSE:", response.data);

  return response.data.items;
};


export const fetchCamperById = async (
  id: string
): Promise<Camper> => {
  const response = await axios.get(`${BASE_URL}/campers/${id}`);
  return response.data;
};