import React from 'react'
import "./styles.css"

export default function IntemList({title, description}) {
  return (
    <div className='item-list'> 
      <strong>{title}</strong>
      <p>{description}</p>
      <hr />
    </div>
  )
}
