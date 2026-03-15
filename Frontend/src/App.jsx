
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from "./Component/Home"
import Shop from "./Component/Shop"
import About from "./Component/About"
import Nav from "./Component/Nav"
import Register from './Component/register'
import Login from './Component/Login'
import Footer from './Component/footer'
import ProductDetails from './Component/ProductDetails'
import CheckoutPage from './Component/Checkout'
import Admin from './Component/Admin'
import { Toaster } from "react-hot-toast";
// import Product from './Component/Prodectpage'
import OrderDetails from "./Component/OderDetailPage"
// import { useState } from 'react'
import './App.css'
import { div, form, pre } from 'framer-motion/client'
import AdminProtectedRoute from "./Component/AdminProtectedRoute";
import AdminLayout from './Component/Adminlayout'
import Deleteproduct from "./Component/Deletproduct"
import UserProtectedRoute from './Component/UserProtectedRoute'
import Showuser from './Component/Showuser'

function App() {

  const router = createBrowserRouter([
  
    {
      path: "/userorder",
      element: <div>
        <Nav />
        <OrderDetails />
      </div>
    },
      

    {
      path: "/Login",
      element: <div>
        <Nav  />
        <Login  />
      </div>
    },
    {
      path: "/admin",
      element: (
        <AdminProtectedRoute>
          <Nav />
          <AdminLayout />
          <Footer />
        </AdminProtectedRoute>
      ),
      children: [
        { path: "showuser", element: <Showuser /> },
        { path: "addproduct", element: <Admin /> },
        { path: "deleteproduct", element: <Deleteproduct /> },
        { path: "orders", element: <OrderDetails /> },
      ],
    },
    

    {
      path: "/register",
      element: <div>
        <Nav  />
        <Register />
      </div>
    },

    {
      path: "/",
      element: <div>
        <Nav  />
        <Home  />
        <Footer />
       
      </div>
    },
   
    {
      path: "/shop",
      element: (
        <UserProtectedRoute>
          <>
            <Nav />
            <Shop />
            <Footer />
          </>
        </UserProtectedRoute>
      ),
      
    },
    {
      path: "/About",
      element: <div>
        <Nav  />
        <About />
        <Footer />
      </div>
    },
    {
      path: "/products/:id",
      element: 
        <>
          <Nav  />
          <ProductDetails  />
          <Footer />
        </>
        

      
    },
{
    path: "/checkout/:id",
    element: <div>
      {/* <Nav /> */}

      <CheckoutPage />

    </div>
    },
   

 ])

  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
    <RouterProvider router={router}/>
    </div>
   
  )
}

export default App
