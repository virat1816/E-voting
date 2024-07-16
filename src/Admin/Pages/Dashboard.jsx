import * as React from "react";
import { Grid, ListItem, Box, CircularProgress } from "@mui/joy";
import DataTable from "../../Atoms/DataTable";
import { useSelector } from "react-redux";
import { FaPeopleGroup, FaUser } from "react-icons/fa6";
import { BsInboxesFill } from "react-icons/bs";
import ProgressBarCard from "../../components/ProgressBarCard";

const Dashboard = () => {
  // Redux hooks
  const { party, election, user, vote, isLoading, error } = useSelector(
    (state) => state.admin
  );
  function calculatePartyVotes(data) {
    const partyVotes = {};
    // Filter out entries where the us    er has voted for a party
    const votedEntries = data.filter(
      (entry) => entry.party !== null && entry.election !== null
    );
    // Iterate over voted entries
    votedEntries.forEach((entry) => {
      const { party } = entry;
      if (party.party_name in partyVotes) {
        partyVotes[party.party_name]++;
      } else {
        partyVotes[party.party_name] = 1;
      }
    });
    return partyVotes;
  }

  const partyVotes = calculatePartyVotes(vote);

  // If error, display error message
  if (error) {
    return error;
  }

  // Atomic Table configuration
  const columns = [
    {
      id: "img",
      label: "Party Logo",
      minWidth: 170,
      align: "center",
    },
    {
      id: "party",
      label: "Party Name",
      minWidth: 170,
      align: "center",
    },
    {
      id: "votes",
      label: "Votes",
      minWidth: 100,
      align: "center",
    },
  ];

  const rows = party?.map((party) => ({
    id: party._id || "null",
    img: party.party_logo || "null",
    party: party.party_name || "null",
    votes: partyVotes[party.party_name] || 0, // Set votes to 0 if party has no votes
  }));

  // Function to handle delete action
  const handleDelete = () => {
    console.log("delete");
  };

  // Function to handle update action
  const handleUpdate = () => {
    console.log("Update");
  };

  return (
    <>
      {/* Display loading indicator if data is loading */}
      {isLoading ? (
        <div className="d-flex justify-content-center align-items-center h-100 w-100 ">
          <CircularProgress />
        </div>
      ) : (
        <>
          <Grid container spacing={19} columns={12} sx={{ flexGrow: 1 }}>
            <Grid xs={4}>
              <ListItem>
                <ProgressBarCard
                  progressValue={party.length * 2}
                  icon={<FaPeopleGroup />}
                  title="TOTAL PARTY"
                  amount={party.length}
                />
              </ListItem>
            </Grid>
            <Grid xs={4}>
              <ListItem>
                <ProgressBarCard
                  icon={<BsInboxesFill />}
                  progressValue={election.length * 2}
                  title="TOTAL ELECTION"
                  amount={election.length}
                />
              </ListItem>
            </Grid>
            <Grid xs={4}>
              <ListItem>
                <ProgressBarCard
                  icon={<FaUser />}
                  progressValue={user.length * 2}
                  title="TOTAL VOTER"
                  amount={user.length}
                />
              </ListItem>
            </Grid>
          </Grid>
          {/* DataTable */}
          <Box mt={5}>
            <DataTable columns={columns} rows={rows} height={430} />
          </Box>
        </>
      )}
    </>
  );
};

export default Dashboard;
