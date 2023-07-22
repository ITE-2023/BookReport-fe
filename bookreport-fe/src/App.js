import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Header from "./Layout/Header";
import Login from "./routes/Login";
import Join from "./routes/Join";
import Home from "./routes/Home";
import Footer from "./Layout/Footer";

function App() {
  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route path="/account/login" element={<Login />} />
          <Route path="/home/main" element={<Home />} />
          <Route path="/account/join" element={<Join />} />
          <Route path="*" element={<Navigate to="/home/main" />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
