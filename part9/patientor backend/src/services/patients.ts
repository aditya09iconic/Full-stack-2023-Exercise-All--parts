import { v4 as uuidv4 } from 'uuid';

import { patients } from '../../data';
import { BaseEntry as Entry, Patient, PublicPatient } from '../types';

const getEntries = (): PublicPatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const findById = (id: string): Patient | undefined => {
  return patients.find(p => p.id === id);
};

const addPatient = (data: Omit<PublicPatient, 'id'>): PublicPatient => {
  const id: string = uuidv4();

  return { id, ...data };
};

const addEntry = (data: Omit<Entry, 'id'>): Entry => {
  const id: string = uuidv4();

  return { id, ...data };
};


export default {
  getEntries,
  findById,
  addPatient,
  addEntry
};
