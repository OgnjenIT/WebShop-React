import axios from 'axios'
import React, { useContext, useEffect, useReducer } from 'react'
import reducer from '../reducers/products_reducer'
import { products_url as url, single_product_url as single_url } from '../utils/constants'
import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_SINGLE_PRODUCT_BEGIN,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_ERROR,
} from '../actions'


const initialState = {
  isSideBarOpen: false,
  products_loading: true,
  products_error: false,
  products: [],
  products_featured: [],
  single_product_loading: true,
  single_product_error: false,
  single_product: {}
}

const ProductsContext = React.createContext()

export const ProductsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const openSidebar = () => {
    dispatch({ type: SIDEBAR_OPEN })
  }

  const closeSidebar = () => {
    dispatch({ type: SIDEBAR_CLOSE })
  }

  const resetError = ()=>{
    dispatch({type: GET_SINGLE_PRODUCT_BEGIN})
  }
  const fetchProducts = async()=>{
    dispatch({type: GET_PRODUCTS_BEGIN})  
    try {
        const response = await axios.get("../data.json")
        const data = await response.data

        dispatch({type: GET_PRODUCTS_SUCCESS, payload: data})
      } catch (error) {
        dispatch({type: GET_PRODUCTS_ERROR})
      }
  }
    // const fetchSingleProduct = async (id)=>{
    //     dispatch({type: GET_SINGLE_PRODUCT_BEGIN})
    //     try {
    //       const response = await axios.get(`${single_url}${id}`)
    //       const data = await response.data
    //       dispatch({type: GET_SINGLE_PRODUCT_SUCCESS, payload: data})
    //     } catch (error) {
    //       dispatch({type: GET_SINGLE_PRODUCT_ERROR})
    //     }
    // }
    const fetchSingleProduct = async (id)=>{
      dispatch({type: GET_SINGLE_PRODUCT_BEGIN})
      try {
        const response = await axios.get("../singledata.json")
        const data = await response.data
        const product = data.find(proizvod=>{
          return proizvod.id === id
        })
        if(product){
          dispatch({type: GET_SINGLE_PRODUCT_SUCCESS, payload: product})
        }
        else
          dispatch({type: GET_SINGLE_PRODUCT_ERROR})
      } catch (error) {
        dispatch({type: GET_SINGLE_PRODUCT_ERROR})
      }
  }

  useEffect(()=>{
    fetchProducts()
  },[])
  return (
    <ProductsContext.Provider
      value={{
        ...state,
        openSidebar,
        closeSidebar,
        fetchSingleProduct,
        resetError, 
      }}
    >
      {children}
    </ProductsContext.Provider>
  )
}

// make sure use
export const useProductsContext = () => {
  return useContext(ProductsContext)
}
