import React from 'react'
import img from '../../img/jar-jar.png'

export default function ErrorContainer ({ msg }) {
  return (
    <div className='error-container'>
      <img src={img} />
      <p><span>{msg}</span></p>
    </div>
  )
}

ErrorContainer.defaultProps = {
  msg: 'Oh-oh, something went wrong, try again!'
}
