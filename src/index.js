import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Sighting from "./pages/Sighting";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import EditSighting from "./pages/EditSighting";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="sightings/:sightingIndex" element={<Sighting />} />
      <Route path="sightings/edit/:sightingIndex" element={<EditSighting />} />
    </Routes>
  </BrowserRouter>
);
