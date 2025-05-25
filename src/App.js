import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layouts/Layout"; 
import Home from "./pages/Home/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup"; 
import Dashboard from "./pages/Dashboard"; 
import MoodSelector from "./pages/Home/MoodSelector";
import RecipeDetails from "./components/RecipeDetails";

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/eat-by-mood" element={<MoodSelector />} />
          <Route path="/recipe/:id" element={<RecipeDetails />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
