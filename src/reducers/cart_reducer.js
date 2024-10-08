import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from '../actions'

const cart_reducer = (state, action) => {

  if(action.type===ADD_TO_CART){
    const { id, product, color, amount} = action.payload
    const tempItem = state.cart.find(i=>{
      return i.id === id+color;
     
    })
    if(tempItem){
      const tempCart = state.cart.map(item=>{
        if(item.id === id + color){
          let newAmount = item.amount + 1;
          if(newAmount > item.max)
              newAmount = item.max;
          return {...item, amount: newAmount}
        }
        else{
          return item
        }
 
      })
      return {...state, cart: [...tempCart]}
    }
    else{
      const newItem = {
        id: id + color,
        name: product.name,
        color,
        amount,
        image:product.images[0].url,
        price: product.price,
        max:product.stock   
        } 
        return {
          ...state,
          cart: [...state.cart, newItem]
        }
    }
  }
  if(action.type===REMOVE_CART_ITEM){
    const tempCart = state.cart.filter(item=>{
      return item.id !== action.payload
    })
    return {...state, cart: [...tempCart]}
  }
  if(action.type===CLEAR_CART){
    return {
      ...state,
      cart: []
    }
  }
  if(action.type===TOGGLE_CART_ITEM_AMOUNT){
    const { id, value } = action.payload;
    const tempCart = state.cart.map(item=>{
      if(item.id === id){
        if(value==="inc"){
          let newAmount = item.amount+1;
          if(newAmount > item.max){
            newAmount=item.max
          }
          return {...item, amount:newAmount}
        }
        else if(value==="dec"){
          let newAmount = item.amount - 1;
          if(newAmount < 1){
            newAmount=1
          }
          return {...item, amount: newAmount}
        }
      }
      return item
    })
    return {...state, cart: [...tempCart]}
  }
  if(action.type === COUNT_CART_TOTALS){
    let ukupno = state.cart.reduce((total,item)=>{
        total.total_items += item.amount
        total.total_amount += item.price*item.amount
        return total
    },
  {
    total_items:0,
    total_amount:0
  })

  return {
    ...state,
    total_items: ukupno.total_items,
    total_amount: ukupno.total_amount
  }
  }

  return state
}

export default cart_reducer
