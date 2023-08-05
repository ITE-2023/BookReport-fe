import React from "react";
import Layout from "./components/Layout"
import {CookiesProvider} from 'react-cookie';

function App() {

  return (
    <CookiesProvider>
      <Layout />
    </CookiesProvider>

  );
}

export default App;
