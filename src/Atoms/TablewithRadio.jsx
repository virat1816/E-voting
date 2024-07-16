import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Radio,
  Button,
} from "@mui/material";
import { pink } from "@mui/material/colors";
import { Box } from "@mui/joy";

const TablewithRadio = ({ data, Output }) => {
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedData, setSelectedData] = useState(null);

  const handleRowSelect = (rowId, rowData) => {
    setSelectedRow(rowId);
    setSelectedData(rowData);
  };

  const handleSubmit = () => {
    // Handle submission of selected data
    if (selectedData) {
      Output(selectedData);
      // Reset selected row and data after submission
      setSelectedRow(null);
      setSelectedData(null);
    } else {
    }
  };

  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ textAlign: "center" }}>Party Logo</TableCell>
              <TableCell style={{ textAlign: "center" }}>Election</TableCell>
              <TableCell style={{ textAlign: "center" }}>Party Name</TableCell>
              <TableCell style={{ textAlign: "center" }}>Select</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow
                key={row.id}
                onClick={() => handleRowSelect(row.id, row)}
                hover
                selected={selectedRow === row.party_id}
              >
                <TableCell style={{ textAlign: "center" }}>
                  <img
                    style={{ width: "50px" }}
                    src={row.partylogo}
                    alt="Loading..."
                  />
                </TableCell>
                <TableCell style={{ textAlign: "center" }}>
                  {row.election_name}
                </TableCell>
                <TableCell style={{ textAlign: "center" }}>
                  {row.party}
                </TableCell>
                <TableCell
                  style={{ textAlign: "center", width: "200px" }}
                  padding="checkbox"
                >
                  <Radio
                    sx={{
                      color: pink[800],
                      "&.Mui-checked": {
                        color: pink[600],
                      },
                    }}
                    checked={selectedRow === row.id}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box mt={4} sx={{ display: "flex", flexDirection: "row-reverse" }}>
        <Button variant="contained" onClick={handleSubmit}>
          Submit
        </Button>
      </Box>
    </>
  );
};

export default TablewithRadio;
