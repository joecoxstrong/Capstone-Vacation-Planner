import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import axios from "axios";
import Addon from "../components/Addon";

const AddonPage = () => {
  // The "user" value from this Hook contains the decoded logged in user information (username, first name, id)
  // The "token" value is the JWT token that you will send in the header of any request requiring authentication
  //TODO: Add an AddCars Page to add a car for a logged in user's garage
  const [user, token] = useAuth();
  const [addons, setAddons] = useState([]);
  const [addon_name, setAddon_Name] = useState("");
  const [addon_description, setAddon_Description] = useState("");
  const [addon_price, setAddon_Price] = useState("");
  const [addon_id, setAddon_id] = useState("");

  useEffect(() => {
    fetchAddons();
  }, []);
  async function fetchAddons() {
    let response = await axios.get("http://127.0.01:8000/api/addon/all/", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    setAddons(response.data);
  }

  function addNewAddon(addon) {
    let tempAddons = [addon, ...addons];
    setAddons(tempAddons);
  }

  function deleteAddon(id) {
    fetch(`http://127.0.01:8000/api/addon/${id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    }).then(() => {
      fetchAddons();
    });
  }

  function selectAddon(i) {
    let item = addons[i];
    console.log(item);
    console.log(addons);
    setAddon_Name(item.addon_name);
    setAddon_Description(item.addon_description);
    setAddon_Price(item.addon_price);
    setAddon_id(item.id);
  }

  function updateAddon() {
    let item = { addon_name, addon_description, addon_price };
    console.warn("item", item);
    fetch(`http://127.0.01:8000/api/addon/${addon_id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(item),
    }).then(() => {
      fetchAddons();
    });
    setAddon_Name("");
    setAddon_Description("");
    setAddon_Price("");
  }

  return (
    <div>
      <h1>{user.first_name}, here is a list of available addons!</h1>
      <div className="grid-container">
        <div className="item2">
          <div className="container">
            <div className="border">
              <Addon addNewAddonProperty={addNewAddon} />
            </div>
          </div>
        </div>
        <div className="item3"></div>
        <div className="item4">
          <div className="container">
            <div className="border">
              <div className="form">
                <input
                  type="text"
                  placeholder="Addon"
                  value={addon_name}
                  onChange={(e) => {
                    setAddon_Name(e.target.value);
                  }}
                />
                <input
                  type="text"
                  placeholder="Description"
                  value={addon_description}
                  onChange={(e) => {
                    setAddon_Description(e.target.value);
                  }}
                />
                <input
                  type="text"
                  placeholder="Price"
                  value={addon_price}
                  onChange={(e) => {
                    setAddon_Price(e.target.value);
                  }}
                />
                <button onClick={updateAddon}>Update</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <table cellPadding={5} cellSpacing={5} className="container">
          <tbody>
            <tr>
              <td>Addon</td>
              <td>Description</td>
              <td>Price</td>
            </tr>
            {addons.map((addon, i) => (
              <tr key={i}>
                <td>{addon.addon_name}</td>
                <td>{addon.addon_description}</td>
                <td>${addon.addon_price}</td>
                {/* <td>
                  <button onClick={() => deleteAddon(addon.id)}>Delete</button>
                </td> */}
                <td>
                  <button onClick={() => selectAddon(i)}>Update</button>
                </td>
                <td>
                  {/* <button onClick={() => deleteCustomer(customer.id)}>
                    Delete
                  </button> */}
                  <a
                    href="#"
                    className="myButton"
                    onClick={() => deleteAddon(addon.id)}
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

export default AddonPage;
