import React from 'react';
import { Link, Route, Switch, useRouteMatch } from 'react-router-dom';
import { Button, Container, Divider, Header } from 'semantic-ui-react';

import PatientDetailPage from './PatientDetailPage';
import PatientListPage from './PatientListPage';
import { patientService } from './services';
import { setPatientList, useStateValue } from './state';
import { Patient } from './types';

const App: React.FC = () => {
  const [, dispatch] = useStateValue();
  const patientMatch = useRouteMatch<{ id: string }>('/patients/:id');
  const [patient, setPatient] = React.useState<Patient | null | undefined>(null);

  React.useEffect(() => {
    setPatientList(dispatch);
  }, [dispatch]);

  React.useEffect(() => {
    if (patientMatch) {
      patientService.fetchById(patientMatch.params.id).then(
        data => setPatient(data)
      );
    }
  }, []);


  return (
    <div className="App">
      <Container>
        <Header as="h1">Patientor</Header>
        <Button as={Link} to="/" primary>Home</Button>
        <Divider hidden />
        <Switch>
          <Route path="/patients/:id">
            <PatientDetailPage patient={patient} />
          </Route>
          <Route path="/" render={() => <PatientListPage />} />
        </Switch>
      </Container>
    </div>
  );
};

export default App;
