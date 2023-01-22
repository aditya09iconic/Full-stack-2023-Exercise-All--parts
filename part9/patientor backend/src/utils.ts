/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { BaseEntry as Entry, Gender, Patient } from './types';

const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const paseString = (text: any): string => {
  if (!text || !isString(text)) {
    throw new Error(`Incorrect or missing date: ${text}`);
  }
  return text;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error(`Incorrect or missing date: ${date}`);
  }
  return date;
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error(`Incorrect or missing gender: ${gender}`);
  }
  return gender;
};

const toPatient = (object: any): Omit<Patient, 'id'> => {
  return {
    name: paseString(object.name),
    dateOfBirth: parseDate(object.dateOfBirth),
    ssn: paseString(object.ssn),
    gender: parseGender(object.gender),
    occupation: paseString(object.occupation),
    entries: []
  };
};

const toEntry = (object: any): Omit<Entry, 'id'> => {
  return {
    description: paseString(object.description),
    date: parseDate(object.date),
    specialist: paseString(object.specialist)
  };
};

export { toPatient, toEntry };
