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
    const fetchAddons = async () => {
      try {
        let response = await axios.get("http://127.0.0.1:8000/api/addon/all/", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        setAddons(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchAddons();
  }, [token]);

  function addNewAddon(addon) {
    let tempAddons = [addon, ...addons];
    setAddons(tempAddons);
  }
  return (
    <div className="container">
      <h1>{user.first_name}, here is a list of available addons!</h1>
      <Addon addNewAddonProperty={addNewAddon} />
      {addons &&
        addons.map((addon) => (
          <p key={addon.id}>
            {addon.addon_name} ${addon.addon_price}
          </p>
        ))}
    </div>
  );
};

export default AddonPage;
