import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";

import axios from "axios";
import AddHotel from "../components/AddHotel";

const HotelPage = () => {
  // The "user" value from this Hook contains the decoded logged in user information (username, first name, id)
  // The "token" value is the JWT token that you will send in the header of any request requiring authentication
  //TODO: Add an AddCars Page to add a car for a logged in user's garage
  const [user, token] = useAuth();
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        let response = await axios.get("http://127.0.0.1:8000/api/hotel/all/", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        setHotels(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchHotels();
  }, [token]);

  function addNewHotel(hotel) {
    let tempHotels = [hotel, ...hotels];
    setHotels(tempHotels);
  }
  return (
    <div className="container">
      <h1>{user.first_name}, here is a list of available hotels!</h1>
      <AddHotel addNewHotelProperty={addNewHotel} />
      {hotels &&
        hotels.map((hotel) => (
          <p key={hotel.id}>
            {hotel.hotel_name} {hotel.hotel_link}
          </p>
        ))}
    </div>
  );
};

export default HotelPage;
