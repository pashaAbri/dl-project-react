import React from 'react';
import './App.css';
import Layout from "./components/layout";

import {About, Home, Chatbot} from "./pages/export"

const navItems = [
  {name: "Home", path: "/", element: <Home/>, showOnHeader: true },
  {name: "Chatbot", path: "/chatbot", element: <Chatbot/>, showOnHeader: true },
  {name: "About", path: "/about", element: <About/>, showOnHeader: true },
]

function App() {
  return (
    <div className="App" data-testid="app">
      <Layout navItems={navItems}/>
    </div>
  );
}

export default App;
