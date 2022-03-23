import { FC } from "react";
import { Card, CardContent, Typography } from "@mui/material";
import CountUp from "react-countup";

interface StatsCardProps {
  title?: string;
  value?: number;
  color?: string;
}

const StatsCard: FC<StatsCardProps> = (props?) => {
  const { title = "", value = 0, color = "primary" } = props;

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography align="center" color={color} noWrap variant="h3">
          <CountUp start={0} end={value} duration={1.75} separator="," />
        </Typography>
        <Typography align="center">{title}</Typography>
      </CardContent>
    </Card>
  );
};

export default StatsCard;
