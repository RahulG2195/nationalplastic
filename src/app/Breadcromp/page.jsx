import React from 'react'

export default function Breadcrump(productName) {
  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          {/* <li className="breadcrumb-item"><a href="#">Premium Chair</a></li> */}
          <li className="breadcrumb-item active" aria-current="page">{productName.productName}</li>
        </ol>
      </nav>
    </>
  )
}
