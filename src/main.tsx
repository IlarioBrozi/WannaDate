import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import "@/main.css";

const Home = React.lazy(() => import("@/pages/Home"));
const DateDay = React.lazy(() => import("@/pages/DateDay"));
const DateType = React.lazy(() => import("@/pages/DateType"));
const Conclusion = React.lazy(() => import("@/pages/Conclusion"));

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <React.Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/WannaDate/" element={<Home />} />
          <Route path="/WannaDate/choose-date-day" element={<DateDay />} />
          <Route path="/WannaDate/choose-date-type" element={<DateType />} />
          <Route path="/WannaDate/conclusion" element={<Conclusion />} />
        </Routes>
      </React.Suspense>
    </BrowserRouter>
  </React.StrictMode>
);
