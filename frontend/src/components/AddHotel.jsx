import React, { useState } from "react";
import useAuth from "../hooks/useAuth";

const AddHotel = (props) => {
  const [user, token] = useAuth();
  const [hotel_name, setHotel_Name] = useState("");
  const [hotel_link, setHotel_Link] = useState("");
  const [hotel_cost, setHotel_Cost] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    const addNewHotel = {
      hotel_name,
      hotel_link,
      hotel_cost,
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
      hotel_cost: hotel_cost,
    };
    setHotel_Name("");
    setHotel_Link("");
    setHotel_Cost("");

    props.addNewHotelProperty(newHotel);
  }

  return (
    <div>
      <div>
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
          <input
            placeholder="Price per night"
            type="number"
            name="hotel_cost"
            value={hotel_cost}
            onChange={(event) => setHotel_Cost(event.target.value)}
          ></input>

          <button type="submit">Add</button>
        </form>
      </div>
    </div>
  );
};

export default AddHotel;
