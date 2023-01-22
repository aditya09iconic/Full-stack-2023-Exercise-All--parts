import { Dispatch } from 'react';

import { PatientFormValues } from '../AddPatientModal/AddPatientForm';
import { patientService } from '../services';
import { Patient } from '../types';
import { State } from './state';

export type Action =
  | {
    type: "SET_PATIENT_LIST";
    payload: Patient[];
  }
  | {
    type: "ADD_PATIENT";
    payload: Patient;
  };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    default:
      return state;
  }
};


const setPatientList = async (dispatch: Dispatch<Action>) => {
  const data = await patientService.fetchAll();
  dispatch({ type: "SET_PATIENT_LIST", payload: data });
};

const createNewPatient = async (dispatch: Dispatch<Action>, newObject: PatientFormValues) => {
  const data = await patientService.create(newObject);
  dispatch({ type: "ADD_PATIENT", payload: data });
};


export { setPatientList, createNewPatient };
