import React from 'react';
import { Divider, Header, Table } from 'semantic-ui-react';

import { BaseEntry as Entry } from '../types';
import Diagnosis from './Diagnosis';

const EntryDetail: React.FC<{ entry: Entry | null }> = ({ entry }) => {
  if (!entry) {
    return null;
  }

  return (
    <div>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell></Table.HeaderCell>
            <Table.HeaderCell>Attribute</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>description</Table.Cell>
            <Table.Cell>{entry.description}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>date</Table.Cell>
            <Table.Cell>{entry.date}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>specialist</Table.Cell>
            <Table.Cell>{entry.specialist}</Table.Cell>
          </Table.Row>
          <Diagnosis diagnosis={entry.diagnosisCodes} />
        </Table.Body>
      </Table>
      <Divider hidden />
    </div>
  );
};


const Entries: React.FC<{ entries: Entry[] | null }> = ({ entries }) => {
  if (!entries || entries.length === 0) {
    return null;
  }

  return (
    <div>
      <Header as="h3">entries</Header>
      <div>
        {
          entries.map(e =>
            <EntryDetail key={e.id} entry={e} />
          )
        }
      </div>
    </div>
  );
};

export default Entries;
