import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

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

export const SignInForm = ({ onSubmit }) => {
  return (
    <View style={theme.container}>
      <View style={styles.input}>
        <FormikTextInput
          name="username"
          placeholder="Username"
          testID="usernameField"
        />
      </View>
      <View style={styles.input}>
        <FormikTextInput
          name="password"
          placeholder="Password"
          secureTextEntry={true}
          testID="passwordField"
        />
      </View>

      <TouchableOpacity
        onPress={() => { onSubmit(); }}
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
            Sign in
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
