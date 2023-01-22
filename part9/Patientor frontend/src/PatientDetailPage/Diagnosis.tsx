import React, { useEffect, useState } from 'react';
import { Table } from 'semantic-ui-react';

import { diagnosisService } from '../services';
import { Diagnosis as DiagnosisEntry } from '../types';

const Diagnose: React.FC<{ code: string | null }> = ({ code }) => {
  const [diagnose, setDiagnose] = useState<DiagnosisEntry | null>(null);

  useEffect(() => {
    if (code) {
      diagnosisService.fetchByCode(code).then(
        d => setDiagnose(d)
      );
    }
  }, [code]);

  if (!diagnose) {
    return null;
  }

  return (
    <div>
      <li>{diagnose.code}: {diagnose.name}</li>
    </div>
  );
};

const Diagnosis: React.FC<{ diagnosis: Array<DiagnosisEntry['code']> | null | undefined }> = ({ diagnosis }) => {
  if (!diagnosis) {
    return null;
  }

  return (
    <Table.Row>
      <Table.Cell>diagnosis</Table.Cell>
      <Table.Cell>
        {
          diagnosis.map(d =>
            <Diagnose key={d} code={d} />
          )
        }
      </Table.Cell>
    </Table.Row>
  );
};

export default Diagnosis;
