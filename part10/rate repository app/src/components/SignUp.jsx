import { useMutation } from '@apollo/react-hooks';
import { Formik } from 'formik';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useHistory } from 'react-router-native';
import * as yup from 'yup';

import { SIGN_UP } from '../graphql/mutations';
import { useSignIn } from '../hooks/useSignIn';
import theme from '../theme';
import FormikTextInput from './FormikTextInput';

const styles = StyleSheet.create({
  input: {
    marginVertical: 10,
    paddingHorizontal: 5,
    paddingVertical: 10,
    borderWidth: 0.5,
    borderRadius: 5,
    borderColor: 'grey',
  },
  button: {
    marginVertical: 10,
    paddingHorizontal: 5,
    paddingVertical: 10,
  },
});

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(1, 'Username must be between 1 and 30 characters long')
    .max(30, 'Username must be between 1 and 30 characters long')
    .required('Username is required'),

  password: yup
    .string()
    .required('Password is required')
    .min(1, 'Username must be between 1 and 30 characters long')
    .max(30, 'Username must be between 1 and 30 characters long'),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
});

const initialValues = {
  username: '',
  password: '',
  passwordConfirm: '',
};

const SignUpForm = ({ onSubmit }) => {
  return (
    <View style={theme.container}>
      <View style={styles.input}>
        <FormikTextInput name="username" placeholder="Username" />
      </View>
      <View style={styles.input}>
        <FormikTextInput
          name="password"
          placeholder="Password"
          secureTextEntry={true}
        />
      </View>
      <View style={styles.input}>
        <FormikTextInput
          name="passwordConfirm"
          placeholder="Password confirmation"
          secureTextEntry={true}
        />
      </View>
      <TouchableOpacity
        onPress={() => {
          onSubmit();
        }}
        testID="submitButton"
      >
        <View
          style={{
            backgroundColor: 'blue',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 5,
          }}
        >
          <Text style={{ color: 'white', fontSize: 24, padding: 10 }}>
            Sign up
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const SignUp = () => {
  const [createUser] = useMutation(SIGN_UP);
  const [signIn] = useSignIn();
  const history = useHistory();

  const onSubmit = async (values) => {
    const { username, password } = values;
    try {
      const { data } = await createUser({
        variables: { user: { username, password } },
      });

      if (data) {
        try {
          await signIn({ username, password });
          history.push('/');
        } catch (e) {
          console.log('sign in error after creating new user', e);
        }
      }
    } catch (e) {
      console.log('error creating user', e);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignUp;
