import data from '../../data/diagnoses.json';
import { Diagnose } from '../types';

const diagnoses: Array<Diagnose> = data as Array<Diagnose>;

const getEntries = (): Diagnose[] => diagnoses;

const findByCode = (code: string): Diagnose | undefined => {
  return diagnoses.find(d => d.code === code);
};

export default {
  getEntries,
  findByCode
};
