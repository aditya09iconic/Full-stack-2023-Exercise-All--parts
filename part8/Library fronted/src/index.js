import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache, split } from '@apollo/client'
import { BrowserRouter as Router } from "react-router-dom"
import { getMainDefinition } from '@apollo/client/utilities'
import { setContext } from 'apollo-link-context'
import { WebSocketLink } from '@apollo/link-ws'
import React from 'react'
import ReactDOM from 'react-dom'

import App from './App'

import './css/index.css'

const httpLink = new HttpLink({ uri: 'http://localhost:4000' })

const wsLink = new WebSocketLink({
  uri: 'ws://localhost:4000/graphql',
  options: { reconnect: true }
})

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('user-token')

  return {
    headers: {
      ...headers,
      authorization: token ? `bearer ${token}` : null,
    }
  }
})

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  authLink.concat(httpLink),
)

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: splitLink
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router >
      <App />
    </Router>
  </ApolloProvider>,
  document.getElementById('root')
)
