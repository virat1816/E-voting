import "../../index.css";
import React, { useState } from "react";
import { HiArrowsPointingIn, HiArrowsPointingOut } from "react-icons/hi2";
import { MdDashboard } from "react-icons/md";
import { FaUser } from "react-icons/fa6";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import { RxExit } from "react-icons/rx";
import { Transition } from "react-transition-group";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";

const UserNav = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [open, setOpen] = React.useState(false);

  const handleCollapsedChange = () => {
    setCollapsed(!collapsed);
  };

  //   get User Info
  const getUser = () => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    return userData;
  };
  let userData = getUser();

  //   logOut Meth
  const handleLogout = (event) => {
    window.location.reload();
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div>
      <Sidebar
        style={{ height: "100%", position: "absolute" }}
        collapsed={collapsed}
      >
        <main>
          <Menu className="mb-5">
            {collapsed ? (
              <MenuItem
                icon={<HiArrowsPointingOut />}
                onClick={handleCollapsedChange}
              ></MenuItem>
            ) : (
              <MenuItem
                suffix={<HiArrowsPointingIn />}
                onClick={handleCollapsedChange}
              >
                <div
                  style={{
                    padding: "9px",
                    color: "gray",
                    fontWeight: "bolder",
                    fontSize: 14,
                    letterSpacing: "1px",
                  }}
                >
                  USER
                </div>
              </MenuItem>
            )}
          </Menu>

          <Menu>
            <Link to="/home" style={{ textDecoration: "none", color: "black" }}>
              <MenuItem
                icon={<MdDashboard />}
                className={
                  window.location.pathname.includes("dashboard") ? "active" : ""
                }
              >
                home
              </MenuItem>
            </Link>
          </Menu>
          <Menu>
            <MenuItem
              icon={<FaUser />}
              variant="outlined"
              color="neutral"
              onClick={() => setOpen(true)}
            >
              Profile
            </MenuItem>
            <Transition in={open} timeout={400}>
              {(state) => (
                <Modal
                  keepMounted
                  open={!["exited", "exiting"].includes(state)}
                  onClose={() => setOpen(false)}
                  slotProps={{
                    backdrop: {
                      sx: {
                        opacity: 0,
                        backdropFilter: "none",
                        transition: `opacity 400ms, backdrop-filter 400ms`,
                        ...{
                          entering: { opacity: 1, backdropFilter: "blur(8px)" },
                          entered: { opacity: 1, backdropFilter: "blur(8px)" },
                        }[state],
                      },
                    },
                  }}
                  sx={{
                    visibility: state === "exited" ? "hidden" : "visible",
                  }}
                >
                  <ModalDialog
                    sx={{
                      width: "500px",
                      opacity: 0,
                      transition: `opacity 300ms`,
                      ...{
                        entering: { opacity: 1 },
                        entered: { opacity: 1 },
                      }[state],
                    }}
                  >
                    <DialogTitle className="card-header">
                      User Profile
                    </DialogTitle>
                    <DialogContent>
                      <div className="card border-light mb-3">
                        <div className="card-body">
                          <h5 className="card-title">
                            Name: <b>{userData.name}</b>
                          </h5>
                          <hr />
                          <p className="card-text">
                            <b>father Name:</b>&nbsp;
                            {userData.fatherName}
                          </p>
                          <p className="card-text">
                            <b>Date of Birth</b>&nbsp;
                            {userData.dob}
                          </p>
                          <p className="card-text">
                            <b>part No. and Name</b>&nbsp;
                            {userData.partNoandName}
                          </p>
                          <p className="card-text">
                            <b>Gender :</b>&nbsp;
                            {userData.sex}
                          </p>
                          <p className="card-text">
                            <b>Address :</b>&nbsp;
                            {userData.address}
                          </p>
                        </div>
                      </div>
                    </DialogContent>
                  </ModalDialog>
                </Modal>
              )}
            </Transition>
          </Menu>

          <Menu onClick={handleLogout}>
            <a
              style={{
                textDecoration: "none",
                color: "red",
                fontWeight: "800",
                backgroundColor: "red",
              }}
            >
              <MenuItem icon={<RxExit />}>LOG OUT</MenuItem>
            </a>
          </Menu>
        </main>
      </Sidebar>
    </div>
  );
};

export default UserNav;
