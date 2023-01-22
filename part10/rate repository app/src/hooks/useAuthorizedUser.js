import { useQuery } from '@apollo/client';

import { AUTHORIZED_USER } from '../graphql/queries';

const useAuthorizedUser = (variables) => {
  const { data, loading, fetchMore, ...result } = useQuery(AUTHORIZED_USER, {
    fetchPolicy: 'no-cache',
    variables,
  });

  const handleFetchMore = () => {
    const canFetchMore =
      !loading && data && data.authorizedUser.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      query: AUTHORIZED_USER,
      variables: {
        fetchPolicy: 'cache-and-network',
        after: data.authorizedUser.reviews.pageInfo.endCursor,
        ...variables,
      },

      updateQuery: (previousResult, { fetchMoreResult }) => {
        const nextResult = {
          authorizedUser: {
            ...previousResult.authorizedUser,
            reviews: {
              ...fetchMoreResult.authorizedUser.reviews,
              edges: [
                ...previousResult.authorizedUser.reviews.edges,
                ...fetchMoreResult.authorizedUser.reviews.edges,
              ],
            },
          },
        };

        return nextResult;
      },
    });
  };

  return {
    authorizedUser: data ? data.authorizedUser : undefined,
    fetchMore: handleFetchMore,
    loading,
    ...result,
  };
};

export default useAuthorizedUser;
