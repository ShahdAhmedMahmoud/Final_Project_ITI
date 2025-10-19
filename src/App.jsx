import React from "react";
import { createHashRouter, RouterProvider } from "react-router-dom";

import Layout from "./Components/Layout/Layout.jsx";
import Home from "./Components/HomeComponents/Home/Home.jsx";
import AboutUs from "./Components/AboutUs/AboutUs.jsx";
import Portfolio from "./Components/Portfolio/Portfolio.jsx";
import PortfolioFeed from "./Components/PortfolioFeed/PortfolioFeed.jsx";
import Services from "./Components/Services/Services.jsx";
import Contact from "./Components/Contact/Contact.jsx";
import Menu from "./Components/Menu/Menu.jsx";

const router = createHashRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <AboutUs /> },
      { path: "portfolio", element: <Portfolio /> },
      { path: "portfoliofeed", element: <PortfolioFeed /> },
      { path: "services", element: <Services /> },
      { path: "contact", element: <Contact /> },
    ],
  },
  {
    path: "/menu",
    element: <Menu />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
