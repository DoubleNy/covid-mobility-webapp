import React, { useEffect, useState } from "react";
import { useSeries } from "./hooks/useSeries";
import { SimpleChart } from "./SimpleChart";
import { Box, CircularProgress, Grid, Typography } from "@material-ui/core";
import RangeDatePicker from "./DatePicker";
import { Range } from "../commonlib/types";
import Card from "./Card/Card";
import { getInitialRange } from "../commonlib/utils";
import { useCountySeries } from "./hooks/useCountySeries";

export enum CATEGORY {
  RETAIL = "retail and recreation",
  GROCERY = "grocery and pharmacy",
  PARKS = "parks",
  TRANSIT = "transit stations",
  WORKPLACES = "workplaces",
  RESIDENTIAL = "residential",
}

const initialConfig = {
  "retail and recreation": false,
  "grocery and pharmacy": false,
  parks: false,
  "transit stations": false,
  workplaces: false,
  residential: false,
};

const Home = () => {
  const { data, isLoading } = useSeries();
  const [filteredData, setFilteredData] = useState();
  const [range, setRange] = useState<Range>();
  const [config, setConfig] = useState(initialConfig);
  const { data: counties, isLoading: isCountiesLoading } = useCountySeries();

  const handleUpdateRange = (range: Range) => {
    if (isLoading) {
      setFilteredData(data);
      return;
    }

    const filtered = data.filter((el: any) => {
      return (
        new Date(el.date) > range.startDate! &&
        new Date(el.date) < range.endDate!
      );
    });

    setRange(range);
    setFilteredData(filtered);
  };

  useEffect(() => {
    handleUpdateRange(range ?? getInitialRange());
  }, [data]);

  const handleOnToggleCardState = (label: CATEGORY) => {
    const currentState = config[label];

    setConfig({
      ...config,
      [label]: !currentState,
    });
  };

  const renderCountyCharts = () => {
    if (isCountiesLoading) return;

    return Object.keys(counties).map((county) => (
      <Box
        py={5}
        pl={5}
        pr={5}
        width="95%"
        style={{
          height: "512px",
        }}
      >
        <Box display="flex" justifyContent="center">
          <Typography variant="h3"> {county} </Typography>
        </Box>
        <SimpleChart
          isLoading={isCountiesLoading}
          series={counties[county]}
          config={config}
        />
      </Box>
    ));
  };

  return (
    <Box>
      <Box pt={5} display="flex" justifyContent="center">
        <Typography variant="h4">Covid Mobility</Typography>
      </Box>
      <Box
        pt={5}
        pl={10}
        pr={10}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        {isLoading || !range ? (
          <CircularProgress />
        ) : (
          <React.Fragment>
            <Box pr={10}>
              <RangeDatePicker
                onChangeRange={handleUpdateRange}
                initialRange={range}
              />
            </Box>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
              spacing={6}
            >
              <Grid item>
                <Card
                  strokeColor="#393E41"
                  label={CATEGORY.RETAIL}
                  isDisabled={config[CATEGORY.RETAIL]}
                  onToggle={() => handleOnToggleCardState(CATEGORY.RETAIL)}
                />
              </Grid>

              <Grid item>
                <Card
                  strokeColor="#587B7F"
                  label={CATEGORY.GROCERY}
                  isDisabled={config[CATEGORY.GROCERY]}
                  onToggle={() => handleOnToggleCardState(CATEGORY.GROCERY)}
                />
              </Grid>

              <Grid item>
                <Card
                  strokeColor="#82ca9d"
                  label={CATEGORY.PARKS}
                  isDisabled={config[CATEGORY.PARKS]}
                  onToggle={() => handleOnToggleCardState(CATEGORY.PARKS)}
                />
              </Grid>

              <Grid item>
                <Card
                  strokeColor="#E2C044"
                  label={CATEGORY.TRANSIT}
                  isDisabled={config[CATEGORY.TRANSIT]}
                  onToggle={() => handleOnToggleCardState(CATEGORY.TRANSIT)}
                />
              </Grid>
              <Grid item>
                <Card
                  strokeColor="#230C0F"
                  label={CATEGORY.WORKPLACES}
                  isDisabled={config[CATEGORY.WORKPLACES]}
                  onToggle={() => handleOnToggleCardState(CATEGORY.WORKPLACES)}
                />
              </Grid>
              <Grid item>
                <Card
                  strokeColor="#A2D3C2"
                  label={CATEGORY.RESIDENTIAL}
                  isDisabled={config[CATEGORY.RESIDENTIAL]}
                  onToggle={() => handleOnToggleCardState(CATEGORY.RESIDENTIAL)}
                />
              </Grid>
            </Grid>
          </React.Fragment>
        )}
      </Box>

      <Box
        py={5}
        pl={5}
        pr={5}
        width="95%"
        style={{
          height: "512px",
        }}
      >
        <Box display="flex" justifyContent="center">
          <Typography variant="h3"> Romania </Typography>
        </Box>
        <SimpleChart
          isLoading={isLoading}
          series={filteredData}
          config={config}
        />
      </Box>
      <React.Fragment>{renderCountyCharts()}</React.Fragment>
    </Box>
  );
};

export default Home;
