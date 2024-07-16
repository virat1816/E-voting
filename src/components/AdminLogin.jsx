import React, { useRef, useState } from "react";
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

function AdminLogin() {
  const nameRef = useRef(null);
  const passwordRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [inputsDisabled, setInputsDisabled] = useState(false); // State variable to track input fields disabled state

  const handleSubmit = async () => {
    setLoading(true);
    setInputsDisabled(true); // Disable input fields when the login button is clicked

    const data = {
      name: nameRef.current.value,
      password: passwordRef.current.value,
    };

    if (!data.name || !data.password) {
      setLoading(false);
      showAlert("error", "Please complete all fields");
      setInputsDisabled(false); // Enable input fields if validation fails
      return;
    }

    try {
      const res = await axios.post(
        process.env.REACT_APP_BASE_URL + "login/admin",
        data
      );
      if (res.status === 200) {
        localStorage.setItem("role", "admin");
        showAlert("success", "Login Successfully", () => {
          setTimeout(() => {
            window.location.href = "/dashboard";
          }, 600);
        });
        nameRef.current.value = "";
        passwordRef.current.value = "";
      } else {
        showAlert("error", "Please check name and password");
        setInputsDisabled(false); // Enable input fields if login fails
      }
    } catch (error) {
      showAlert("error", "Please check name and password");
      console.error(error);
      setInputsDisabled(false); // Enable input fields if login fails
    }
    setLoading(false);
  };

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

  const handleUserRole = () => {
    window.location.href = "/login";
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
                  Admin Sign in
                </Typography>
                <div>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    inputRef={nameRef}
                    label="Name"
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
                    disabled={loading || inputsDisabled} // Disable button when loading or input fields are disabled
                  >
                    {loading ? "Signing In..." : "Sign In"}
                  </Button>
                  <Button
                    onClick={handleUserRole}
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    disabled={loading}
                  >
                    User Login
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

export default AdminLogin;
