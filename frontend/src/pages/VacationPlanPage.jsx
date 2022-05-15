import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import axios from "axios";
import AddVacationPlan from "../components/AddVacationPlan";
import SearchBar from "../components/SearchBar";
import { Link } from "react-router-dom";

const VacationPlanPage = (props) => {
  // The "user" value from this Hook contains the decoded logged in user information (username, first name, id)
  // The "token" value is the JWT token that you will send in the header of any request requiring authentication
  //TODO: Add an AddCars Page to add a car for a logged in user's garage
  const [user, token] = useAuth();
  const [vacationPlans, setVacationPlans] = useState([]);

  useEffect(() => {
    fetchVacationPlans();
  }, []);
  async function fetchVacationPlans() {
    let response = await axios.get(
      "http://127.0.01:8000/api/vacation_plan/all/",
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    setVacationPlans(response.data);
  }

  function addVacationPlan() {
    fetchVacationPlans();
  }

  function deleteVacationPlan(id) {
    fetch(`http://127.0.01:8000/api/vacation_plan/${id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    }).then(() => {
      fetchVacationPlans();
    });
  }

  return (
    <div>
      <div>
        <h1>
          {user.first_name}, here is a list of vacation plans for your
          customers!
        </h1>
      </div>

      <div className="grid-container">
        <div className="item3">
          <div className="container">
            <div className="border">
              <AddVacationPlan addNewVacationPlanProperty={addVacationPlan} />
            </div>
          </div>
        </div>
        <div className="item2"></div>
        <div className="item4"></div>
      </div>

      <div>
        <table cellPadding={5} cellSpacing={5} className="container">
          <div>
            <tbody>
              <tr>
                <td>Customer Name</td>
                <td>Hotel</td>
                <td>Park</td>
                <td>Addon</td>
                <td>Travelers</td>
                <td>Start Date</td>
                <td>Total Days</td>
              </tr>
              {vacationPlans.map((vacationPlan, i) => (
                <tr key={i}>
                  <td>
                    {vacationPlan.customer.first_name}{" "}
                    {vacationPlan.customer.last_name}{" "}
                  </td>
                  <td>{vacationPlan.hotel.hotel_name}</td>
                  <td>{vacationPlan.park.park_name}</td>
                  <td>{vacationPlan.addon.addon_name}</td>
                  <td>{vacationPlan.total_travelers}</td>
                  <td>{vacationPlan.start_date}</td>
                  <td>{vacationPlan.total_days}</td>

                  <td>
                    <a
                      href="http://127.0.0.1:8000/api/vacation_plan/pdf/"
                      className="pdf"
                    >
                      PDF
                    </a>
                  </td>
                  <td>
                    <a
                      href="#"
                      className="myButton"
                      onClick={() => deleteVacationPlan(vacationPlan.id)}
                    >
                      Delete
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </div>
        </table>
      </div>
    </div>
  );
};

export default VacationPlanPage;
