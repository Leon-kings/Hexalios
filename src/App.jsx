/* eslint-disable no-unused-vars */
import React from "react";
import "./App.css";
import { Navbar } from "./components/nav/Navbar";
import { Footer } from "./components/footer/Footer";
import { ProductsPage } from "./pages/products/Products";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import Home from "./pages/home/Home";
import { NotFound } from "./components/not found/NotFound";
import { Services } from "./pages/services/Services";
import { ShoesProducts } from "./pages/products/ShoesProduct";
import { About } from "./pages/about/About";
import { Contact } from "./pages/contacts/Contacts";
import { Testimony } from "./pages/testimony/Testimony";
import { Login } from "./pages/login/Login";

// Private Route component
const PrivateRoute = ({ children, isAuthenticated }) => {
  if (!isAuthenticated) {
    // You can redirect to login page instead if you have one
    return <Navigate to="/00832/7282" replace />;
  }
  return children;
};

export default function App() {
  // In a real app, this would come from your auth state/context/redux
  const isAuthenticated = false; // Change this based on your auth logic

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/78318" element={<Services />} />
        <Route path="/89309" element={<ShoesProducts />} />
        <Route path="/68329" element={<About />} />
        <Route path="/63819" element={<Contact />} />
        <Route path="/89213" element={<Testimony />} />
        <Route path="/00832/7282" element={<Login />} />
        <Route
          path="/894202"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <ProductsPage />
            </PrivateRoute>
          }
        />
        {/* Catch-all route for 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}
