import { fetcher } from "../util/fetcher";
import useSWR from "swr";

function useCategories() {
  const { data, error, isLoading } = useSWR("/category", fetcher);

  return {
    categories: data.categories,
    isLoading,
    isError: error,
  };
}

export {useCategories}