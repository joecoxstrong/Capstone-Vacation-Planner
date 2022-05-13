import React, { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import axios from "axios";

const AddVacationPlan = (props) => {
  const [user, token] = useAuth();
  const [customer_id, setCustomer_Id] = useState();
  const [hotel_id, setHotel_Id] = useState();
  const [park_id, setPark_Id] = useState();
  const [addon_id, setAddon_Id] = useState();
  const [total_travelers, setTotal_Travelers] = useState("");
  const [start_date, setStart_Date] = useState("");
  const [total_days, setTotal_Days] = useState("");
  const [hotels, setHotels] = useState("");
  const [parks, setParks] = useState("");
  const [customers, setCustomers] = useState("");
  const [addons, setAddons] = useState("");

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

  useEffect(() => {
    const fetchParks = async () => {
      try {
        let response = await axios.get("http://127.0.0.1:8000/api/park/all/", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        setParks(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchParks();
  }, [token]);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        let response = await axios.get("http://127.0.0.1:8000/api/hotel/all/", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        setHotels(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchHotels();
  }, [token]);

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

  function handleSubmit(event) {
    event.preventDefault();
    const addNewVacationPlan = {
      customer_id,
      hotel_id,
      park_id,
      addon_id,
      total_travelers,
      start_date,
      total_days,
    };

    fetch("http://127.0.01:8000/api/vacation_plan/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(addNewVacationPlan),
    }).then(() => {
      console.log({ addNewVacationPlan });
      props.addNewVacationPlanProperty();
    });
  }

  return (
    <div>
      <div>
        <form className="form" onSubmit={handleSubmit}>
          <select onClick={(event) => setCustomer_Id(event.target.value)}>
            {customers &&
              customers.map((customer) => (
                <option
                  key={customer.id}
                  type="number"
                  name="customer_id"
                  value={customer.id}
                >
                  {customer.first_name} {customer.last_name}
                </option>
              ))}
          </select>
          <select onClick={(event) => setHotel_Id(event.target.value)}>
            {hotels &&
              hotels.map((hotel) => (
                <option
                  key={hotel.id}
                  type="number"
                  name="hotel_id"
                  value={hotel.id}
                >
                  {hotel.hotel_name}
                </option>
              ))}
          </select>
          <select onClick={(event) => setPark_Id(event.target.value)}>
            {parks &&
              parks.map((park) => (
                <option
                  key={park.id}
                  type="number"
                  name="park_id"
                  value={park.id}
                >
                  {park.park_name}
                </option>
              ))}
          </select>
          <select onClick={(event) => setAddon_Id(event.target.value)}>
            {addons &&
              addons.map((addon) => (
                <option
                  key={addon.id}
                  type="number"
                  name="addon_id"
                  value={addon.id}
                >
                  {addon.addon_name}
                </option>
              ))}
          </select>

          <input
            placeholder="Number of Travelers"
            type="number"
            name="total_travelers"
            value={total_travelers}
            onChange={(event) => setTotal_Travelers(event.target.value)}
          ></input>
          <input
            placeholder="Start Date"
            type="date"
            name="start_date"
            value={start_date}
            onChange={(event) => setStart_Date(event.target.value)}
          ></input>
          <input
            placeholder="Number of days"
            type="number"
            name="total_days"
            value={total_days}
            onChange={(event) => setTotal_Days(event.target.value)}
          ></input>

          <button type="submit">CREATE PLAN</button>
        </form>
      </div>
    </div>
  );
};

export default AddVacationPlan;
