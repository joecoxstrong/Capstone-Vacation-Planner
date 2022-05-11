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
  const [park_name, setPark_Name] = useState("");
  const [park_link, setPark_Link] = useState("");
  const [park_cost, setPark_Cost] = useState("");
  const [park_id, setPark_Id] = useState("");

  useEffect(() => {
    fetchParks();
  }, []);
  async function fetchParks() {
    let response = await axios.get("http://127.0.01:8000/api/park/all/", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    setParks(response.data);
  }

  function addNewPark(park) {
    let tempParks = [park, ...parks];
    setParks(tempParks);
  }

  async function deletePark(id) {
    fetch(`http://127.0.01:8000/api/park/${id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    }).then(() => {
      fetchParks();
    });
  }

  function selectPark(i) {
    let item = parks[i];
    console.log(item);
    console.log(parks);
    setPark_Name(item.park_name);
    setPark_Link(item.park_link);
    setPark_Cost(item.park_cost);
    setPark_Id(item.id);
  }

  function updatePark(e) {
    e.preventDefault();
    let item = { park_name, park_link, park_cost };
    console.warn("item", item);
    fetch(`http://127.0.01:8000/api/park/${park_id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(item),
    }).then(() => {
      fetchParks();
    });
    setPark_Name("");
    setPark_Link("");
    setPark_Cost("");
  }

  return (
    <div className="container">
      <h1>{user.first_name}, here is a list of available parks!</h1>
      <AddNewPark addNewParkProperty={addNewPark} />
      <div>
        <table cellPadding={5} cellSpacing={5}>
          <tbody>
            <tr>
              <td>Park ID</td>
              <td>Park Name</td>
              <td>Price</td>
            </tr>
            {parks.map((park, i) => (
              <tr key={i}>
                <td>{park.id}</td>
                <td>{park.park_name}</td>
                <td>${park.park_cost}</td>
                <td>
                  <button onClick={() => deletePark(park.id)}>Delete</button>
                </td>
                <td>
                  <button onClick={() => selectPark(i)}>Update</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <input
            type="text"
            value={park_name}
            placeholder="Park Name"
            onChange={(e) => {
              setPark_Name(e.target.value);
            }}
          />{" "}
          <br />
          <br />
          <input
            type="text"
            value={park_link}
            placeholder="Link"
            onChange={(e) => {
              setPark_Link(e.target.value);
            }}
          />{" "}
          <br />
          <br />
          <input
            type="text"
            value={park_cost}
            placeholder="Cost"
            onChange={(e) => {
              setPark_Cost(e.target.value);
            }}
          />{" "}
          <br />
          <br />
          <button onClick={updatePark}>Update Park</button>
        </div>
      </div>
    </div>
  );
};

export default ParksPage;
