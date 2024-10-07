import { useQuery } from "@tanstack/react-query";
import { getProduct, getProducts, searchProducts } from "../appwrite/api";
import { QueryKeys } from "./queryKeys";

export const useGetProducts = () => {
  return useQuery({
    queryKey: [QueryKeys.PRODUCTS],
    queryFn: getProducts,
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
