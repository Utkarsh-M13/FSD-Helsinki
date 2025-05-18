import { render, screen } from '@testing-library/react'
import { expect, test, vi } from 'vitest'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

test('renders content but not URL and Likes when first clicked', () => {
  const blog = {
    author: 'afnlan',
    url: 'ajflajl',
    title: 'title of blog',
    user:{
      username: 'UTK',
      name: 'Bob'
    }
  }

  const handleDelete = vi.fn()

  const { container } = render(<Blog blog={blog} handleDelete={handleDelete}/>)

  const titleElement = container.querySelector('.TitleAndAuthor')
  const urlElement = container.querySelector('.URL')
  expect(titleElement).toBeDefined()
  expect(urlElement).toBeFalsy()
})


test('renders content full content', () => {
  const blog = {
    author: 'afnlan',
    url: 'ajflajl',
    title: 'title of blog',
    user:{
      username: 'UTK',
      name: 'Bob'
    }
  }

  const handleDelete = vi.fn()

  const { container } = render(<Blog blog={blog} handleDelete={handleDelete}/>)

  const titleElement = container.querySelector('.TitleAndAuthor')
  const urlElement = container.querySelector('.URL')

  const user = userEvent.setup()
  const viewButton = container.querySelector('.viewFull')
  user.click(viewButton)

  expect(titleElement).toBeDefined()
  expect(urlElement).toBeDefined()
})
