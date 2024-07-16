import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Login from "./components/Login";
import AdminLogin from "./components/AdminLogin";
import Dashboard from "./Admin/Pages/Dashboard";
import Election from "./Admin/Pages/Election";
import Party from "./Admin/Pages/Party";
import User from "./Admin/Pages/User";
import AdminNav from "./Admin/Header/AdminNav";
import UserNav from "./User/Header/UserNav";
import Home from "./User/Pages/Home";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchData } from "./Redux-Toolkit/Slice/AdminSlice";
import Connection from "./Admin/Pages/Connection";
import Votes from "./Admin/Pages/Votes";

const getRole = () => localStorage.getItem("role");

const App = () => {
  const role = getRole();
  const location = useLocation();

  const dispatch = useDispatch();



  const isAdmin = role === "admin";
  const isUser = role === "user";
  const isLoginPage = location.pathname === "/";

  useEffect(() => {
    if (role) {
      const dataTypes = ["party", "election", "connection", "user", "vote"];
      const endpoints = [
        process.env.REACT_APP_PARTY_GET_REQ,
        process.env.REACT_APP_ELECTION_GET_REQ,
        process.env.REACT_APP_PARTYLIST_GET_REQ,
        process.env.REACT_APP_USER_GET_REQ,
        process.env.REACT_APP_VOTE_GET_REQ,
      ];
      dataTypes.forEach((dataType, index) => {
        dispatch(fetchData({ dataType, endpoint: endpoints[index] }));
      });
    }
  }, [role, dispatch]);
  
  if (!role || role === "") {
    return (
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
      </Routes>
    );
  }

  return (
    <>
      {isAdmin && <AdminNav />}
      {isUser && <UserNav />}
      <div
        className="container"
        style={{
          maxWidth: "1150px",
          padding: "30px 40px 40px",
          height: "100vh",
          marginLeft: "310px",
        }}
      >
        <Routes>
          {isAdmin && (
            <>
              <Route path="*" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/party" element={<Party />} />
              <Route path="/election" element={<Election />} />
              <Route path="/connection" element={<Connection />} />
              <Route path="/user" element={<User />} />
              <Route path="/votes" element={<Votes />} />
            </>
          )}
          {isUser && (
            <>
              <Route path="/home" element={<Home />} />
              <Route path="/profile" element={<Home />} />
            </>
          )}
        </Routes>
      </div>
    </>
  );
};

export default App;
