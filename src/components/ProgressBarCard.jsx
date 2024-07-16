import React from "react";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CircularProgress from "@mui/joy/CircularProgress";
import Typography from "@mui/joy/Typography";

const ProgressBarCard = ({ progressValue, title, amount, icon }) => {
  return (
    <Card variant="solid" color="">
      <CardContent orientation="horizontal">
        <CircularProgress size="lg" determinate value={progressValue}>
          {icon}
        </CircularProgress>
        <CardContent>
          <Typography level="body-md">{title}</Typography>
          <Typography level="h2">{amount}</Typography>
        </CardContent>
      </CardContent>
    </Card>
  );
};

export default ProgressBarCard;
