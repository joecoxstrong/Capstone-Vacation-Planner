import React, { useState } from "react";
import useAuth from "../hooks/useAuth";

const AddCustomer = (props) => {
  const [user, token] = useAuth();
  const [first_name, setFirst_Name] = useState("");
  const [last_name, setLast_Name] = useState("");
  const [email, setEmail] = useState("");
  const [phone_number, setPhone_Number] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipcode, setZipcode] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    const addNewCustomer = {
      first_name,
      last_name,
      email,
      phone_number,
      street,
      city,
      state,
      zipcode,
    };

    fetch("http://127.0.01:8000/api/customer/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(addNewCustomer),
    }).then(() => {
      console.log(`New customer added.`);
    });
    let newCustomer = {
      first_name: first_name,
      last_name: last_name,
      email: email,
      phone_number: phone_number,
      street: street,
      city: city,
      state: state,
      zipcode: zipcode,
    };
    setFirst_Name("");
    setLast_Name("");
    setEmail("");
    setPhone_Number("");
    setStreet("");
    setCity("");
    setState("");
    setZipcode("");
    props.addNewCostomerProperty(newCustomer);
  }

  return (
    <div>
      <form className="form" onSubmit={handleSubmit}>
        <input
          placeholder="First Name"
          type="text"
          name="first_name"
          value={first_name}
          onChange={(event) => setFirst_Name(event.target.value)}
        ></input>
        <input
          placeholder="Last Name"
          type="text"
          name="last_name"
          value={last_name}
          onChange={(event) => setLast_Name(event.target.value)}
        ></input>
        <input
          placeholder="Email"
          type="text"
          name="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        ></input>
        <input
          placeholder="Phone Number"
          type="number"
          name="phone_number"
          value={phone_number}
          onChange={(event) => setPhone_Number(event.target.value)}
        ></input>
        <input
          placeholder="Street"
          type="text"
          name="street"
          value={street}
          onChange={(event) => setStreet(event.target.value)}
        ></input>
        <input
          placeholder="City"
          type="text"
          name="city"
          value={city}
          onChange={(event) => setCity(event.target.value)}
        ></input>
        <input
          placeholder="State"
          type="text"
          name="state"
          value={state}
          onChange={(event) => setState(event.target.value)}
        ></input>
        <input
          placeholder="Zipcode"
          type="number"
          name="zipcode"
          value={zipcode}
          onChange={(event) => setZipcode(event.target.value)}
        ></input>
        <button type="submit">ADD CUSTOMER</button>
      </form>
    </div>
  );
};

export default AddCustomer;
