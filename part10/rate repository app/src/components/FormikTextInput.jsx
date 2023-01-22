import { useField } from 'formik';
import React from 'react';
import { StyleSheet } from 'react-native';

import theme from '../theme';
import Text from './Text';
import TextInput from './TextInput';

const styles = StyleSheet.create({
  errorText: {
    marginTop: 5,
    color: theme.colors.error,
  },
});

const FormikTextInput = (props) => {
  const [field, meta, helpers] = useField(props.name);
  const showError = meta.touched && meta.error;

  return (
    <>
      <TextInput
        onChangeText={(value) => helpers.setValue(value)}
        onBlur={() => helpers.setTouched(true)}
        value={field.value}
        error={showError}
        {...props}
      />
      {showError && <Text style={styles.errorText}>{meta.error}</Text>}
    </>
  );
};
export default FormikTextInput;
