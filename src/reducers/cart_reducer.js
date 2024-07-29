import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from '../actions'

const cart_reducer = (state, action) => {
  if(action.type === ADD_TO_CART){
    const {id,product,color,amount} = action.payload

    const tempItem = state.cart.find(p=>{
      return p.id === id + color 
    })

  if(tempItem){
    const tempCart = state.cart.map(item=>{

      if(item.id === id + color){
        let newAmount = item.amount + amount;
        if(newAmount > item.max){
          newAmount = item.max
        }
        return {...item, amount: newAmount}
      }  
      else
   return item 
    })

    return{
      ...state,
      cart: [tempCart]
    }
  }
  else{
    const newItem = {
      id: id + color,
      name: product.name,
      color,
      amount,
      image: product.images[0].url,
      price: product.price,
      max: product.stock
    }

    return{
      ...state,
      cart: [...state.cart, newItem]
    }
  }
  }
  if(action.type === REMOVE_CART_ITEM){
    const tempCart = state.cart.filter(item=>{
      return item.id !== action.payload
    })
    return{
      ...state,
      cart: [...tempCart]
    }
  }
  if(action.type === TOGGLE_CART_ITEM_AMOUNT){
    const {id,value} = action.payload
      const tempCart = state.cart.map(item=>{
        if(item.id === id){
          if(value === "inc"){
            let newAmount = item.amount + 1
            if(newAmount > item.max){
              newAmount = item.max
            }
            return {...item, amount: newAmount}
          }
          else if(value === "dec"){
            let newAmount = item.amount - 1
            if(newAmount === 0){
              newAmount = 1
            }
            return {...item, amount: newAmount}
          }
        }
        else
          return item
      })
      return{
        ...state,
        cart: [...tempCart]
      }
  }
  if(action.type === CLEAR_CART){
    return{
      ...state,
      cart: []
    }
  }
  if(action.type === COUNT_CART_TOTALS){
    // let ukupnoKolicina = state.cart.reduce((total,item)=>{
    //   total+= item.amount
    //   return total
    // },0)

    // let ukupnoCijena = state.cart.reduce((total,item)=>{
    //     total += item.amount * item.price
    //     return total
    // },0)

    let ukupno = state.cart.reduce((total, item)=>{
      total.totalU += item.amount
      total.totalC += item.amount * item.price
      return total
    },
  {
    totalU: 0,
    totalC: 0
  })

    return{
      ...state,
      total_items: ukupno.totalU,
      total_amount: ukupno.totalC
    }
  }

  return state
}

export default cart_reducer
