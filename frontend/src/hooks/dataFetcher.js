import { fetcher } from "../util/fetcher";
import useSWR from "swr";

function useCategories() {
  const { data, error, isLoading } = useSWR("/category", fetcher);

  return {
    data,
    isLoading,
    isError: error,
  };
}

function useUserCategories(userId) {
  const { data, error, isLoading } = useSWR(
    `/category/user/${userId}`,
    fetcher
  );

  return {
    data,
    isLoading,
    isError: error,
  };
}

function useNotes() {
  const { data, error, isLoading } = useSWR("/note", fetcher);

  return {
    data,
    isLoading,
    isError: error,
  };
}

function useUserNotes(userId) {
  const { data, error, isLoading } = useSWR(
    `/note/user/${userId}`,
    fetcher
  );

  return {
    data,
    isLoading,
    isError: error,
  };
}

export { useCategories, useUserCategories, useNotes, useUserNotes };
