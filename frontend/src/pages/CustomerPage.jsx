import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";

import axios from "axios";

const CustomerPage = () => {
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
    <div className="background">
      <div className="container">
        <h1>{user.first_name}, here is a list of your customers!</h1>
        {customers &&
          customers.map((customer) => (
            <p key={customer.id}>
              {customer.first_name} {customer.last_name}
            </p>
          ))}
      </div>
    </div>
  );
};

export default CustomerPage;
