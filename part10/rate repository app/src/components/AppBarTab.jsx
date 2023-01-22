import Constants from 'expo-constants';
import React from 'react';
import { StyleSheet } from 'react-native';

import theme from '../theme';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.textPrimary
  },
  title: {
    marginTop: 30,
    marginLeft: 10,
    marginBottom: 20,
    color: theme.colors.tabTextColor
  }

});

const handleClick = (title, dispatch) => {
  if (title === 'Sign in') {
    dispatch({ type: 'signout' });
  } else if (title === 'Sign out') {
    dispatch({ type: 'signin' });
  }
};
const AppBarTab = ({ title, dispatch }) => {
  return <Text onClick={() => handleClick(title, dispatch)} fontSize="title" fontWeight="bold" style={styles.title}>{title}</Text>;
};

export default AppBarTab;