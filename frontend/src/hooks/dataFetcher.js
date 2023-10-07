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
  const { data, error, isLoading, mutate } = useSWR(
    `/category/user/${userId}`,
    fetcher
  );

  return {
    categories: data?.categories,
    isLoading,
    isError: error,
    mutate
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
  const { data, error, isLoading, mutate } = useSWR(
    `/note/user/${userId}`,
    fetcher
  );

  return {
    notes: data?.notes,
    isLoading,
    isError: error,
    mutate
  };
}

export { useCategories, useUserCategories, useNotes, useUserNotes };
