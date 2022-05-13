import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import axios from "axios";
import AddVacationPlan from "../components/AddVacationPlan";
import SearchBar from "../components/SearchBar";

const SingleVacationPage = (props) => {
  const [user, token] = useAuth();
  const [vacationPlans, setVacationPlans] = useState([]);

  useEffect(() => {
    fetchSingleVacation();
  }, []);
  async function fetchSingleVacation() {
    let response = await axios.get(
      `http://127.0.0.1:8000/api/vacation_plan/3/`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    setVacationPlans(response.data);
  }

  //   function generatePDF() {
  //     fetch(`http://127.0.0.1:8000/api/vacation_plan/pdf/`);
  //   }

  return (
    <div>
      <div>
        <h1>{user.first_name}, generate a pdf for this customer!</h1>
      </div>
      <div className="container">
        <table cellPadding={5} cellSpacing={5}>
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
            <tr></tr>

            <tr>
              <td>
                {vacationPlans.customer.first_name}{" "}
                {vacationPlans.customer.last_name}{" "}
              </td>
              <td>{vacationPlans.hotel.hotel_name}</td>
              <td>{vacationPlans.park.park_name}</td>
              <td>{vacationPlans.addon.addon_name}</td>
              <td>{vacationPlans.total_travelers}</td>
              <td>{vacationPlans.start_date}</td>
              <td>{vacationPlans.total_days}</td>
              {/* <td>
                <button onClick={() => generatePDF()}>PDF</button>
              </td> */}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SingleVacationPage;
