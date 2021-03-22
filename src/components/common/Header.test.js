import React from "react"
import { render, unmountComponentAtNode } from "react-dom"
import { act } from "react-dom/test-utils"

import Header from "./Header"

let container = null

beforeEach(() => {
  container = document.createElement("div")
  document.body.appendChild(container)
})

afterEach(() => {
  unmountComponentAtNode(container)
  container.remove()
  container = null
})

it("renders with the expected text and classes", () => {
  act(() => {
    render(<Header entity='planets' />, container)
  })

  expect(
    container.querySelector("[data-testid='header']").getAttribute("class")
  ).toEqual('header header--planets')

  expect(
    container.querySelector("[data-testid='header']").textContent
  ).toEqual('planets')
})
