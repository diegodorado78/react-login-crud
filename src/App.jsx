import React from 'react'
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./components/login/Login";
import ProductForm from "./components/items/ProductForm";
import useToken from './components/login/useToken'
import Items from './components/items/Items';

function App() {
  const { token, setToken } = useToken()

  if (!token) {
    return <Login setToken={setToken} />;
  }
  return (
    <React.Fragment>
      <Routes>
        <Route path="/" element={<Items />}></Route>
        <Route path="/items" element={<Items />}></Route>
        <Route path="items/:itemId" element={<ProductForm />}></Route>
        <Route path="items/new" element={<ProductForm />}></Route>
      </Routes>
    </React.Fragment>
  );
}
export default App;
