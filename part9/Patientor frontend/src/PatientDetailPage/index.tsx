import React from 'react';
import { Button, Divider, Header, Icon, Table } from 'semantic-ui-react';

import AddEntryModal from '../AddEntryModal';
import { EntryFormValues } from '../AddEntryModal/AddEntryForm';
import { BaseEntry, Patient } from '../types';
import Entries from './Entries';
import { patientService } from '../services';

const PatientDetailPage: React.FC<{ patient: Patient | null | undefined }> = ({ patient }) => {
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [entries, setEntries] = React.useState<BaseEntry[]>([]);
  const [error, setError] = React.useState<string | undefined>();

  React.useEffect(() => {
    if (patient) {
      setEntries(patient.entries);
    }
  }, [patient]);

  if (!patient) {
    return null;
  }

  const openModal = (): void => setModalOpen(true);
  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      const entry = await patientService.createEntry(patient.id, values);
      setEntries(entries.concat(entry));
      closeModal();
    } catch (e) {
      console.error(e.response.data);
      setError(e.response.data.error);
    }
  };


  const iconName = patient.gender === 'male' ? 'mars' : 'venus';
  return (
    <div className="App">
      <div>
        <Header as="h2">
          {patient.name} <Icon fitted name={iconName} />
        </Header>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell></Table.HeaderCell>
              <Table.HeaderCell>Attribute</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell>ssn</Table.Cell>
              <Table.Cell>{patient.ssn}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>occupation</Table.Cell>
              <Table.Cell>{patient.occupation}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>date of birth</Table.Cell>
              <Table.Cell>{patient.dateOfBirth}</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
        <AddEntryModal
          modalOpen={modalOpen}
          onSubmit={submitNewEntry}
          error={error}
          onClose={closeModal}
        />
        <Button onClick={() => openModal()}>Add New Entry</Button>
      </div>
      <Divider hidden />
      <Entries entries={entries} />
    </div >
  );
};

export default PatientDetailPage;
