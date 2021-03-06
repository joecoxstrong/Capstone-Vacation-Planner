// General Imports
import { Routes, Route } from "react-router-dom";
import "./App.css";
import React, { useState, useEffect } from 'react';
import axios from "axios";
import useAuth from "./hooks/useAuth";
// Pages Imports
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import VacationHomePage from "./pages/HomePage/VacationHomePage";
import CustomerPage from "./pages/CustomerPage";
import HotelPage from "./pages/HotelPage";
import ParksPage from "./pages/ParksPage";
import VacationPlanPage from "./pages/VacationPlanPage";
import AddonPage from "./pages/AddonPage";
import SingleVacationPage from "./pages/SingleVacationPage";

// Component Imports
import Navbar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";

// Util Imports
import PrivateRoute from "./utils/PrivateRoute";

function App() {
  



  
  return (
    <div >
      <Navbar />
      <div className="hero">
       
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              {/* <HomePage /> */}
              <VacationHomePage  />
            </PrivateRoute>
          }
        />
        <Route
          path="/customer/"
          element={
            <PrivateRoute>
              <CustomerPage  />
            </PrivateRoute>
          }
        />
        <Route
          path="/hotel/"
          element={
            <PrivateRoute>
              <HotelPage  />
            </PrivateRoute>
          }
        />
        <Route
          path="/parks/"
          element={
            <PrivateRoute>
              <ParksPage  />
            </PrivateRoute>
          }/>
        <Route
          path="/addon/"
          element={
            <PrivateRoute>
              <AddonPage  />
            </PrivateRoute>
          }/>
          <Route
          path="/vacation_plan/"
          element={
            <PrivateRoute>
              <VacationPlanPage  />
            </PrivateRoute>
          }/>
          <Route
          path="/single_vacation_plan/"
          element={
            <PrivateRoute>
              <SingleVacationPage />
            </PrivateRoute>
          }/>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
      {/* <Footer className="top-space"/> */}

      </div>
      
    </div>
  );
}

export default App;
