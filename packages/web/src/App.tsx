import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { PROJECT, Project } from './components/Project';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { ThemeProvider } from 'styled-components';
import React from 'react';
import { HorizontalNavigation } from './components-layout/HorizontalNavigation';
import { AddTodoItem } from './components/_not_used_for_test_only/AddTodoItem';
import { SideNavigation } from './components-layout/SideNavigation';
import { AdvancedChart } from 'react-tradingview-embed';
// import { TVChartLight } from './components/TVChartLight'
import { ElecticityChart } from './components/NivoChart';
import { defaultTheme, ContainerStyled, NavBarStyled, MainStyled, SideBarStyled, ContentBoxesStyled, ContentStyled, FooterStyled } from './components-layout/Theme';

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
              <Route path="/" element={<ElecticityChart />} />
              {/* <Route path={SIDE_ROUTES.ELECTRICITY_PRICE} element={<TVChartLight store={usePriceStore}></TVChartLight>} /> */}
              {/* <Route path={SIDE_ROUTES.TEST_TV_ADVANCED} element={<AdvancedChart widgetProps={{ "theme": "dark" }} />} />
              <Route path={SIDE_ROUTES.TEST_AGGRID} element={<></>} /> */}

              {/* <Route path={TOP_ROUTES.ACCOUNT_SETTINGS} element={<></>} />
              <Route path={TOP_ROUTES.ACCOUNT_LOGIN} element={<></>} />
              <Route path={TOP_ROUTES.ACCOUNT_WALLET} element={<></>} /> */}
            </Routes>
          </MainStyled>
          <SideNavigation />
          <ContentBoxesStyled>
            <ContentStyled><Project project_name={PROJECT.API} /></ContentStyled>
            <ContentStyled><Project project_name={PROJECT.CORE} /></ContentStyled>
            <ContentStyled><Project project_name={PROJECT.WEB} /></ContentStyled>
            <ContentStyled><Project project_name={PROJECT.CICD} /></ContentStyled>
          </ContentBoxesStyled>
          <FooterStyled><AddTodoItem /></FooterStyled>
        </ContainerStyled>
        <ToastContainer />
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App;
