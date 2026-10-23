import api from "./api";

export interface SakhiPayload {
  full_name: string;
  dob: string;
  mobile: string;
  email: string;
  city: string;
  district: string;
  state: string;
  highest_qualification: string;
  current_occupation: string;
  language_known: string[];
  reason_to_join: string;
  is_experience_teaching_counselling_community: boolean;
  willing_to_conduct: string;
  domain_name: string;
}

export const createSakhiApplication = async (payload: SakhiPayload) => {
  const response = await api.post(
    "/api/streedhana/sakhi-details",
    payload
  );

  return response.data;
};



export interface GinniePayload {
  full_name: string;
  dob: string;
  mobile: string;
  email: string;
  city: string;
  state: string;
  highest_qualification: string;
  current_role_and_experience: string;
  bfsi_finance_experience: string;
  amfi_certification_status: string;
  willing_to_get_certificate_in_days: number | null;
  skills_assessment: string[];
  arn_number: string | null;
  domain_name: string;
}

export const createGinnieApplication = async (
  payload: GinniePayload
) => {
  const response = await api.post(
    "/api/streedhana/ginnie-details",
    payload
  );

  return response.data;
};