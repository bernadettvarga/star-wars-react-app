import React from 'react'

export default function Header ({ entity }) {
  return (
    <div className={`header header--${entity}`} data-testid='header'>
      <h1>{entity}</h1>
    </div>
  )
}
