import React, { useEffect } from "react";
import { Box, Grid } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import DataTable from "../../Atoms/DataTable";
import AddButton from "../../Atoms/Button";
import { useDispatch, useSelector } from "react-redux";
import { deleteData, postData } from "../../Redux-Toolkit/Slice/AdminSlice";
import Swal from "sweetalert2";

const Votes = () => {
  // Get user data from Redux store
  const data = useSelector((state) => state.admin.vote);
  let dispatch = useDispatch();

  // Define columns for DataTable
  const columns = [
    { id: "cardNo", label: "CardNo", minWidth: 170, align: "center" },
    { id: "username", label: "Name", minWidth: 170, align: "center" },
    { id: "partyname", label: "Party Name", minWidth: 170, align: "center" },
    { id: "election", label: "Election Name", minWidth: 170, align: "center" },
  ];

  // Map user data for DataTable rows, handle potential null data
  const rows = data?.map((user) => ({
    id: user?._id,
    cardNo: user?.user?.cardNo || "null", // Handle undefined by defaulting to "null"
    username: user?.user?.name || "null", // Handle undefined by defaulting to "null"
    partyname: user?.party?.party_name || "null", // Handle undefined by defaulting to "null"
    election: user?.election?.election_name || "null", // Handle undefined by defaulting to "null"
  }));

  // Dummy function for handling deletion and update (not implemented)
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
      title: "Vote deleted successfully",
    });
    dispatch(
      deleteData({
        endpoint: process.env.REACT_APP_VOTE_DELETE_REQ,
        dataType: "vote",
        id,
      })
    );
  };
  const handleUpdate = () => {};

  return (
    <>
      <Box mt={2}>
        {/* DataTable */}
        <DataTable
          columns={columns}
          rows={rows}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
          height={600}
        />
      </Box>
    </>
  );
};

export default Votes;
