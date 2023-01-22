import axios from 'axios';

import { apiBaseUrl } from '../constants';
import { Diagnosis } from '../types';

const ping = () => {
  axios.get<void>(`${apiBaseUrl}/ping`);
};

const fetchAll = async () => {
  const request = await axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnoses`);
  return request.data;
};

const fetchByCode = async (code: string) => {
  const request = await axios.get<Diagnosis>(`${apiBaseUrl}/diagnoses/${code}`);
  return request.data;
};

export default {
  ping,
  fetchAll,
  fetchByCode
};