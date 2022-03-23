import { FC, useEffect, useState } from "react";
import { Box, Container, CssBaseline, Divider } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import { getCountryCaseData, getGlobalCaseData } from "./api";
import { CountryPicker, Chart, Footer, Hero, Stats } from "./components";
import { CaseData } from "./interfaces";

const App: FC = () => {
  const [globalCaseData, setGlobalCaseData] = useState<CaseData>({
    confirmed: 0,
    deaths: 0,
    lastUpdate: new Date(),
  });
  const [countryCaseData, setCountryCaseData] = useState<CaseData>({
    confirmed: 0,
    deaths: 0,
    lastUpdate: new Date(),
  });
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [isDarkMode, setIsDarkMode] = useState<boolean>(
    useMediaQuery("(prefers-color-scheme: dark)")
  );

  const theme = createTheme({
    palette: {
      mode: isDarkMode ? "dark" : "light",
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      const [data, error]: any = await getGlobalCaseData();

      if (error) {
        setGlobalCaseData({
          confirmed: 0,
          deaths: 0,
          lastUpdate: new Date(),
        });
      } else {
        setGlobalCaseData(data);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const [data, error]: any = await getCountryCaseData(selectedCountry);

      if (error) {
        setCountryCaseData({
          confirmed: 0,
          deaths: 0,
          lastUpdate: new Date(),
        });
      } else {
        setCountryCaseData(data);
      }
    };

    fetchData();
  }, [selectedCountry]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={(theme) => ({
          minHeight: "100vh",
          bgcolor: theme?.palette?.action?.hover,
        })}
      >
        <Container
          sx={{
            py: 2,
          }}
        >
          <Hero isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
          <Divider sx={{ py: 2 }} />
          <Stats title="Global" caseData={globalCaseData} />
          <Chart />
          <Divider sx={{ py: 2 }} />
          <CountryPicker
            selectedCountry={selectedCountry}
            setSelectedCountry={setSelectedCountry}
          />
          <Stats title={selectedCountry} caseData={countryCaseData} />
          <Divider sx={{ py: 2 }} />
          <Footer />
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default App;
