import React from 'react'
import img from '../../img/yoda.png'

export default function Dashboard () {
  return (
    <div className='dashboard'>
      <img src={img} />
      <p className='dashboard__quote'>
        "To say <b>lorem ipsum</b>,<br />I must."<span className='dashboard__author'> - Yoda</span>
      </p>
    </div>
  )
}
