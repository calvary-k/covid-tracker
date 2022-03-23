import { FC } from "react";
import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";

import logo from "../../assets/covid-19.svg";

interface HeroProps {
  isDarkMode?: boolean;
  setIsDarkMode?: (isDarkMode: boolean) => void;
}

const Hero: FC<HeroProps> = (props?) => {
  const { isDarkMode = false, setIsDarkMode = () => {} } = props;

  const handleThemeButtonClick = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <Box
      alignItems="center"
      display="flex"
      flexDirection="column"
      justifyContent="center"
    >
      <img height={100} alt="Logo" src={logo} style={{ margin: "0.7em 0" }} />
      <Typography align="center" gutterBottom variant="h5">
        Covid Tracker
      </Typography>
      <Typography align="center" variant="subtitle1">
        Monitor coronavirus cases in the world.
      </Typography>
      <Tooltip title="Change Theme">
        <IconButton
          size="large"
          onClick={handleThemeButtonClick}
          sx={(theme) => ({
            mt: 2,
            bgcolor: theme?.palette?.background?.paper,
          })}
        >
          {isDarkMode ? <DarkModeRoundedIcon /> : <LightModeRoundedIcon />}
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default Hero;
