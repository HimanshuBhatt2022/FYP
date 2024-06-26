import React, { createContext, useEffect } from "react";
import { useState } from 'react';
import Shop from "../Pages/Shop";
import Product from "../Pages/Product";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
// import all_product from "../Components/Assets/all_product"



export const ShopContext = createContext(null);
const getDefaultCart = ()=>{
    let cart = {};
    for (let index = 0; index < 300+1; index++) {
        cart[index] = 0;
        
    }
    return cart;
}

const ShopContextProvider = (props)=>{

    const[all_product,setAll_Product] = useState([]);

    const [cartItems,setCartItems]= useState(getDefaultCart());

    useEffect(()=>{
        fetch('http://localhost:4000/allproducts')
        .then((response)=>response.json())
        .then((data)=>setAll_Product(data))
    },[])

    

    const addToCart =(itemId)=>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
        toast.success(`Product Added to Cart !!`)
        if(localStorage.getItem('auth-token'))
        fetch('http://localhost:4000/addtocart',{
        method:'POST',
        headers:{
            Accept:"application/form-data",
            'auth-token':`${localStorage.getItem('auth-token')}`,
            'Content-Type':'application/json',
        },
        body:JSON.stringify({"itemId":itemId})
    }
    ).then((response)=>response.json())
    .then((data)=>console.log(data));

    }


    const removeFromCart =(itemId)=>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
        toast.success("Product Removed From Cart")
    }

    // for remove icon
    const removeCart =(itemId)=>{
        setCartItems(itemId ===0)
        toast.success("Product Removed From Cart")

    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for(const item in cartItems)
        {
            if(cartItems[item]>0)
            {
                let itemInfo = all_product.find((product)=>product.id===Number(item))
                totalAmount += cartItems[item] * itemInfo.new_price;
            }
        }
            return totalAmount;
        }

        const getTotalCartItems = () =>{
            let totalItem = 0;
            for(const item in cartItems)
            {
                if(cartItems[item]>0)
                {
                    totalItem+= cartItems[item];
                }
            }
            return totalItem;
        }
    
    const contextValue ={getTotalCartItems,getTotalCartAmount,all_product,cartItems,addToCart,removeFromCart, removeCart};
   
    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;