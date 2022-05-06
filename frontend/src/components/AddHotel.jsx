import React, { useState } from "react";
import useAuth from "../hooks/useAuth";

const AddHotel = (props) => {
  const [user, token] = useAuth();
  const [hotel_name, setHotel_Name] = useState("");
  const [hotel_link, setHotel_Link] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    const addNewHotel = {
      hotel_name,
      hotel_link,
    };

    fetch("http://127.0.01:8000/api/hotel/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(addNewHotel),
    }).then(() => {
      console.log(`New hotel added.`);
    });
    let newHotel = {
      hotel_name: hotel_name,
      hotel_link: hotel_link,
    };
    setHotel_Name("");
    setHotel_Link("");

    props.addNewHotelProperty(newHotel);
  }

  return (
    <div class="row mb-3">
      <div class="col-sm-10">
        <form className="form" onSubmit={handleSubmit}>
          <input
            placeholder="Hotel Name"
            type="text"
            name="hotel_name"
            value={hotel_name}
            onChange={(event) => setHotel_Name(event.target.value)}
          ></input>
          <input
            placeholder="Link to hotel website"
            type="text"
            name="hotel_link"
            value={hotel_link}
            onChange={(event) => setHotel_Link(event.target.value)}
          ></input>

          <button type="submit">ADD HOTEL</button>
        </form>
      </div>
    </div>
  );
};

export default AddHotel;
