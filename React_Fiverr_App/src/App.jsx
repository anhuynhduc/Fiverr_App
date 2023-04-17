import React from 'react'
import Navbar from "./components/navbar/Navbar.jsx";
import "./app.scss";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Home from "./pages/home/Home.jsx";
import Footer from "./components/footer/Footer.jsx";
import Gigs from "./pages/gigs/Gigs.jsx";
import Gig from "./pages/gig/Gig.jsx";
import Orders from "./pages/orders/Orders.jsx";
import Add from "./pages/add/Add.jsx";
import Messages from "./pages/messages/Messages.jsx";
import Message from "./pages/message/Message.jsx";
import MyGigs from "./pages/myGigs/MyGigs.jsx";
import Register from "./pages/register/Register.jsx";
import Login from "./pages/login/Login.jsx";
import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'


function App() {
    const queryClient = new QueryClient()
  const Layout = () => {
      return (
          <div className="app">
              <QueryClientProvider client={queryClient}>
                  <Navbar/>
                  <Outlet/>
                  <Footer/>
              </QueryClientProvider>
          </div>
      )
  }

  const router = createBrowserRouter([
      {
          path: "/",
          element: <Layout/>,
          children:[
              {
                  path: "/",
                  element: <Home/>
              },
              {
                  path: "/gigs",
                  element: <Gigs/>
              },
              {
                  path: "/gig/:id",
                  element: <Gig/>
              },
              {
                  path: "/orders",
                  element: <Orders/>
              },
              {
                  path: "/add",
                  element: <Add/>
              },
              {
                  path: "/messages",
                  element: <Messages/>
              },
              {
                  path: "/message/:id",
                  element: <Message/>
              },
              {
                  path: "/myGigs",
                  element: <MyGigs/>
              },
              {
                  path: "/register",
                  element: <Register />,
              },
              {
                  path: "/login",
                  element: <Login />,
              },
          ]
      }
  ])

  return (
    <div className="App">
       <RouterProvider router={router}/>

    </div>
  )
}

export default App
