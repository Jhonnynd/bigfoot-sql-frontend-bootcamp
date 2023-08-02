import React, { useEffect, useState } from "react";
import logo from "./logo.png";
import "./App.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NewSighting from "./components/NewSighting";

export default function App() {
  const [sightings, setSightings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    addUser();
  }, []);

  const addUser = async () => {
    try {
      const response = await axios.get("http://localhost:8080/sightings");
      setSightings(response.data);
      console.log("Fetched data:", response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const addNewSighting = (sighting) => {
    const updatedSightings = [...sightings, sighting];
  };

  const handleDeleteSighting = (sightingId) => {
    axios
      .delete(`http://localhost:8080/sightings/${sightingId}`)
      .then((response) => {
        console.log(response);
        const updatedSightings = sightings.filter(
          (sighting) => sighting.id !== sightingId
        );
        setSightings(updatedSightings);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <NewSighting addNewSighting={addNewSighting} />
        <h2>Click on the report number to go to each particular case.</h2>
        <br />
        {sightings.map((sighting) => {
          return (
            <div key={sighting.id} style={{ width: "700px" }}>
              <span
                style={{ color: "blue" }}
                onClick={() => navigate(`/sightings/${sighting.id}`)}
              >
                Report Case Number: {sighting.id}
              </span>
              <p>Year: {new Date(sighting.date).getUTCFullYear()}</p>
              <p>
                Month:{" "}
                {new Date(sighting.date).toLocaleString("default", {
                  month: "long",
                })}
              </p>
              <p>
                Observed: <br />{" "}
                {sighting.notes?.split(" ").slice(0, 40).join(" ")}
              </p>
              <p>
                Location: <br /> {sighting.location}
              </p>
              <button onClick={() => handleDeleteSighting(sighting.id)}>
                Delete sighting
              </button>
              <br />
              <button
                onClick={() => navigate(`/sightings/edit/${sighting.id}`)}
              >
                Edit Sighting
              </button>
              <hr />
            </div>
          );
        })}
      </header>
    </div>
  );
}
