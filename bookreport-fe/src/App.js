import React from "react";
import Layout from "./components/Layout"
import Hero from "./components/Hero"
import {CookiesProvider} from 'react-cookie';

function App() {

  return (
    <CookiesProvider>
      <Layout />
      <Hero />
    </CookiesProvider>

  );
}

export default App;
