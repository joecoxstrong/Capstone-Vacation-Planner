import React, { useState } from "react";
import useAuth from "../hooks/useAuth";

const UpdateCustomer = (props) => {
  const [user, token] = useAuth();
  const [first_name, setFirst_Name] = useState("");
  const [last_name, setLast_Name] = useState("");
  const [email, setEmail] = useState("");
  const [phone_number, setPhone_Number] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipcode, setZipcode] = useState("");

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
    fetch(`http://127.0.01:8000/api/customer/${props.customer_id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(item),
    }).then(() => {
      props.fetchCustomers();
    });
  }

  function selectCustomer(i) {
    let item = props.customers[i];
    console.log(item);
    console.log(props.customers);
    setFirst_Name(item.first_name);
    setLast_Name(item.last_name);
    setEmail(item.email);
    setPhone_Number(item.phone_number);
    setStreet(item.street);
    setCity(item.city);
    setState(item.state);
    setZipcode(item.zipcode);
    props.setCustomer_id(item.id);
  }

  return (
    <div>
      <input
        type="text"
        value={first_name}
        onChange={(e) => {
          setFirst_Name(e.target.value);
        }}
      />{" "}
      <br />
      <br />
      <input
        type="text"
        value={last_name}
        onChange={(e) => {
          setLast_Name(e.target.value);
        }}
      />{" "}
      <br />
      <br />
      <input
        type="text"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />{" "}
      <br />
      <br />
      <input
        type="text"
        value={phone_number}
        onChange={(e) => {
          setPhone_Number(e.target.value);
        }}
      />{" "}
      <br />
      <br />
      <input
        type="text"
        value={street}
        onChange={(e) => {
          setStreet(e.target.value);
        }}
      />{" "}
      <br />
      <br />
      <input
        type="text"
        value={city}
        onChange={(e) => {
          setCity(e.target.value);
        }}
      />{" "}
      <br />
      <br />
      <input
        type="text"
        value={state}
        onChange={(e) => {
          setState(e.target.value);
        }}
      />{" "}
      <br />
      <br />
      <input
        type="text"
        value={zipcode}
        onChange={(e) => {
          setZipcode(e.target.value);
        }}
      />{" "}
      <br />
      <br />
      <button onClick={updateCustomer}>Update customer</button>
    </div>
  );
};

export default UpdateCustomer;
