import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";

import axios from "axios";

const VacationHomePage = () => {
  // The "user" value from this Hook contains the decoded logged in user information (username, first name, id)
  // The "token" value is the JWT token that you will send in the header of any request requiring authentication
  //TODO: Add an AddCars Page to add a car for a logged in user's garage
  const [user, token] = useAuth();
  const [cars, setCars] = useState([]);
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        let response = await axios.get(
          "http://127.0.0.1:8000/api/customer/all/",
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        setCustomers(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchCustomers();
  }, [token]);
  return (
    <div className="container">
      <h1>Welcome {user.first_name}!</h1>
      <div>
        <h2>Here is a tool that you</h2>
        <h2>can use as a vacation planner</h2>
        <h2>to begin creating those</h2>
        <h2>dream vacations</h2>
        <h2>for all of your amazing clients!!</h2>
      </div>
    </div>
  );
};

export default VacationHomePage;
