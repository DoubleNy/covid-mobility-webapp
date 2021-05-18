import { useQuery } from "react-query";
import { getRoSeries } from "../../api/seriesService";

export const useSeries = () => {
  return useQuery(
    "stats",
    async () => {
      const { data } = await getRoSeries();

      return data;
    },
    {
      refetchInterval: 60 * 60 * 60,
    }
  );
};
