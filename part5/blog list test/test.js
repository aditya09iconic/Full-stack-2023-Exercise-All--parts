import '@testing-library/jest-dom'
import { render, fireEvent } from '@testing-library/react'
import React from 'react'

import Blog from './Blog'
import CreateBlog from './CreateBlog'

const blog = {
  'title': "React patterns",
  'author': "Michael Chan",
  'url': "https://reactpatterns.com",
  'likes': 7
}

test('default view, can only see title and author', () => {
  const component = render(
    <Blog blog={blog} />
  )

  const blogTitle = component.container.querySelector('.blogTitle')
  expect(blogTitle).toBeDefined()
  expect(blogTitle).toBeVisible()
  expect(blogTitle).toHaveTextContent(`${blog.title} by ${blog.author}`)
})

test('click view button and can see blog detail', () => {
  const component = render(
    <Blog blog={blog} />
  )

  const buttonView = component.getByText('view')
  fireEvent.click(buttonView)

  const blogAll = component.container.querySelector('.blogAll')
  expect(blogAll).toBeVisible()
  expect(blogAll).toHaveTextContent(`${blog.url}`)
  expect(blogAll).toHaveTextContent(`${blog.likes}`)
})

test('click like button twice and likes will plus two', () => {
  const mockHandler = jest.fn()

  const component = render(
    <Blog blog={blog} handleLikeChange={mockHandler} />
  )

  const buttonView = component.getByText('view')
  fireEvent.click(buttonView)

  const blogAll = component.container.querySelector('.blogAll')
  expect(blogAll).toBeVisible()

  const buttonLike = component.getByText('like')
  fireEvent.click(buttonLike)
  fireEvent.click(buttonLike)

  expect(mockHandler.mock.calls).toHaveLength(2)
})

test('create a new blog', () => {
  const component = render(
    <CreateBlog />
  )

  const title = component.container.querySelector('#title')
  const author = component.container.querySelector('#author')
  const url = component.container.querySelector('#url')

  expect(title).toBeDefined()
  expect(author).toBeDefined()
  expect(url).toBeDefined()
})
