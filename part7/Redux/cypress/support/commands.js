// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

const baseUrl = 'http://localhost:3001'

Cypress.Commands.add('login', (username, password) => {
  cy.request(
    'POST',
    `${baseUrl}/api/login`,
    { username, password }
  ).then(res => {
    localStorage.setItem('loggedBlogappUser', JSON.stringify(res.body))
    cy.visit('http://localhost:3000')
  })
})

Cypress.Commands.add('createBlog', (blog) => {
  const user = JSON.parse(localStorage.getItem('loggedBlogappUser'))
  cy.request({
    'url': `${baseUrl}/api/blogs`,
    'method': 'POST',
    'body': { ...blog },
    'headers': {
      'Authorization': `bearer ${user.token}`
    }
  })
  cy.visit('http://localhost:3000')
})