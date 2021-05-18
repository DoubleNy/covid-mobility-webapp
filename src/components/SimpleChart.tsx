import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import moment from "moment";
import { defaultDateFormat } from "../commonlib/constants";
import { CATEGORY } from "./Home";
import { Box, CircularProgress } from "@material-ui/core";

interface SimpleChartProps {
  series?: any;
  isLoading: boolean;
  config?: any;
}

export const SimpleChart = ({
  series,
  isLoading,
  config,
}: SimpleChartProps) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      {!isLoading && series ? (
        <LineChart width={500} height={300} data={series}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 12 }}
            tickFormatter={(date) => moment(date).format(defaultDateFormat)}
          />
          <YAxis />
          <Tooltip />
          <Legend />
          {!config[CATEGORY.RETAIL] && (
            <Line
              type="monotone"
              dataKey={CATEGORY.RETAIL}
              stroke="#393E41"
              strokeWidth={2}
              dot={false}
            />
          )}
          {!config[CATEGORY.GROCERY] && (
            <Line
              type="monotone"
              dataKey={CATEGORY.GROCERY}
              stroke="#587B7F"
              strokeWidth={2}
              dot={false}
            />
          )}

          {!config[CATEGORY.PARKS] && (
            <Line
              type="monotone"
              dataKey={CATEGORY.PARKS}
              stroke="#82ca9d"
              strokeWidth={2}
              dot={false}
            />
          )}

          {!config[CATEGORY.TRANSIT] && (
            <Line
              type="monotone"
              dataKey={CATEGORY.TRANSIT}
              stroke="#E2C044"
              strokeWidth={2}
              dot={false}
            />
          )}

          {!config[CATEGORY.WORKPLACES] && (
            <Line
              type="monotone"
              dataKey={CATEGORY.WORKPLACES}
              stroke="#230C0F"
              strokeWidth={2}
              dot={false}
            />
          )}

          {!config[CATEGORY.RESIDENTIAL] && (
            <Line
              type="monotone"
              dataKey={CATEGORY.RESIDENTIAL}
              stroke="#A2D3C2"
              strokeWidth={2}
              dot={false}
            />
          )}
        </LineChart>
      ) : (
        <Box display="flex" justifyContent="center" alignItems="center">
          <CircularProgress />
        </Box>
      )}
    </ResponsiveContainer>
  );
};
