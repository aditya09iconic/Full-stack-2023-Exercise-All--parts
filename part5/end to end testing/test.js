const { func } = require("prop-types")

describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')

    const user = {
      'username': 'test',
      'password': 'test',
      'name': 'test'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)

    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('log in to application')
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('input:first').type('test')
      cy.get('input:last').type('test')
      cy.contains('login').click()

      cy.contains('test logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('input:first').type('test')
      cy.get('input:last').type('wrong')
      cy.contains('login').click()

      cy.get('.error')
        .should('contain', 'wrong credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', 'test logged in')
    })

    describe('When logged in', function () {
      beforeEach(function () {
        cy.login('test', 'test')
      })

      it('Blog form is shown', function () {
        cy.contains('new blog')
        cy.contains('contents')
      })

      it('Create new blog form is shown', function () {
        cy.contains('new blog').click()
        cy.contains('title')
        cy.contains('author')
        cy.contains('url')
        cy.get('#cancel').click()
      })

      it('A blog can be created', function () {
        const create = (blog) => {
          cy.contains('new blog').click()
          cy.get('#title').type(blog.title)
          cy.get('#author').type(blog.author)
          cy.get('#url').type(blog.url)
          cy.get('#create').click()
          cy.get('#cancel').click()
        }

        create({
          "title": "React patterns",
          "author": "Michael Chan",
          "url": "https://reactpatterns.com"
        })

        cy.get('html').should('contain', 'React patterns by Michael Chan')
        cy.get('.success')
          .should('contain', 'a new blog React patterns by Michael Chan')
          .and('have.css', 'color', 'rgb(0, 128, 0)')
          .and('have.css', 'border-style', 'solid')
      })

      describe('Have one blog', function () {
        beforeEach(function () {
          cy.createBlog({
            "title": "React patterns",
            "author": "Michael Chan",
            "url": "https://reactpatterns.com"
          })
        })

        it('Click likes', function () {
          cy.contains('view').click()
          cy.contains('like').click()
          cy.get('.success')
            .should('contain', 'blog likes+1 React patterns by Michael Chan')
            .and('have.css', 'color', 'rgb(0, 128, 0)')
            .and('have.css', 'border-style', 'solid')
        })

        it('Delete one blog', function () {
          cy.contains('view').click()
          cy.contains('remove').click()
          cy.get('.error')
            .should('contain', 'Removed blog React patterns by Michael Chan')
            .and('have.css', 'color', 'rgb(255, 0, 0)')
            .and('have.css', 'border-style', 'solid')
        })
      })

      describe.only('Have blogs', function () {
        beforeEach(function () {
          cy.createBlog({
            "title": "React patterns",
            "author": "Michael Chan",
            "url": "https://reactpatterns.com",
            "likes": 7
          })
          cy.createBlog({
            'title': "Go To Statement Considered Harmful",
            'author': "Edsger W. Dijkstra",
            'url': "http://www.u.arizona.edu",
            'likes': 10
          })
        })

        it.only('Compare the sequence of blog likes', function () {
          cy.contains('Go To Statement Considered Harmful').find('button').click()
          cy.contains('React patterns by Michael Chan').find('button').click()
          cy.get('#likes')
            .should('contain', '10')
            .should('not.contain', '7')
        })
      })
    })
  })
})
