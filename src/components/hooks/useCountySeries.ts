import { useQuery } from "react-query";
import { getRoSeries } from "../../api/seriesService";
import { getRoCountiesSeries } from "../../api/countySeriesService";

export const useCountySeries = () => {
  return useQuery(
    "county-stats",
    async () => {
      const { data } = await getRoCountiesSeries();

      return data;
    },
    {
      refetchInterval: 60 * 60 * 60,
    }
  );
};
