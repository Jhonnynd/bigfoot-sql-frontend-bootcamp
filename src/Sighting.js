import React, { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import logo from "./logo.png";
import "./App.css";
import axios from "axios";

export default function Sighting() {
  const { sightingIndex } = useParams();
  const [sightingInfo, setSightingInfo] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    addInfo();
  }, []);

  const addInfo = async () => {
    const response = await axios.get(
      "http://localhost:8080/sightings/" + sightingIndex
    );
    setSightingInfo(response.data[0]);
    console.log(response.data[0]);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div key={sightingInfo.id}>
          <p>Year: {sightingInfo.YEAR}</p>
          <p>Month: {sightingInfo.MONTH ? sightingInfo.MONTH : "Unknown"}</p>
          <p>
            Observed: <br /> {sightingInfo.OBSERVED}
          </p>
          <p>Season: {sightingInfo.SEASON}</p>
          <hr />
        </div>
        <button onClick={() => navigate("/")}>Go to Homepage</button>
      </header>
    </div>
  );
}
