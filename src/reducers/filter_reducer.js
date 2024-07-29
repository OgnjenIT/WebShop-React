import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions'
import GridView from '../components/GridView'
import { useFilterContext } from '../context/filter_context'

const filter_reducer = (state, action) => {
  if(action.type===LOAD_PRODUCTS){
    let prices =action.payload.map(product=>{
      return product.price
    })
    let maxPrice = Math.max(...prices)
  
    return {
      ...state,
      all_products: [...action.payload],
      filtered_products: [...action.payload],
      filters:{
        ...state.filters,
        price: maxPrice,
        max_price: maxPrice
      }
    }
  }
  else if(action.type ===SET_GRIDVIEW){
    return{
      ...state,
      grid_view:true
    }
  }
  else if(action.type===SET_LISTVIEW){
    return{
      ...state,
      grid_view: false
    }
  }
  else if(action.type===UPDATE_SORT){
    return{
      ...state,
      sort:action.payload
    }
  }
  else if(action.type === SORT_PRODUCTS){
    const {sort, filtered_products} = state

    let sortedProducts= [...filtered_products]

    if(sort === 'price-lowest'){
      sortedProducts = filtered_products.sort((a,b)=> a.price-b.price) 
    }
    if(sort==='price-highest'){
      sortedProducts = filtered_products.sort((a,b)=> b.price-a.price)
    }
    if(sort==='name-a'){
      sortedProducts = filtered_products.sort((a,b)=> a.name.localeCompare(b.name))
    }
    if(sort==='name-z'){
      console.log(filtered_products);
      sortedProducts = filtered_products.sort((a,b)=> b.name.localeCompare(a.name))
    }

        return {
      ...state,
      filtered_products: [...sortedProducts]

    }
  }
  if(action.type === UPDATE_FILTERS){
     const {name, value} = action.payload
     return {
      ...state,
      filters:{
        ...state.filters,
        [name]: value,
      }
     }
  }
  if(action.type === FILTER_PRODUCTS){
    console.log("izmjena")
    const { all_products } = state;
    const {text,category,company,color,shipping,price, max_price} = state.filters;

    let tempProducts = [...all_products]
    if(text){
      tempProducts = tempProducts.filter((product)=>{
        return product.name.toLowerCase().includes(text.toLowerCase())
      })
    }
    if(category!== "all"){
      tempProducts = tempProducts.filter(product=>{
        return product.category === category
      })
    }
    if(company !== "all"){
      tempProducts = tempProducts.filter(product=>{
        return product.company === company;
      })
    }
    if(color !== "all"){
      tempProducts = tempProducts.filter(product=>{
        return product.colors.find(c=> c === color)
      })
    }
    if(shipping){
      tempProducts = tempProducts.filter(product=>{
        return product.shipping === true
      })
    }
    if(price !== max_price){
      tempProducts = tempProducts.filter(product=>{
        return product.price <= price
      })
    }

    return {
      ...state,
      filtered_products: [...tempProducts]
    }
  }
  if(action.type===CLEAR_FILTERS){
    return {
      ...state,
      filters:{
        ...state.filters,
        text:"",
        company:"all",
        category:"all",
        color:"all",
        price: state.filters.max_price,
        shipping:false
      }
    }
  }

  return state
}

export default filter_reducer
