import { fireEvent, render, waitFor } from '@testing-library/react-native';
import React from 'react';

import { SignInContainer } from '../../components/SignIn';

describe('SignIn', () => {
  describe('SignInContainer', () => {
    it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
      // render the SignInContainer component, fill the text inputs and press the submit button
      const initialValues = {
        username: '',
        password: '',
      };

      const onSubmit = jest.fn();
      const { getByTestId } = render(
        <SignInContainer initialValues={initialValues} onSubmit={onSubmit} />,
      );

      fireEvent.changeText(getByTestId('usernameField'), 'kalle');
      fireEvent.changeText(getByTestId('passwordField'), 'secret-password');
      fireEvent.press(getByTestId('submitButton'));

      await waitFor(() => {
        // expect the onSubmit function to have been called once and with a correct first argument
        expect(onSubmit).toHaveBeenCalledTimes(1);

        // onSubmit.mock.calls[0][0] contains the first argument of the first call
        expect(onSubmit.mock.calls[0][0]).toEqual({
          username: 'kalle',
          password: 'secret-password',
        });
      });
    });
  });
});
