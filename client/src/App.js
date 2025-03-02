import React from "react";
import {BrowserRouter, Routes, Route } from "react-router-dom";
import Resto from "./Pages/Resto/Resto";
import Acceuil from "./Pages/Acceuil/Acceuil";
import Login from "./Pages/Login/Login";
import Signup from "./Pages/Signup/Signup";
import Sidebar from "./Components/Sidebar/Sidebar";
import Payement from "./Components/Payement/Payement";
import Reservation from "./Components/Reservation/Reservation";
import Restaurant from "./Components/Restaurant/Restaurant";
import Dashboard from "./Components/Dashboard/Dashboard";
import MesReservations from "./Pages/MesReservations/MesReservations";


const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Acceuil />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/resto" element={<Resto />} />
        <Route path="/mesreservations" element={<MesReservations />} />
        <Route path="/dashboard" element={<Sidebar />} > 
              <Route path="/dashboard/" element={<Dashboard />} />
              <Route path="/dashboard/restaurant" element={<Restaurant />} />
              <Route path="/dashboard/reservation" element={<Reservation />} />
              <Route path="/dashboard/payment" element={<Payement />} />
        </Route>
        
      </Routes>
      </BrowserRouter>
      
    </div>
  );
};

export default App;
