import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import "./assets/vendor/nucleo/css/nucleo.css";
import "./assets/vendor/font-awesome/css/font-awesome.min.css";
import "./assets/scss/argon-design-system-react.scss?v1.1.0";

import Login from "./routes/Login";
import Join from "./routes/Join";
import ReportForm from "./routes/report/ReportForm.js";
import BookSearch from "./routes/book/BookSearch.js";
import BookDetail from "./routes/book/BookDetail.js";
import "./css/Index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" exact element={<App />} />
      <Route path="*" element={<Navigate to="/" replace />} />
      <Route path="/member/login" exact element={<Login />} />
      <Route path="/member/join" exact element={<Join />} />
      <Route path="/report/create" exact element={<ReportForm />} />
      <Route path="/book/search" exact element={<BookSearch />} />
      <Route path="/book/detail/:isbn" exact element={<BookDetail />} />
    </Routes>
  </BrowserRouter>
);
