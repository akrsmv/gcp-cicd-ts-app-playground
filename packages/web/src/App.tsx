import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { ThemeProvider } from 'styled-components';
import React, { useState } from 'react';
import { HorizontalNavigation } from './components-layout/HorizontalNavigation';
import { SideNavigation } from './components-layout/SideNavigation';
// import { TVChartLight } from './components/TVChartLight'
import { defaultTheme, ContainerStyled, MainStyled, ContentBoxesStyled, ContentStyled, FooterStyled } from './components-layout/Theme';
import { TVChartLight } from './components/TVChartLight';

function App() {
  //eslint-disable-next-line
  const [theme, _] = React.useState(defaultTheme)
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <ContainerStyled>
          <HorizontalNavigation />
          <MainStyled>
            <Routes>
              <Route path="/dashboard/*" element={<TVChartLight />} />
              <Route path="/settings/*" element={<></>} />
              <Route path="/invoices/*" element={<></>} />
            </Routes>
          </MainStyled>
          <SideNavigation />
          <ContentBoxesStyled>
            <ContentStyled></ContentStyled>
            <ContentStyled></ContentStyled>
            <ContentStyled></ContentStyled>
            <ContentStyled></ContentStyled>
          </ContentBoxesStyled>
          <FooterStyled></FooterStyled>
        </ContainerStyled>
        <ToastContainer />
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App;
