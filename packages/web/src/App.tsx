import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { ThemeProvider } from 'styled-components';
import { HorizontalNavigation } from './components/layout/HorizontalNavigation';
import { SideNavigation } from './components/layout/SideNavigation';
import { defaultTheme, ContainerStyled, MainStyled, ContentBoxesStyled, ContentStyled, FooterStyled, ContentStyled1, SSEContentStyled } from './components/layout/Theme';
import { TVChartLight } from './components/TVChartLight';
import { NivoPieChart } from './components/NivoPieChart';
import { DailyAvgConsumptionNivo } from './components/DailyAvgConsumptionNivo';
import { GctAppInfo } from './components/GctAppInfo';
import { ServerSideEvents } from './components/ServerSideEvents';
import { BarChart } from './components/BarChart';

function App() {
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
            <NivoPieChart />
            <DailyAvgConsumptionNivo />
            <BarChart/>
            <ServerSideEvents for={"some_topic"}/>
          </ContentBoxesStyled>
          <FooterStyled><GctAppInfo /></FooterStyled>
        </ContainerStyled>
        <ToastContainer />
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App;
