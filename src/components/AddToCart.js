import React, { useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { FaCheck } from 'react-icons/fa'
import { useCartContext } from '../context/cart_context'
import AmountButtons from './AmountButtons'

const AddToCart = ({product}) => {
  const {colors, id, stock } = product
  const [mainColor, setMainColor] = useState(colors[0])
  const [amount, setAmount] = useState(1)

  const increase = ()=>{
    setAmount(prevState=>{
      let tempNumber = prevState + 1
      if(tempNumber > stock){
        return prevState
      }
      else
        return tempNumber
    })
  }

  const decrease = () =>{
    setAmount(prevState=>{
      let tempNumber = prevState - 1
      if(tempNumber < 2){
        return 1
      }
      else
        return tempNumber
    })
  }
  const { addToCart } = useCartContext()

  return <Wrapper>
    <div className='colors'>
      <span>boje: </span>
      <div>
      {colors.map((color, index)=>{
        return <button
        key={index} 
        className={`${mainColor === color ? "active" : null} color-btn`}
        style={{backgroundColor: color}}
        onClick={()=>{
          setMainColor(color)
        }}
        >
          {mainColor===color ? <FaCheck /> : null}
        </button>
      })}
      </div>
    </div>
    <div className='btn-container'>
      <AmountButtons amount={amount} increase={increase} decrease={decrease}/>
      <Link to='/cart' className='btn'
      onClick={()=>{ 
        addToCart(id, mainColor, amount, product)
      }}
      >Dodaj u kosaricu</Link>
    </div>
  </Wrapper>
}

const Wrapper = styled.section`
  margin-top: 2rem;
  .colors {
    display: grid;
    grid-template-columns: 125px 1fr;
    align-items: center;
    margin-bottom: 1rem;
    span {
      text-transform: capitalize;
      font-weight: 700;
    }
    div {
      display: flex;
    }
  }
  .color-btn {
    display: inline-block;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    background: #222;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.75rem;
      color: var(--clr-white);
    }
  }
  .active {
    opacity: 1;
  }
  .btn-container {
    margin-top: 2rem;
  }

  .btn {
    margin-top: 1rem;
    width: 140px;
  }
`
export default AddToCart
