import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { PROJECT, Project } from './components/Project';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { ThemeProvider } from 'styled-components';
import React from 'react';
import { defaultTheme, GCTContainer, GCTContent1, GCTContent2, GCTContent3, GCTContent4, GCTContentBox, GCTFooter, GCTMain, GCTNavBar, GCTSideBar } from './components-layout/Theme';
import { HorizontalNavigation } from './components-layout/HorizontalNavigation';
import { AddTodoItem } from './components/AddTodoItem';
import { SideNavigation } from './components-layout/SideNavigation';
import { AdvancedChart } from 'react-tradingview-embed';
import { TVChartLight } from './components/TVChartLight'
import { usePriceStore } from './stores/PricesDataStore';
import { TOP_ROUTES, SIDE_ROUTES } from './components-layout/GctRoute';

function App() {
  //eslint-disable-next-line
  const [theme, _] = React.useState(defaultTheme)
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <GCTContainer>
          <GCTNavBar><HorizontalNavigation /></GCTNavBar>
          <GCTMain>
            <Routes>
              <Route path={SIDE_ROUTES.ELECTRICITY_USAGE} element={<TVChartLight store={usePriceStore}></TVChartLight>} />
              <Route path={SIDE_ROUTES.ELECTRICITY_PRICE} element={<TVChartLight store={usePriceStore}></TVChartLight>} />
              <Route path={SIDE_ROUTES.TEST_TV_ADVANCED} element={<AdvancedChart widgetProps={{ "theme": "dark" }} />} />
              <Route path={SIDE_ROUTES.TEST_AGGRID} element={<></>} />

              <Route path={TOP_ROUTES.ACCOUNT_SETTINGS} element={<></>} />
              <Route path={TOP_ROUTES.ACCOUNT_LOGIN} element={<></>} />
              <Route path={TOP_ROUTES.ACCOUNT_WALLET} element={<></>} />
            </Routes>
          </GCTMain>
          <GCTSideBar><SideNavigation /></GCTSideBar>
          <GCTContentBox>
            <GCTContent1><Project project_name={PROJECT.API} /></GCTContent1>
            <GCTContent2><Project project_name={PROJECT.CORE} /></GCTContent2>
            <GCTContent3><Project project_name={PROJECT.WEB} /></GCTContent3>
            <GCTContent4><Project project_name={PROJECT.CICD} /></GCTContent4>
          </GCTContentBox>
          <GCTFooter><AddTodoItem /></GCTFooter>
        </GCTContainer>
        <ToastContainer />
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App;
