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
    fetchParks();
  }, []);
  async function fetchParks() {
    let response = await axios.get("http://127.0.01:8000/api/park/all/", {
      headers: {
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(addNewPark),
    });
    setParks(response.data);
  }

  //   const fetchParks = async () => {
  //     try {
  //       let response = await axios.get("http://127.0.0.1:8000/api/park/all/", {
  //         headers: {
  //           Authorization: "Bearer " + token,
  //         },
  //       });
  //       setParks(response.data);
  //     } catch (error) {
  //       console.log(error.message);
  //     }
  //   };
  //   fetchParks();
  // }, [token]);
  function addNewPark(park) {
    let tempParks = [park, ...parks];
    setParks(tempParks);
  }

  function deletePark(id) {
    fetch(`http://127.0.01:8000/api/park/${id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(addNewPark),
    }).then(() => {
      fetchParks();
    });
  }

  return (
    <div className="container">
      <h1>{user.first_name}, here is a list of available parks!</h1>
      <AddNewPark addNewParkProperty={addNewPark} />
      <div>
        <table>
          <tbody>
            {parks &&
              parks.map((park) => (
                <tr key={park.id}>
                  <td>{park.park_name}</td>
                  <td>${park.park_cost}</td>
                  <td>
                    <button onClick={() => deletePark(park.id)}>Delete</button>
                  </td>
                  <td>
                    {/* <button onClick={() => selectPark(park.id)}>Update</button> */}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ParksPage;
