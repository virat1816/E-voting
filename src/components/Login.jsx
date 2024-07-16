import React, { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../Redux-Toolkit/Slice/AdminSlice";

function Login() {
  // Refs for input fields
  const nameRef = useRef(null);
  const passwordRef = useRef(null);

  // State to manage loading status
  const [loading, setLoading] = useState(false);
  // State to manage input fields and button disabled status
  const [inputsDisabled, setInputsDisabled] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  // Redux dispatch
  const dispatch = useDispatch();

  // Fetch vote data from server
  useEffect(() => {
    dispatch(
      fetchData({
        dataType: "vote",
        endpoint: process.env.REACT_APP_VOTE_GET_REQ,
      })
    );
  }, []);

  // Select vote data from Redux store
  const voteData = useSelector((state) => state.admin.vote);

  // Function to handle form submission
  const handleSubmit = async () => {
    // Set loading state to true when form is submitted
    setLoading(true);
    setInputsDisabled(true); // Disable input fields when the login button is clicked
    setButtonDisabled(true); // Disable login button when the login button is clicked

    // Get input values from refs
    const data = {
      cardNo: nameRef.current.value,
      password: passwordRef.current.value,
    };

    // Validate input fields
    if (!data.cardNo || !data.password) {
      setLoading(false); // Reset loading state
      // Show error alert if any field is empty
      showAlert("error", "Please complete all fields");
      nameRef.current.value = "";
      passwordRef.current.value = "";
      setInputsDisabled(false); 
      setButtonDisabled(false); 
      return;
    }

    try {
      // Make POST request to user login endpoint
      const res = await axios.post(
        process.env.REACT_APP_BASE_URL + "login/user",
        data
      );
      if (res.status === 200) {
        if (!voteData.find((val) => val.user?.cardNo === data.cardNo)) {
          // Set login info to localStorage
          localStorage.setItem("role", "user");
          localStorage.setItem("userData", JSON.stringify(res.data.data));

          // Show success alert on successful login
          showAlert("success", "Login Successfully", () => {
            setTimeout(() => {
              window.location.href = "/home";
            }, 600);
          });

          // Clear input fields after successful login
          nameRef.current.value = "";
          passwordRef.current.value = "";
        } else {
          // Show error alert if user has already voted
          showAlert("error", "You have already voted");
          nameRef.current.value = "";
          passwordRef.current.value = "";
        }
      } else {
        // Show error alert if login fails
        showAlert("error", "Please check VoterID and password");
        nameRef.current.value = "";
        passwordRef.current.value = "";
      }
    } catch (error) {
      // Show error alert if request fails
      showAlert("error", "Please check VoterID and password");
      console.error(error);
    }
    setLoading(false);
    setInputsDisabled(false); // Enable input fields after login attempt
    setButtonDisabled(false); // Enable login button after login attempt
  };

  // Function to handle admin role redirection
  const handleAdminRole = () => {
    // Redirect to admin login page
    window.location.href = "/adminlogin";
  };

  // Function to show alert
  const showAlert = (icon, title, callback) => {
    const Toast = Swal.mixin({
      toast: true,
      position: "top",
      showConfirmButton: false,
      timer: 1000,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });
    Toast.fire({
      icon: icon,
      title: title,
    }).then(() => {
      if (callback) callback();
    });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="left-side col-6 d-flex justify-content-center align-items-center">
          <h1>E-Voting</h1>
        </div>
        <div className="right-side col-6">
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: "100vh" }}
          >
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <Box
                sx={{
                  marginTop: 8,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  User Sign in
                </Typography>
                <div>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    inputRef={nameRef}
                    label="VoterID"
                    name="name"
                    autoFocus
                    disabled={inputsDisabled} // Set disabled attribute based on state variable
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    inputRef={passwordRef}
                    label="Password"
                    type="password"
                    id="password"
                    disabled={inputsDisabled} // Set disabled attribute based on state variable
                  />
                  <Button
                    onClick={handleSubmit}
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    disabled={loading || buttonDisabled} // Disable button when loading or disabled
                  >
                    {loading ? "Signing In..." : "Sign In"}{" "}
                    {/* Show loading text when signing in */}
                  </Button>
                  <Button
                    onClick={handleAdminRole}
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Admin Login
                  </Button>
                </div>
              </Box>
            </Container>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
