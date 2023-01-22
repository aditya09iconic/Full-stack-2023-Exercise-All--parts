import { useQuery } from '@apollo/client';

import { REPOSITORY } from '../graphql/queries';

const useSingleRepository = (variables) => {
  const { data, loading, fetchMore, refetch, ...result } = useQuery(
    REPOSITORY,
    {
      fetchPolicy: 'cache-and-network',
      variables,
    },
  );

  const handleFetchMore = () => {
    const canFetchMore =
      !loading && data && data.repository.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      query: REPOSITORY,
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
        ...variables,
      },

      updateQuery: (previousResult, { fetchMoreResult }) => {
        const nextResult = {
          repository: {
            ...previousResult.repository,
            reviews: {
              ...fetchMoreResult.repository.reviews,
              edges: [
                ...previousResult.repository.reviews.edges,
                ...fetchMoreResult.repository.reviews.edges,
              ],
            },
          },
        };
        return nextResult;
      },
    });
  };

  return {
    repository: data ? data.repository : undefined,
    fetchMore: handleFetchMore,
    loading,
    refetch,
    ...result,
  };
};

export default useSingleRepository;
