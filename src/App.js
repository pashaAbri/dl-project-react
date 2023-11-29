import React from 'react';
import './App.css';
import Layout from "./components/layout";

import {About, Home, CustomerDetails, ItemDetails} from "./pages/export"

const navItems = [
  {name: "Home", path: "/", element: <Home/>, showOnHeader: true },
  {name: "About", path: "/about", element: <About/>, showOnHeader: true },
  {name: "Customer Details", path: "/customer/:id", element: <CustomerDetails/>},
  {name: "Item Details", path: "/item/:name", element: <ItemDetails/>},
]

function App() {
  return (
    <div className="App" data-testid="app">
      <Layout navItems={navItems}/>
    </div>
  );
}

export default App;
