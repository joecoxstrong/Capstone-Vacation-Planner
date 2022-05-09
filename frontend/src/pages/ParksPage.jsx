import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import AddNewPark from "../components/AddNewPark";
import axios from "axios";

const ParksPage = () => {
  // The "user" value from this Hook contains the decoded logged in user information (username, first name, id)
  // The "token" value is the JWT token that you will send in the header of any request requiring authentication
  //TODO: Add an AddCars Page to add a car for a logged in user's garage
  const [user, token] = useAuth();
  const [parks, setParks] = useState([]);

  useEffect(() => {
    const fetchParks = async () => {
      try {
        let response = await axios.get("http://127.0.0.1:8000/api/park/all/", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        setParks(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchParks();
  }, [token]);
  function addNewPark(park) {
    let tempParks = [park, ...parks];
    setParks(tempParks);
  }

  return (
    <div className="container">
      <h1>{user.first_name}, here is a list of available parks!</h1>
      <AddNewPark addNewParkProperty={addNewPark} />

      {parks && parks.map((park) => <p key={park.id}>{park.park_name}</p>)}
    </div>
  );
};

export default ParksPage;
