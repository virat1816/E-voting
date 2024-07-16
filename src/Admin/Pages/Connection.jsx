import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CircularProgress,
  Box,
  Grid,
  ListItem,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Button,
} from "@mui/material";
import DataTable from "../../Atoms/DataTable";
import {
  fetchData,
  postData,
  deleteData,
} from "../../Redux-Toolkit/Slice/AdminSlice";
import Swal from "sweetalert2";

export default function Connection() {
  // State variables
  const [Election, setElection] = useState("");
  const [Party, setParty] = useState("");
  const [loading, setLoading] = useState(false);

  // Redux selectors
  const Electiondata = useSelector((state) => state.admin.election);
  const Partydata = useSelector((state) => state.admin.party);
  const Connection = useSelector((state) => state.admin.connection);

  // Redux dispatch
  const dispatch = useDispatch();

  // Fetch data on component mount
  useEffect(() => {
    fetchDataWithLoading(process.env.REACT_APP_ELECTION_GET_REQ, "election");
    fetchDataWithLoading(process.env.REACT_APP_PARTY_GET_REQ, "party");
    fetchDataWithLoading(process.env.REACT_APP_PARTYLIST_GET_REQ, "connection");
  }, []);

  // Function to fetch data with loading indicator
  const fetchDataWithLoading = (endpoint, dataType) => {
    setLoading(true);
    dispatch(fetchData({ endpoint, dataType })).then(() => setLoading(false));
  };

  // Function to handle form submission
  const handleSubmit = () => {
    const finaldata = {
      election: Election,
      party: Party,
    };

    // Check if finaldata is empty
    if (!finaldata.election || !finaldata.party) {
      // Display alert if either election or party is empty
      const Toast = Swal.mixin({
        toast: true,
        position: "top",
        showConfirmButton: false,
        timer: 1300,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      Toast.fire({
        icon: "warning",
        title: "please choose Connection",
      });
      return; // Exit the function early
    }

    const Toast = Swal.mixin({
      toast: true,
      position: "top",
      showConfirmButton: false,
      timer: 1300,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });
    Toast.fire({
      icon: "success",
      title: "Connection added successfully",
    });
    setLoading(true);
    dispatch(
      postData({
        payload: finaldata,
        endpoint: process.env.REACT_APP_PARTYLIST_POST_REQ,
        dataType: "connection",
      })
    ).then(() => setLoading(false));
     setElection('')
     setParty('')
  };


  // Columns configuration for DataTable
  const columns = [
    {
      id: "ElectionName",
      label: "Election Name",
      minWidth: 170,
      align: "center",
    },
    {
      id: "Partyname",
      label: "Party Name",
      minWidth: 170,
      align: "center",
    },
  ];

  // Rows configuration for DataTable
  const rows = Connection?.map((Connection) => ({
    ElectionName: Connection?.election?.election_name || "null" ,
    Partyname: Connection?.party?.party_name || "null",
    id: Connection?._id || "null",
  }));

  // Function to handle delete action
  const handleDelete = (id) => {
    const Toast = Swal.mixin({
      toast: true,
      position: "top",
      showConfirmButton: false,
      timer: 1300,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });
    Toast.fire({
      icon: "success",
      title: "Connection deleted successfully",
    });

    setLoading(true);
    dispatch(
      deleteData({
        endpoint: process.env.REACT_APP_PARTYLIST_DELETE_REQ,
        id,
        dataType: "connection",
      })
    ).then(() => setLoading(false));
    
  };

  // Function to handle update action
  const handleUpdate = () => {
    console.log("Update");
  };

  return (
    <>
      {/* Display loading indicator if data is loading */}
      {loading ? (
        <div className="d-flex justify-content-center align-items-center h-100 w-100 ">
          <CircularProgress />
        </div>
      ) : (
        <Grid
          container
          spacing={2}
          mt={4}
          columns={12}
          sx={{ flexGrow: 1, alignItems: "center", justifyContent: "center" }}
        >
          {/* DataTable */}
          <Grid item xs={8}>
            <ListItem>
              <DataTable
                columns={columns}
                rows={rows}
                onDelete={handleDelete}
                onUpdate={handleUpdate}
                height={500}
              />
            </ListItem>
          </Grid>
          {/* Form for selecting party and election */}
          <Grid item xs={4} container direction="column">
            {/* Party dropdown */}
            <Box sx={{ marginBottom: 2 }}>
              <FormControl fullWidth>
                <InputLabel id="party-select-label">Choose Party</InputLabel>
                <Select
                  labelId="party-select-label"
                  id="party-select"
                  value={Party}
                  label="Party"
                  onChange={(event) => setParty(event.target.value)}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {Partydata?.map((val, ind) => (
                    <MenuItem key={ind} value={val._id}>
                      {val?.party_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            {/* Election dropdown */}
            <Box sx={{ marginBottom: 2 }}>
              <FormControl fullWidth>
                <InputLabel id="election-select-label">
                  Choose Election
                </InputLabel>
                <Select
                  labelId="election-select-label"
                  id="election-select"
                  value={Election}
                  label="Election"
                  onChange={(event) => setElection(event.target.value)}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {Electiondata?.map((val, ind) => (
                    <MenuItem key={ind} value={val._id}>
                      {val?.election_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            {/* Submit button */}
            <Button variant="contained" onClick={handleSubmit}>
              Submit
            </Button>
          </Grid>
        </Grid>
      )}
    </>
  );
}
