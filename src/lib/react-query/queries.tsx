import { useQuery } from "@tanstack/react-query";
import {
  getCategories,
  getCategory,
  getProduct,
  getProducts,
  searchProducts,
} from "../appwrite/api";
import { QueryKeys } from "./queryKeys";

export const useGetProducts = (productsForCategory?: boolean) => {
  return useQuery({
    queryKey: [QueryKeys.PRODUCTS],
    queryFn: getProducts,
    enabled: productsForCategory,
  });
};

export const useGetProduct = (id: string) => {
  return useQuery({
    queryKey: [QueryKeys.PRODUCTS, id],
    queryFn: () => getProduct(id),
  });
};

export const useSearchProducts = (query: string) => {
  return useQuery({
    queryKey: [QueryKeys.SEARCH, query],
    queryFn: () => searchProducts(query),
  });
};

export const useGetCategories = () => {
  return useQuery({
    queryKey: [QueryKeys.CATEGORIES],
    queryFn: () => getCategories(),
  });
};

export const useGetCategory = (id: string) => {
  return useQuery({
    queryKey: [QueryKeys.CATEGORIES, id],
    queryFn: () => getCategory(id),
  });
};
