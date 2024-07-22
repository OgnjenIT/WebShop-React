import React from 'react'
import styled from 'styled-components'
import { useCartContext } from '../context/cart_context'
import { Link } from 'react-router-dom'
import { CartContent, PageHero } from '../components'
import CartTotals from '../components/CartTotals'

const CartPage = () => {

  const { cart } = useCartContext()

  return cart.length === 0 ? 
  <Wrapper className='page-100'>
    <div className='empty'>
      <h2>Vasa kosarica je prazna.</h2>
      <Link to='/products' className="btn">Idi na proizvode</Link>
    </div>
  </Wrapper> : <main>
    <PageHero title="Kosarica"/>
    <Wrapper className='page'>
      <CartContent />
    
    </Wrapper>
  </main>
}

const Wrapper = styled.main`
  .empty {
    text-align: center;
    h2 {
      margin-bottom: 1rem;
      text-transform: none;
    }
  }
`

export default CartPage
