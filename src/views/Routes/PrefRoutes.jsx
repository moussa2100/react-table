import React,{ Suspense } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import LandingPage from "../Components/BuComponents/HomePage/LandingPage";
import Nationality from "../Components/BuComponents/Nationality";

export default function PrefRoutes() {
  return (
    <Suspense fallback={<div> Loading... </div>}>
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/nationality" element={<Nationality />} />
    </Routes>
    </Suspense>
  );
}
