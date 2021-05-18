import moment from "moment";
import { DEFAULT_RANGE_IN_YEARS } from "./constants";
import { Range } from "./types";

export const getInitialRange = (): Range => {
  const today: Date = new Date();

  return {
    startDate: moment(today).subtract(DEFAULT_RANGE_IN_YEARS, "month").toDate(),
    endDate: today,
  };
};

export const trimName = (name: string) => {
  const startIdx = name.indexOf(" ") + 1;
  return name.slice(startIdx);
};
