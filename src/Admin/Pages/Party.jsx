import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteData,
  fetchData,
  postData,
} from "../../Redux-Toolkit/Slice/AdminSlice";
import DataTable from "../../Atoms/DataTable";
import Button from "@mui/joy/Button";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import { Grid, IconButton, TextField, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Add } from "@mui/icons-material";
import Swal from "sweetalert2";
import { CircularProgress } from "@mui/joy";

const Party = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  const [open, setOpen] = React.useState(false);

  // Redux state selectors
  const data = useSelector((state) => state.admin.party);
  const isLoading = useSelector((state) => state.admin.isLoading);
  // const { fetchDataError, deleteDataError, postDataError } = useSelector(
  //   (state) => state.admin.errors
  // );
  // if(postDataError){
  //   Swal.fire({
  //     icon: "error",
  //     title: "Oops...",
  //     text: postDataError.error,
  //     });
  // }
  // If loading, display loading indicator
  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center h-100 w-100 ">
        <CircularProgress />
      </div>
    );
  }

  // Function to handle form submission for adding party
  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("party_name", event.target.elements["party-name"].value);
    formData.append("party_logo", event.target.elements["party-logo"].files[0]);
    formData.append(
      "short_code",
      event.target.elements["party-short-code"].value
    );

    dispatch(
      postData({
        payload: formData,
        endpoint: process.env.REACT_APP_PARTY_POST_REQ,
        dataType: "party",
      })
    );

    // const Toast = Swal.mixin({
    //   toast: true,
    //   position: "top",
    //   showConfirmButton: false,
    //   timer: 1300,
    //   didOpen: (toast) => {
    //     toast.onmouseenter = Swal.stopTimer;
    //     toast.onmouseleave = Swal.resumeTimer;
    //   },
    // });
    // Toast.fire({
    //   icon: "success",
    //   title: "party added successfully",
    // });

    setOpen(false);
  };

  // Define columns for DataTable
  const columns = [
    {
      id: "img",
      label: "Party Logo",
      minWidth: 170,
      align: "center",
    },
    {
      id: "PartyName",
      label: "Party Name",
      minWidth: 170,
      align: "center",
    },
    {
      id: "PartySCode",
      label: "Party Short-Code",
      minWidth: 170,
      align: "center",
    },
  ];

  // Map data for DataTable rows, handle potential null data
  const filteredData = data.filter((party) =>
    party.party_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const rows = filteredData.map((party) => ({
    id: party?._id,
    PartyName: party?.party_name || "null",
    img: party?.party_logo || "null",
    PartySCode: party?.short_code || "null",
  }));

  // Function to handle deletion of party
  const handleDelete = (id) => {
    console.log("🚀 ~ handleDelete ~ id:", id)
    
    dispatch(
      deleteData({
        endpoint: process.env.REACT_APP_PARTY_DELETE_REQ,
        id,
        dataType: "party",
      })
    );
  };

  // Dummy function for handling update (not implemented)
  const handleUpdate = () => {
    console.log("Update");
  };

  return (
    <>
      {/* Search and Add buttons */}
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <IconButton type="submit" aria-label="search">
            <SearchIcon style={{ fill: "blue" }} />
          </IconButton>
          <TextField
            id="search-bar"
            className="text"
            label="Enter Party Name"
            variant="outlined"
            placeholder="Search..."
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>
        <div>
          <Button
            variant="outlined"
            color="neutral"
            onClick={() => setOpen(true)}
          >
            <Add />
            &nbsp; Add Party
          </Button>
          <Modal
            aria-labelledby="modal-title"
            aria-describedby="modal-desc"
            open={open}
            onClose={() => setOpen(false)}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Sheet
              variant="outlined"
              sx={{
                maxWidth: 500,
                borderRadius: "md",
                p: 3,
                boxShadow: "lg",
              }}
            >
              <ModalClose variant="plain" sx={{ m: 1 }} />
              <Typography
                component="h2"
                id="modal-title"
                level="h4"
                textColor="inherit"
                fontWeight="lg"
                mb={1}
              >
                Add Party
              </Typography>
              <form onSubmit={handleSubmit}>
                <label>Enter Party name</label>
                <TextField
                  className="mb-3"
                  id="party-name"
                  label="Party Name"
                  variant="outlined"
                  fullWidth
                  required
                />
                <label>Enter Party Logo</label>
                <input
                  className="mb-3 p-3 w-100 rounded"
                  style={{ border: "1px solid #c1c2c3" }}
                  type="file"
                  id="party-logo"
                  name="partyLogo"
                  accept="image/*"
                  required
                />
                <label>Enter Party Short-code</label>
                <TextField
                  className="mb-3"
                  id="party-short-code"
                  label="Party Short Code"
                  variant="outlined"
                  fullWidth
                  required
                />
                <Button
                  className="border btn btn-outline-dark"
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  Submit
                </Button>
              </form>
            </Sheet>
          </Modal>
        </div>
      </Grid>
      <Box mt={11}>
        {/* DataTable */}
        <DataTable
          columns={columns}
          rows={rows}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
          height={450}
        />
      </Box>
    </>
  );
};

export default Party;
