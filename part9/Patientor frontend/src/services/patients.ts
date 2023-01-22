import axios from 'axios';

import { PatientFormValues } from '../AddPatientModal/AddPatientForm';
import { apiBaseUrl } from '../constants';
import { BaseEntry as Entry, Patient } from '../types';

const ping = () => {
  axios.get<void>(`${apiBaseUrl}/ping`);
};

const fetchAll = async () => {
  const request = await axios.get<Patient[]>(`${apiBaseUrl}/patients`);
  return request.data;
};

const fetchById = async (id: string) => {
  const request = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
  return request.data;
};

const create = async (newObject: PatientFormValues) => {
  const response = await axios.post<Patient>(`${apiBaseUrl}/patients`, newObject);
  return response.data;
};

const createEntry = async (id: string, newObject: Omit<Entry, "id">) => {
  const response = await axios.post<Entry>(`${apiBaseUrl}/patients/${id}/entries`, newObject);
  return response.data;
};

export default {
  ping,
  create,
  fetchAll,
  fetchById,
  createEntry
};
