import React from "react";
import styled from "styled-components";

import Header from "./header";
import {Route, Routes} from "react-router-dom";
import Footer from "./footer";

import {Box, Toolbar} from "@mui/material";

const BoxLayout = styled(Box)`
  width: 100%;
  padding: 10px;
  margin: 10px
`

function Layout(props) {
  const {navItems} = props;
  return (
    <>
      <Box sx={{ display: 'flex', margin: '40px' }} className="App">
        <Header navItems={navItems}/>
        <BoxLayout component="main">
          <Toolbar />
          <Routes>
            {navItems.map((item) => (
              <Route path={item.path} key={item.name} element={ item.element }/>
            ))}
          </Routes>
        </BoxLayout>
      </Box>
      <Footer/>
    </>
  );
}

export default Layout;