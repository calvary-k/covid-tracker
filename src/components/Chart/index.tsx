import { FC, useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

import { getDailyCaseData } from "../../api";
import { CaseData } from "../../interfaces";
import { Box, Typography } from "@mui/material";

ChartJS?.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Chart: FC = () => {
  const [dailyCaseData, setDailyCaseData] = useState<CaseData[]>([]);

  const theme = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      const [data, error]: any = await getDailyCaseData();

      if (error) {
        setDailyCaseData([
          {
            confirmed: 0,
            deaths: 0,
            lastUpdate: new Date(),
          },
        ]);
      } else {
        setDailyCaseData(data);
      }
    };

    fetchData();
  }, []);

  return (
    <Box>
      <Line
        data={{
          labels: dailyCaseData?.map((row) =>
            row?.lastUpdate?.toLocaleDateString()
          ),
          datasets: [
            {
              label: "Confirmed",
              data: dailyCaseData?.map((row) => row?.confirmed),
              fill: true,
              borderColor: theme?.palette?.warning?.main,
              backgroundColor: theme?.palette?.warning?.light,
              tension: 0.1,
            },
            {
              label: "Deaths",
              data: dailyCaseData?.map((row) => row?.deaths),
              fill: true,
              borderColor: theme?.palette?.error?.main,
              backgroundColor: theme?.palette?.error?.light,
              tension: 0.1,
            },
          ],
        }}
      />
      <Typography
        align="center"
        color="textSecondary"
        fontWeight="normal"
        variant="subtitle1"
        sx={{ pt: 2 }}
      >
        <em>Last two weeks data</em>
      </Typography>
    </Box>
  );
};

export default Chart;
