import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import AddCustomer from "../components/AddCustomer";
import axios from "axios";
import UpdateCustomer from "../components/UpdateCustomer";

const CustomerPage = (props) => {
  // The "user" value from this Hook contains the decoded logged in user information (username, first name, id)
  // The "token" value is the JWT token that you will send in the header of any request requiring authentication
  //TODO: Add an AddCars Page to add a car for a logged in user's garage
  const [user, token] = useAuth();
  const [customers, setCustomers] = useState([]);
  const [first_name, setFirst_Name] = useState("");
  const [last_name, setLast_Name] = useState("");
  const [email, setEmail] = useState("");
  const [phone_number, setPhone_Number] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [customer_id, setCustomer_id] = useState("");

  useEffect(() => {
    fetchCustomers();
  }, []);
  async function fetchCustomers() {
    let response = await axios.get("http://127.0.01:8000/api/customer/all/", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    setCustomers(response.data);
  }

  function addNewCustomer(customer) {
    let tempCustomers = [customer, ...customers];
    setCustomers(tempCustomers);
  }

  function deleteCustomer(id) {
    fetch(`http://127.0.01:8000/api/customer/${id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    }).then(() => {
      fetchCustomers();
    });
  }

  function selectCustomer(i) {
    let item = customers[i];
    console.log(item);
    console.log(customers);
    setFirst_Name(item.first_name);
    setLast_Name(item.last_name);
    setEmail(item.email);
    setPhone_Number(item.phone_number);
    setStreet(item.street);
    setCity(item.city);
    setState(item.state);
    setZipcode(item.zipcode);
    setCustomer_id(item.id);
  }

  function updateCustomer(e) {
    e.preventDefault();
    let item = {
      first_name,
      last_name,
      email,
      phone_number,
      street,
      city,
      state,
      zipcode,
    };
    console.warn("item", item);
    fetch(`http://127.0.01:8000/api/customer/${customer_id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(item),
    }).then(() => {
      fetchCustomers();
    });
    setFirst_Name("");
    setLast_Name("");
    setEmail("");
    setPhone_Number("");
    setStreet("");
    setCity("");
    setState("");
    setZipcode("");
  }

  return (
    <div>
      <h1>{user.first_name}, here is a list of your customers!</h1>
      <div className="grid-container">
        <div className="item2">
          <div className="container">
            <AddCustomer addNewCostomerProperty={addNewCustomer} />
          </div>
        </div>
        <div className="item3"> </div>
        <div className="item4">
          <div className="container">
            <div className="border">
              <div className="form">
                <input
                  type="text"
                  placeholder="First Name"
                  value={first_name}
                  onChange={(e) => {
                    setFirst_Name(e.target.value);
                  }}
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  value={last_name}
                  onChange={(e) => {
                    setLast_Name(e.target.value);
                  }}
                />
                <input
                  type="text"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                <input
                  type="text"
                  placeholder="Phone Number"
                  value={phone_number}
                  onChange={(e) => {
                    setPhone_Number(e.target.value);
                  }}
                />

                <input
                  type="text"
                  placeholder="Street"
                  value={street}
                  onChange={(e) => {
                    setStreet(e.target.value);
                  }}
                />

                <input
                  type="text"
                  placeholder="City"
                  value={city}
                  onChange={(e) => {
                    setCity(e.target.value);
                  }}
                />

                <input
                  type="text"
                  placeholder="City"
                  value={state}
                  onChange={(e) => {
                    setState(e.target.value);
                  }}
                />
                <input
                  type="text"
                  placeholder="Zipcode"
                  value={zipcode}
                  onChange={(e) => {
                    setZipcode(e.target.value);
                  }}
                />
                <button onClick={updateCustomer}>Update</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <table cellPadding={5} cellSpacing={5} className="container">
          <tbody>
            <tr>
              <td>Customer Name</td>
              <td>Email</td>
              <td>Phone Number</td>
              <td>Street</td>
              <td>City</td>
              <td>State</td>
              <td>Zipcode</td>
            </tr>
            {customers.map((customer, i) => (
              <tr key={i}>
                <td>
                  {customer.first_name} {customer.last_name}{" "}
                </td>
                <td>{customer.email}</td>
                <td>{customer.phone_number}</td>
                <td>{customer.street}</td>
                <td>{customer.city}</td>
                <td>{customer.state}</td>
                <td>{customer.zipcode}</td>
                <td>
                  <button onClick={() => selectCustomer(i)}>Edit</button>
                </td>
                <td>
                  <a
                    href="#"
                    className="myButton"
                    onClick={() => deleteCustomer(customer.id)}
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

export default CustomerPage;
