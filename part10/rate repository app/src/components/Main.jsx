import React from 'react';
import { View } from 'react-native';
import { Redirect, Route, Switch } from 'react-router-native';

import AppBar from './AppBar';
import MyReviews from './MyReviews';
import RepositoryList from './RepositoryList';
import Review from './Review';
import SignIn from './SignIn';
import SignUp from './SignUp';
import SingleRepositoryItem from './SingleRepositoryItem';

const Main = () => {
  return (
    <View>
      <AppBar />
      <Switch>
        <Route path="/signIn">
          <SignIn />
        </Route>
        <Route path="/signUp">
          <SignUp />
        </Route>
        <Route path="/review">
          <Review />
        </Route>
        <Route path="/reviews">
          <MyReviews />
        </Route>
        <Route path="/repo/:id">
          <SingleRepositoryItem />
        </Route>
        <Route path="/">
          <RepositoryList />
        </Route>
        <Redirect to="/" />
      </Switch>
    </View>
  );
};

export default Main;
