import { IInventory, IProduct } from "@/types/data";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  addProduct,
  createInventory,
  deleteProduct,
  updateInventory,
} from "../appwrite/api";
import { QueryKeys } from "./queryKeys";

export const useAddProduct = () => {
  const QueryClient = useQueryClient();
  return useMutation({
    mutationFn: (
      product: Omit<IProduct, "image"> & { image?: File | undefined }
    ) => addProduct(product),
    onSuccess: () => {
      toast.error("Product added successfully");
      QueryClient.invalidateQueries({
        queryKey: [QueryKeys.SEARCH],
      });
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });
};

export const useCreateInventory = (productId: string) => {
  const QueryClient = useQueryClient();
  return useMutation({
    mutationFn: (inventory: IInventory) => createInventory(inventory),
    onSuccess: () => {
      toast.success("Inventory created successfully");
      QueryClient.invalidateQueries({
        queryKey: [QueryKeys.PRODUCTS, productId],
      });
      QueryClient.invalidateQueries({
        queryKey: [QueryKeys.SEARCH],
      });
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });
};

export const useUpdateInventory = (productId: string) => {
  const QueryClient = useQueryClient();
  return useMutation({
    mutationFn: (inventory: IInventory) => updateInventory(inventory),
    onSuccess: () => {
      toast.success("Inventory updated successfully");
      QueryClient.invalidateQueries({
        queryKey: [QueryKeys.PRODUCTS, productId],
      });
      QueryClient.invalidateQueries({
        queryKey: [QueryKeys.SEARCH],
      });
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });
};

export const useDeleteProduct = () => {
  return useMutation({
    mutationFn: (id: string) => deleteProduct(id),
    onSuccess: () => {
      toast.success("Product deleted successfully");
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });
};
