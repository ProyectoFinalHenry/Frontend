import React from 'react'
import './EmptyCart.css'
import { useNavigate } from 'react-router-dom'
const EmptyCart = () => {
  const navigate = useNavigate()
  return (
    <div className='carritoVacio'>
      <div className='carritoVacio__Container'>
        <img className='carritoVacio__Bolsa' src="https://static.vecteezy.com/system/resources/previews/002/877/059/non_2x/cartoon-illustration-of-shopping-bag-free-vector.jpg" alt="" />
        
      </div>
        <p className='carrito__Empieza'>¡Empieza un carrito de compras!</p>
        <p className='carrito__Texto'>Suma productos y consigue envío gratis.</p>
        <button className='carritoVacio__Descubrir' onClick={()=> navigate('/Products') }>Descubrir Productos</button>
    </div>
  )
}

export default EmptyCart