import React from 'react'
import ReactDOM from 'react-dom'
import Cats from '../Cats'
import { mount } from 'enzyme'

it('Cats renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<Cats />, div)
})

it('Renders the cats', ()=>{
  const component = mount(<Cats cats={cats} />)
  const headings = component.find('h4 > .cat-name')
  expect(headings.length).toBe(3)
})

it('has a name input', ()=>{
  const component = mount(<NewCat />)
  expect(component.find('label#name').text()).toBe("Name")
})
