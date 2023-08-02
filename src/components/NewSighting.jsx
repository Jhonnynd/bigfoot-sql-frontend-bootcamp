import axios from "axios";
import { useEffect, useState } from "react";
import Select from "react-select";

export default function NewSighting(props) {
  const [date, setDate] = useState(null);
  const [notes, setNotes] = useState("");
  const [location, setLocation] = useState("");
  const [allCategories, setAllCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8080/categories`).then((response) => {
      setAllCategories(response.data);
    });
  }, []);

  const categoryOptions = allCategories.map((category) => ({
    value: category.id,
    label: category.name,
  }));

  const handleSelectChange = (selectedOptions) => {
    setSelectedCategories(selectedOptions || []);
  };
  // Make text black in Select field
  const selectFieldStyles = {
    option: (provided) => ({
      ...provided,
      color: "black",
    }),
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedCategoryIds = selectedCategories.map(({ value }) => value);

    axios
      .post("http://localhost:8080/sightings/new", {
        date,
        notes,
        location,
        selectedCategoryIds,
      })
      .then((response) => {
        console.log(response.data.sighting);
        props.addNewSighting(response.data.sighting);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
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
        onChange={(e) => setLocation(e.target.value)}
      />
      <br />

      <label htmlFor="categories">Categories: </label>
      <Select
        id="categories"
        isMulti
        options={categoryOptions}
        styles={selectFieldStyles}
        value={selectedCategories}
        onChange={handleSelectChange}
      />
      <br />

      <button onClick={(e) => handleSubmit(e)}>Submit</button>
      <hr />
    </div>
  );
}
