import React,{useState , useEffect} from "react";
import "./App.css";
import Footer from "./Footer";
import Header from "./Header";
import Products from "./Products";
import { Route,Routes } from "react-router-dom";
import Detail from "./Detail";
import Cart from "./Cart";

export default function App() {
  const [cart,setCart] = useState(
    ()=>{
      try{
        return JSON.parse(localStorage.getItem("cart")) ?? [];
      }catch{
        console.error("the cart couldnt  be parsed to json");
        return []
      }
    });
  
  useEffect(() => localStorage.setItem("cart", JSON.stringify(cart)) , [cart]);
  function addtoCart(id,sku){
    setCart((items) => {
      const itemsInCart = items.find((i) => i.sku===sku)
      //if item is already in cart, then increase quantity
      if (itemsInCart){
        return items.map((i) => i.sku===sku ? {...i, quantity: i.quantity +1} : i);
      } else{
        //return new array with new item appended
        return [...items, {id,sku,quantity: 1}];
      }
    })
    
  }
  function updateQuantity(sku,quantity){
    setCart((items) => {
      return quantity===0 ?
      items.filter((i) => i.sku !==sku)
      :
      items.map((i) => i.sku ===sku ? {...i, quantity} : i)
    })
  }
  return (
    <>
      <div className="content">
        <Header />
          <main>
            <Routes>
              <Route path="/" element={<h1>Welcome to Carved Rock Fitness </h1>} />
              <Route path="/:category" element={<Products />} />
              <Route path="/:category/:id" element={<Detail addtoCart={addtoCart} />} />
              <Route path="/cart" element={<Cart cart={cart} updateQuantity={updateQuantity} />} />
            </Routes>
          </main>
      </div>
      <Footer />
    </>
  );
}
