import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import logo from "../logo.png";
import "../App.css";
import axios from "axios";

export default function EditSighting() {
  const { sightingIndex } = useParams();

  const [location, setLocation] = useState("");
  const [notes, setNotes] = useState("");
  const [date, setDate] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    addInfo();
  }, []);

  const addInfo = async () => {
    const response = await axios.get(
      "http://localhost:8080/sightings/" + sightingIndex
    );

    setLocation(response.data.location);
    setNotes(response.data.notes);
    setDate(transformDate(response.data.date));

    console.log("response", response);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put("http://localhost:8080/sightings/" + sightingIndex, {
        date: date,
        notes: notes,
        location: location,
      })
      .then(function (response) {
        console.log(response.data.sighting);
        // props.addNewSighting(response.data.sighting);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const transformDate = (inputDate) => {
    const date = new Date(inputDate);
    return date.toISOString().slice(0, 16);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div>
          <h3>Add a new sighting</h3>
          <label htmlFor="dateInput">Select a date: </label>
          <input
            required
            type="datetime-local"
            value={date}
            id="dateInput"
            name="dateInput"
            onChange={(e) => setDate(e.target.value)}
          />

          <br />
          <label htmlFor="observed">Observed: </label>
          <input
            required
            size="30"
            type="text"
            id="notes"
            name="notes"
            value={notes}
            placeholder="Enter the description"
            onChange={(e) => setNotes(e.target.value)}
          />
          <br />
          <label htmlFor="location">Location: </label>
          <input
            required
            size="30"
            type="text"
            id="location"
            name="location"
            placeholder="Enter the location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <br />
          <button onClick={(e) => handleSubmit(e)}>Submit</button>
          <hr />
          <button onClick={() => navigate("/")}>Go to Homepage</button>
        </div>
      </header>
    </div>
  );
}
