// /* eslint-disable no-unused-vars */
// import React from "react";
// import "./App.css";
// import { Navbar } from "./components/nav/Navbar";
// import { Footer } from "./components/footer/Footer";
// import { ProductsPage } from "./pages/products/Products";
// import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
// import Home from "./pages/home/Home";
// import { NotFound } from "./components/not found/NotFound";
// import { Services } from "./pages/services/Services";
// import { ShoesProducts } from "./pages/products/ShoesProduct";
// import { About } from "./pages/about/About";
// import { Contact } from "./pages/contacts/Contacts";
// import { Testimony } from "./pages/testimony/Testimony";
// import { Login } from "./pages/login/Login";
// import { FAQ } from "./components/faq/FAQ";
// import { Dashboard } from "./components/dashboard/admin/Dashboard";
// import { UserManagement } from "./components/dashboard/admin/components/user/UserManagement";
// import { SubscriptionManagement } from "./components/dashboard/admin/components/subscription/SubscriptionManagement";
// import { BookingManagement } from "./components/dashboard/admin/components/booking/BookingManagement";
// import { ContactManagement } from "./components/dashboard/admin/components/contacts/ContactManagement";
// import { OrderManagement } from "./components/dashboard/admin/components/orders/OrderManagement";
// import { SettingsPanel } from "./components/dashboard/admin/components/settings/Settings";
// import { UserDashboard } from "./components/dashboard/user/UserDashboard";
// import { UserDashManagement } from "./components/dashboard/user/components/user/UserDashManagement";
// import { UserSubscriptionManagement } from "./components/dashboard/user/components/subscription/UserDashManagement";
// import { UserContactManagement } from "./components/dashboard/user/components/contact/UserContactManagement";
// import { UserOrderManagement } from "./components/dashboard/user/components/order/UserOrderManagement";

// // Private Route component
// const PrivateRoute = ({ children, isAuthenticated }) => {
//   if (!isAuthenticated) {
//     // You can redirect to login page instead if you have one
//     return <Navigate to="/00832/7282" replace />;
//   }
//   return children;
// };

// export default function App() {
//   // In a real app, this would come from your auth state/context/redux
//   const isAuthenticated = false; // Change this based on your auth logic

//   return (
//     <>
//       <Navbar />
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/78318" element={<Services />} />
//         <Route path="/89309" element={<ShoesProducts />} />
//         <Route path="/68329" element={<About />} />
//         <Route path="/63819" element={<Contact />} />
//         <Route path="/89213" element={<Testimony />} />
//         <Route path="/00832/7282" element={<Login />} />
//         <Route path="/83934/3281" element={<FAQ />} />
//         <Route
//           path="/894202"
//           element={
//             <PrivateRoute isAuthenticated={isAuthenticated}>
//               <ProductsPage />
//             </PrivateRoute>
//           }
//         />
//         <Route path="/83992" element={<Dashboard />} />
//         <Route path="/72822/98011" element={<UserManagement />} />
//         <Route path="/73282/12102" element={<SubscriptionManagement />} />
//         <Route path="/67282/28202" element={<BookingManagement />} />
//         <Route path="/82922/67289" element={<ContactManagement />} />
//         <Route path="/92023/12381" element={<OrderManagement />} />
//         <Route path="/92023" element={<SettingsPanel />} />
//         {/* users */}
//         <Route path="/0892" element={<UserDashboard />} />
//         <Route path="/7282/2820" element={<UserDashManagement />} />
//         <Route path="/8292/2982" element={<UserSubscriptionManagement />} />
//         <Route path="/7233/1719" element={<UserContactManagement />} />
//         <Route path="/0937/8920" element={<UserOrderManagement />} />
//         {/* Catch-all route for 404 */}
//         <Route path="*" element={<NotFound />} />
//       </Routes>
//       <Footer />
//     </>
//   );
// }
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
import { FAQ } from "./components/faq/FAQ";
import { Dashboard } from "./components/dashboard/admin/Dashboard";
import { UserManagement } from "./components/dashboard/admin/components/user/UserManagement";
import { SubscriptionManagement } from "./components/dashboard/admin/components/subscription/SubscriptionManagement";
import { BookingManagement } from "./components/dashboard/admin/components/booking/BookingManagement";
import { ContactManagement } from "./components/dashboard/admin/components/contacts/ContactManagement";
import { OrderManagement } from "./components/dashboard/admin/components/orders/OrderManagement";
import { SettingsPanel } from "./components/dashboard/admin/components/settings/Settings";
import { UserDashboard } from "./components/dashboard/user/UserDashboard";
import { UserDashManagement } from "./components/dashboard/user/components/user/UserDashManagement";
import { UserSubscriptionManagement } from "./components/dashboard/user/components/subscription/UserDashManagement";
import { UserContactManagement } from "./components/dashboard/user/components/contact/UserContactManagement";
import { UserOrderManagement } from "./components/dashboard/user/components/order/UserOrderManagement";

// Private Route component
const PrivateRoute = ({ children, isAuthenticated }) => {
  if (!isAuthenticated) {
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
        <Route path="/83934/3281" element={<FAQ />} />
        <Route
          path="/894202"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <ProductsPage />
            </PrivateRoute>
          }
        />
        
        {/* Protected admin dashboard routes */}
        <Route
          path="/83992"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/72822/98011"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <UserManagement />
            </PrivateRoute>
          }
        />
        <Route
          path="/73282/12102"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <SubscriptionManagement />
            </PrivateRoute>
          }
        />
        <Route
          path="/67282/28202"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <BookingManagement />
            </PrivateRoute>
          }
        />
        <Route
          path="/82922/67289"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <ContactManagement />
            </PrivateRoute>
          }
        />
        <Route
          path="/92023/12381"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <OrderManagement />
            </PrivateRoute>
          }
        />
        <Route
          path="/92023"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <SettingsPanel />
            </PrivateRoute>
          }
        />
        
        {/* Protected user dashboard routes */}
        <Route
          path="/0892"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <UserDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/7282/2820"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <UserDashManagement />
            </PrivateRoute>
          }
        />
        <Route
          path="/8292/2982"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <UserSubscriptionManagement />
            </PrivateRoute>
          }
        />
        <Route
          path="/7233/1719"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <UserContactManagement />
            </PrivateRoute>
          }
        />
        <Route
          path="/0937/8920"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <UserOrderManagement />
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