import React from 'react'

export default function Footer() {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center p-3 position-fixed bottom-0 w-100 p-15 bg-body-tertiary">
      <strong style={{fontSize: '16px'}}>&copy; {new Date().getFullYear()} Copyright by Selly <i className="bi bi-heart-fill" style={{color: 'red'}}></i></strong>
    </div>
  )
}
