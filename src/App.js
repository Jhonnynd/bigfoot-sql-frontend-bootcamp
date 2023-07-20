import React, { useEffect, useState } from "react";
import logo from "./logo.png";
import "./App.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function App() {
  const [sightings, setSightings] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    addUser();
  }, []);

  const addUser = async () => {
    const response = await axios.get("http://localhost:8080/sightings");
    setSightings(response.data);
    console.log(response.data);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>Click on the report number to go to each particular case.</h2>
        <br />
        {sightings.map((sighting) => {
          return (
            <div>
              <span
                style={{ color: "blue" }}
                onClick={() => navigate(`/sightings/${sighting.REPORT_NUMBER}`)}
              >
                Report Case Number: {sighting.REPORT_NUMBER}
              </span>
              <p>Year: {sighting.YEAR}</p>
              <p>Month: {sighting.MONTH ? sighting.MONTH : "Unknown"}</p>
              <p>
                Observed: <br />{" "}
                {sighting.OBSERVED?.split(" ").slice(0, 40).join(" ")}
              </p>
              <p>Season: {sighting.SEASON}</p>
              <hr />
            </div>
          );
        })}
      </header>
    </div>
  );
}
