import { FC } from "react";
import { Box, Link, Typography } from "@mui/material";

const Footer: FC = () => {
  return (
    <Box component="footer" sx={{ pt: 4, pb: 2 }}>
      <Typography align="center">
        {`Data source by `}
        <Link
          href="https://github.com/mathdroid/covid-19-api"
          underline="hover"
        >
          mathdroid's API
        </Link>
        {` | Copyright © ${new Date()?.getFullYear()} `}
        <Link href="#" underline="hover">
          Calvary Karamoy
        </Link>
      </Typography>
    </Box>
  );
};

export default Footer;
