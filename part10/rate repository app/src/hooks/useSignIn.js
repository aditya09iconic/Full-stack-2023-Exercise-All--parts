import { useApolloClient, useMutation } from '@apollo/client';
import { useContext } from 'react';

import AuthStorageContext from '../contexts/AuthStorageContext';
import { SIGN_IN } from '../graphql/mutations';

export const useSignIn = () => {
  const [mutate, result] = useMutation(SIGN_IN);
  const authStorage = useContext(AuthStorageContext);
  const apolloClient = useApolloClient();

  const signIn = async ({ username, password }) => {
    const { data } = await mutate({
      variables: { credentials: { username, password } },
    });

    const token = await data.authorize.accessToken;
    await authStorage.setAccessToken(token);
    await apolloClient.resetStore();
  };

  return [signIn, result];
};
