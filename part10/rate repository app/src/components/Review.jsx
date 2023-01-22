import { useMutation } from '@apollo/react-hooks';
import { Formik } from 'formik';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useHistory } from 'react-router-native';
import * as yup from 'yup';

import { CREATE_REVIEW } from '../graphql/mutations';
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
  repositoryName: yup
    .string()
    .min(2, 'Repository Name must be at least four characters long')
    .required('Repository Name is required'),

  ownerName: yup
    .string()
    .min(2, "The repository owner's name must be at least six characters long")
    .required('Name is required'),

  rating: yup.number().required('A rating is required'),
});

const initialValues = {
  repositoryName: '',
  ownerName: '',
  rating: '',
  text: '',
};

const ReviewForm = ({ onSubmit }) => {
  return (
    <View style={theme.container}>
      <View style={styles.input}>
        <FormikTextInput name="ownerName" placeholder="Repository owner name" />
      </View>
      <View style={styles.input}>
        <FormikTextInput name="repositoryName" placeholder="Repository name" />
      </View>
      <View style={styles.input}>
        <FormikTextInput name="rating" placeholder="Rating between 0 and 100" />
      </View>
      <View style={styles.input}>
        <FormikTextInput name="text" placeholder="Review" multiline={true} />
      </View>
      <TouchableOpacity
        onPress={() => {
          onSubmit();
        }}
        testID="submitButton"
      >
        <View
          style={{
            backgroundColor: theme.colors.primary,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 5,
          }}
        >
          <Text style={{ color: 'white', fontSize: 24, padding: 10 }}>
            Create a review
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const Review = () => {
  const [mutate] = useMutation(CREATE_REVIEW);
  const history = useHistory();

  const onSubmit = async (values) => {
    const { repositoryName, ownerName, rating, text } = values;
    try {
      const { data } = await mutate({
        variables: {
          review: { repositoryName, ownerName, rating: Number(rating), text },
        },
      });

      const id = await data.createReview.repositoryId;
      if (data) history.push(`/repo/${id}`);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <ReviewForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default Review;
