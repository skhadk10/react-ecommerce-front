import React from 'react'
import {
    BrowserRouter,
    Routes,
    Route,
    Link,
  } from "react-router-dom";

import Signin from './user/Signin';
import Signup from './user/Signup';
import Home from './core/Home'
import Menu from './core/Menu'

const Router = () => {
  return (
    <BrowserRouter>
    <Menu/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router