import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import logo from "../logo.png";
import "../App.css";
import axios from "axios";

export default function Sighting() {
  const { sightingIndex } = useParams();

  const [sightingInfo, setSightingInfo] = useState({});
  const [comments, setComments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    addInfo();
    fetchComments();
  }, []);

  const addInfo = async () => {
    const response = await axios.get(
      "http://localhost:8080/sightings/" + sightingIndex
    );
    setSightingInfo(response.data);
    console.log("response", response);
  };

  const fetchComments = async () => {
    const response = await axios.get(
      `http://localhost:8080/sightings/${sightingIndex}/comments`
    );
    setComments(Array.isArray(response.data) ? response.data : []);
    console.log(comments);
  };

  const handleSubmitComment = async (commentContent) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/sightings/${sightingIndex}/comments`,
        { content: commentContent }
      );
      console.log("Comment added:", response.data);

      // Refresh comments
      fetchComments();
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div key={sightingInfo.id}>
          <span
            style={{ color: "blue" }}
            onClick={() => navigate(`/sightings/${sightingInfo.id}`)}
          >
            Report Case Number: {sightingInfo.id}
          </span>
          <p>
            Categories:
            {sightingInfo.categories?.map((category) => (
              <span key={category.id}> {category.name},</span>
            ))}
          </p>
          <p>Year: {new Date(sightingInfo.date).getUTCFullYear()}</p>
          <p>
            Month:{" "}
            {new Date(sightingInfo.date).toLocaleString("default", {
              month: "long",
            })}
          </p>
          <p>
            Observed: <br />{" "}
            {sightingInfo.notes?.split(" ").slice(0, 40).join(" ")}
          </p>
          <hr />
        </div>
        <div>
          <h3>Comments</h3>
          {comments?.map((comment) => (
            <p key={comment.id}>Anonymous: {comment.content}</p>
          ))}
        </div>
        <div>
          <h3>Add Comment</h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmitComment(e.target.comment.value);
              e.target.comment.value = "";
            }}
          >
            <input type="text" name="comment" />
            <button type="submit">Add Comment</button>
          </form>
        </div>
        <button onClick={() => navigate("/")}>Go to Homepage</button>
      </header>
    </div>
  );
}
