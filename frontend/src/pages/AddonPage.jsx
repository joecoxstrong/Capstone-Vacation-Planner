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

  return (
    <div className="container">
      <h1>{user.first_name}, here is a list of available addons!</h1>
      <Addon addNewAddonProperty={addNewAddon} />
      <div>
        <table>
          <tbody>
            <tr>
              <td>Addon Name</td>
              <td>Price</td>
            </tr>
            {addons.map((addon, i) => (
              <tr key={i}>
                <td>{addon.addon_name}</td>
                <td>${addon.addon_cost}</td>
                <td>
                  <button onClick={() => deleteAddon(addon.id)}>Delete</button>
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
