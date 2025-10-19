import React from 'react'
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Header from './Components/Header/Header.jsx'
import Footer from './Components/Footer/Footer.jsx'
import Home from './Components/HomeComponents/Home/Home.jsx'
import AboutUs from './Components/AboutUs/AboutUs.jsx'
import Menu from './Components/Menu/Menu.jsx'
import Portfolio from './Components/Portfolio/Portfolio.jsx'
import PortfolioFeed from './Components/PortfolioFeed/PortfolioFeed.jsx'
import Services from './Components/Services/Services.jsx'
import Contact from './Components/Contact/Contact.jsx'


const Layout = ({ children }) => (
  <>
    <Header />
    {children}
    <Footer />
  </>
);

const App = () => {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/about" element={<Layout><AboutUs /></Layout>} />
          <Route path="/portfolio" element={<Layout><Portfolio /></Layout>} />
          <Route path="/portfoliofeed" element={<Layout><PortfolioFeed /></Layout>} />
          <Route path="/services" element={<Layout><Services /></Layout>} />
          <Route path="/contact" element={<Layout><Contact /></Layout>} />
          <Route path="/menu" element={<Menu />}/>
          
        </Routes>
    </BrowserRouter>
  )
}

export default App