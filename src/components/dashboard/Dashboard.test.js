import React from "react"
import { render, unmountComponentAtNode } from "react-dom"
import { act } from "react-dom/test-utils"

import Dashboard from "./Dashboard"

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

it("renders with the expected text", () => {
  act(() => {
    render(<Dashboard />, container)
  })
  expect(container.textContent).toBe('"To say lorem ipsum,I must." - Yoda')
})
