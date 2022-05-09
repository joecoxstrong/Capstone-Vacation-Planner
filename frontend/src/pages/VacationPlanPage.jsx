import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";

import axios from "axios";
import AddVacationPlan from "../components/AddVacationPlan";

const VacationPlanPage = () => {
  // The "user" value from this Hook contains the decoded logged in user information (username, first name, id)
  // The "token" value is the JWT token that you will send in the header of any request requiring authentication
  //TODO: Add an AddCars Page to add a car for a logged in user's garage
  const [user, token] = useAuth();
  const [vacationPlans, setVacationPlans] = useState([]);

  useEffect(() => {
    const fetchVacationPlans = async () => {
      try {
        let response = await axios.get(
          "http://127.0.0.1:8000/api/vacation_plan/all/",
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        setVacationPlans(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchVacationPlans();
  }, [token]);

  const fetchVacationPlans = async () => {
    try {
      let response = await axios.get(
        "http://127.0.0.1:8000/api/vacation_plan/all/",
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      setVacationPlans(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  function addVacationPlan() {
    fetchVacationPlans();
  }

  return (
    <div className="container">
      <h1>
        {user.first_name}, here is a list of vacation plans for your customers!
      </h1>

      <AddVacationPlan addNewVacationPlanProperty={addVacationPlan} />
      <div>
        {vacationPlans &&
          vacationPlans.map((vacationPlan) => (
            <>
              <li key={vacationPlan.id}>
                {vacationPlan.customer.first_name}{" "}
                {vacationPlan.customer.last_name}{" "}
                {vacationPlan.hotel.hotel_name} {vacationPlan.park.park_name}{" "}
                {vacationPlan.total_travelers}
                {" Travelers"} {vacationPlan.start_date}
                {" Begin Date"}
                {vacationPlan.total_days}
                {" Days"}
                <button>Update</button>
                <button>PDF</button>
              </li>
            </>
          ))}
      </div>
    </div>
  );
};

export default VacationPlanPage;
