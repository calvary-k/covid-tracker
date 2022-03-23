import { FC } from "react";
import { Box, Grid, Typography } from "@mui/material";

import { CaseData } from "../../interfaces";
import StatsCard from "./StatsCard";

interface StatsProps {
  title?: string;
  caseData?: CaseData;
}

const Stats: FC<StatsProps> = (props?) => {
  const {
    title = "",
    caseData = {
      confirmed: 0,
      deaths: 0,
      lastUpdate: new Date(),
    },
  } = props;
  const { confirmed = 0, deaths = 0, lastUpdate = new Date() } = caseData;

  return (
    <Box sx={{ py: 2 }}>
      <Typography align="center" fontWeight="normal" variant="h6">
        {title ? `${title} Case` : "Empty Case"}
      </Typography>
      <Typography
        align="center"
        color="primary"
        gutterBottom
        variant="subtitle1"
      >
        Last updated: {lastUpdate ? lastUpdate?.toLocaleDateString() : ""}
      </Typography>
      <Grid container spacing={3} sx={{ pt: 2 }}>
        <Grid item xs={12} md={6}>
          <StatsCard
            title="Confirmed Cases"
            value={confirmed}
            color="warning.main"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <StatsCard title="Death Cases" value={deaths} color="error" />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Stats;
