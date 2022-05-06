import React, { useState } from "react";
import useAuth from "../hooks/useAuth";

const AddNewPark = (props) => {
  const [user, token] = useAuth();
  const [park_name, setPark_Name] = useState("");
  const [park_link, setPark_Link] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    const addNewPark = {
      park_name,
      park_link,
    };

    fetch("http://127.0.01:8000/api/park/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(addNewPark),
    }).then(() => {
      console.log(`New park added.`);
    });
    let newPark = {
      park_name: park_name,
      park_link: park_link,
    };
    setPark_Name("");
    setPark_Link("");

    props.addNewParkProperty(newPark);
  }

  return (
    <div class="row mb-3">
      <div class="col-sm-10">
        <form className="form" onSubmit={handleSubmit}>
          <input
            placeholder="Park Name"
            type="text"
            name="park_name"
            value={park_name}
            onChange={(event) => setPark_Name(event.target.value)}
          ></input>
          <input
            placeholder="Link to Park website"
            type="text"
            name="park_link"
            value={park_link}
            onChange={(event) => setPark_Link(event.target.value)}
          ></input>

          <button type="submit">ADD PARK</button>
        </form>
      </div>
    </div>
  );
};

export default AddNewPark;
