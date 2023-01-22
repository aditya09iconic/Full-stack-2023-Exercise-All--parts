import { render } from '@testing-library/react-native';
import React from 'react';

import { RepositoryListContainer } from '../../components/RepositoryListContainer';
import SortList from '../../components/SortList';

describe('RepositoryList', () => {
  describe('RepositoryListContainer', () => {
    it('renders repository information correctly', () => {
      const repositories = {
        pageInfo: {
          totalCount: 8,
          hasNextPage: true,
          endCursor:
            'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
        },
        edges: [
          {
            node: {
              id: 'jaredpalmer.formik',
              fullName: 'jaredpalmer/formik',
              description: 'Build forms in React, without the tears',
              language: 'TypeScript',
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars2.githubusercontent.com/u/4060187?v=4',
            },
            cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
          },
          {
            node: {
              id: 'async-library.react-async',
              fullName: 'async-library/react-async',
              description: 'Flexible promise-based React data loader',
              language: 'JavaScript',
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars1.githubusercontent.com/u/54ak310907?v=4',
            },
            cursor:
              'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          },
        ],
      };

      const orderEnums = {
        latest: { orderBy: 'CREATED_AT' },
        rating: { orderBy: 'RATING_AVERAGE' },
        up: { orderDirection: 'ASC' },
        down: { orderDirection: 'DESC' },
      };

      const setSearchKeyword = jest.fn();
      let searchKeyword = '';
      const setOrderBy = jest.fn();

      // Add your test code here
      const { queryAllByTestId, queryAllByText } = render(
        <RepositoryListContainer repositories={repositories}>
          <SortList
            setOrderBy={setOrderBy}
            orderEnums={orderEnums}
            searchKeyword={searchKeyword}
            setSearchKeyword={setSearchKeyword}
          />
        </RepositoryListContainer>,
      );

      // const flatlist = getByTestId('flat-list');
      // debug();
      const language = queryAllByTestId('language');
      const descriptions = queryAllByTestId('description');
      const stargazers = queryAllByText('Stars');

      expect(language[0]).toHaveTextContent('TypeScript');
      expect(language[1]).toHaveTextContent('JavaScript');

      expect(descriptions[0]).toHaveTextContent(
        repositories.edges[0].node.description,
      );

      expect(stargazers[0].parent.parent).toHaveTextContent('21.9k');
      expect(stargazers[1].parent.parent).toHaveTextContent('1.8k');
    });
  });
});
