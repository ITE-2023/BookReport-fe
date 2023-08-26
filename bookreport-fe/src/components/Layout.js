import Header from "../components/Header";
import Footer from "../components/Footer";
import React from "react";

import "../css/Layout.css";

function Layout({ children }) {
  return (
    <>
      <div id="wrapper">
        <Header />
        <main id="content">{children}</main>
        <Footer />
      </div>
    </>
  );
}

export default Layout;
