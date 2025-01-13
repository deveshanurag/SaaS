import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import Service from "./Pages/Service";
import Pricing from "./Pages/Pracing";
import About from "./Pages/About";
import Signup from "./components/authentication/Signup";
import Login from "./components/authentication/Login";

// import AboutPage from "./components/AboutPage";
const isAuthenticated = () => {
  return localStorage.getItem("userInfo") !== null;
};
const ProtectedRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<HomePage />}></Route>
          {/* <Route exact path="/about" element={<AboutPage />}></Route> */}
          <Route
            exact
            path="/post"
            element={
              <ProtectedRoute>
                <Service />
              </ProtectedRoute>
            }
          ></Route>

          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/price" element={<Pricing />} />
          <Route exact path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
