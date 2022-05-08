import React, { useReducer,useEffect,useContext } from "react";
import cartReducer from "./cartReducer";

const CartContext = React.createContext(null);

let initialState;
try{
  initialState= JSON.parse(localStorage.getItem("cart")) ?? [];
}catch{
  console.error("the cart couldnt  be parsed to json");
  initialState = []
}



export function CartProvider(props){
    const [cart,dispatch] = useReducer(cartReducer,initialState);
    useEffect(() => localStorage.setItem("cart", JSON.stringify(cart)) , [cart]);
    const contextValue = {
        cart,
        dispatch,
    }
    return <CartContext.Provider value={contextValue}>{props.children}</CartContext.Provider>

}

export function useCart(){
    const context  = useContext(CartContext);
    if (!context) throw new Error("context not set. Wrap child components in CartProvider")
    return context;
}