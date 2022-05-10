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

  //   const fetchHotels = async () => {
  //     try {
  //       let response = await axios.get("http://127.0.0.1:8000/api/hotel/all/", {
  //         headers: {
  //           Authorization: "Bearer " + token,
  //         },
  //       });
  //       setHotels(response.data);
  //     } catch (error) {
  //       console.log(error.message);
  //     }
  //   };
  //   fetchHotels();
  // }, [token]);

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
  return (
    <div className="container">
      <h1>{user.first_name}, here is a list of available hotels!</h1>
      <AddHotel addNewHotelProperty={addNewHotel} />
      <div>
        <table>
          <tbody>
            <tr>
              <td>Hotel Name</td>
              <td>Price per night</td>
            </tr>
            {hotels &&
              hotels.map((hotel) => (
                <tr key={hotel.id}>
                  <td>{hotel.hotel_name} </td>
                  <td>${hotel.hotel_cost} </td>
                  <td>
                    <button onClick={() => deleteHotel(hotel.id)}>
                      DELETE
                    </button>
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
