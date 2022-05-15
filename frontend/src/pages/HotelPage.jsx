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
  const [hotel_name, setHotel_Name] = useState("");
  const [hotel_link, setHotel_Link] = useState("");
  const [hotel_cost, setHotel_Cost] = useState("");
  const [hotel_id, setHotel_Id] = useState("");

  useEffect(() => {
    fetchHotels();
  }, []);
  async function fetchHotels() {
    let response = await axios.get("http://127.0.01:8000/api/hotel/all/", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    setHotels(response.data);
  }

  function addNewHotel(hotel) {
    let tempHotels = [hotel, ...hotels];
    setHotels(tempHotels);
  }

  function deleteHotel(id) {
    fetch(`http://127.0.01:8000/api/hotel/${id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    }).then(() => {
      fetchHotels();
    });
  }
  function selectHotel(i) {
    let item = hotels[i];
    console.log(item);
    console.log(hotels);
    setHotel_Name(item.hotel_name);
    setHotel_Link(item.hotel_link);
    setHotel_Cost(item.hotel_cost);
    setHotel_Id(item.id);
  }

  function updateHotel() {
    let item = { hotel_name, hotel_link, hotel_cost };
    console.warn("item", item);
    fetch(`http://127.0.01:8000/api/hotel/${hotel_id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(item),
    }).then(() => {
      fetchHotels();
    });
    setHotel_Name("");
    setHotel_Link("");
    setHotel_Cost("");
  }

  return (
    <div>
      <h1>{user.first_name}, here is a list of available hotels!</h1>
      <div className="grid-container">
        <div className="item2">
          <div className="container">
            <div className="border">
              <AddHotel addNewHotelProperty={addNewHotel} />
            </div>
          </div>
        </div>
        <div className="item3"></div>
        <div className="item4">
          <div className="container">
            <div className="border">
              <div className="form">
                <input
                  type="text"
                  placeholder="Hotel"
                  value={hotel_name}
                  onChange={(e) => {
                    setHotel_Name(e.target.value);
                  }}
                />
                <input
                  type="text"
                  placeholder="Link to hotel website"
                  value={hotel_link}
                  onChange={(e) => {
                    setHotel_Link(e.target.value);
                  }}
                />
                <input
                  type="text"
                  placeholder="Price per night"
                  value={hotel_cost}
                  onChange={(e) => {
                    setHotel_Cost(e.target.value);
                  }}
                />
                <button onClick={updateHotel}>Update</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <table cellPadding={5} cellSpacing={5} className="container">
          <tbody>
            <tr>
              <td>Hotel Name</td>

              <td>Price per night</td>
            </tr>
            {hotels &&
              hotels.map((hotel, i) => (
                <tr key={i}>
                  <td>
                    <a href={hotel.hotel_link}>{hotel.hotel_name}</a>{" "}
                  </td>
                  <td>${hotel.hotel_cost} </td>
                  <td>
                    <button onClick={() => selectHotel(i)}>Edit</button>
                  </td>
                  <td>
                    <a
                      href="#"
                      className="myButton"
                      onClick={() => deleteHotel(hotel.id)}
                    >
                      Delete
                    </a>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HotelPage;
