import React, { useState } from "react";
import useAuth from "../hooks/useAuth";

const Addon = (props) => {
  const [user, token] = useAuth();
  const [addon_name, setAddon_Name] = useState("");
  const [addon_description, setAddon_Description] = useState("");
  const [addon_price, setAddon_Price] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    const addNewAddon = {
      addon_name,
      addon_description,
      addon_price,
    };

    fetch("http://127.0.01:8000/api/addon/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(addNewAddon),
    }).then(() => {
      console.log(`New addon added.`);
    });
    let newAddon = {
      addon_name: addon_name,
      addon_description: addon_description,
      addon_price: addon_price,
    };
    setAddon_Name("");
    setAddon_Description("");
    setAddon_Price("");

    props.addNewAddonProperty(newAddon);
  }

  return (
    <div>
      <div>
        <form className="form" onSubmit={handleSubmit}>
          <input
            placeholder="Addon Name"
            type="text"
            name="addon_name"
            value={addon_name}
            onChange={(event) => setAddon_Name(event.target.value)}
          ></input>
          <input
            placeholder="Description"
            type="text"
            name="addon_description"
            value={addon_description}
            onChange={(event) => setAddon_Description(event.target.value)}
          ></input>
          <input
            placeholder="Price"
            type="number"
            name="addon_price"
            value={addon_price}
            onChange={(event) => setAddon_Price(event.target.value)}
          ></input>

          <button type="submit">ADD ADDON</button>
        </form>
      </div>
    </div>
  );
};

export default Addon;
