import { IProductDocument } from "@/types/data"; // Assuming IProduct is imported from your types
import { create } from "zustand";

// Combine IProduct and Models.Document using TypeScript's intersection

type IProductList = {
  products: IProductDocument[]; // Products will now be of the merged type
  setProducts: (products: IProductDocument[]) => void;
  addProduct: (product: IProductDocument) => void;
  removeProduct: (productId: string) => void;
  query: string;
  setQuery: (query: string) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
};

export const useProductList = create<IProductList>((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
  addProduct: (product) =>
    set((state) => ({
      products: [product, ...state.products],
    })),

  removeProduct: (productId) =>
    set((state) => ({
      products: state.products.filter((product) => product.$id !== productId),
    })),

  loading: true,
  setLoading: (loading) => set({ loading }),

  // Search
  query: "",
  setQuery: (query) => set({ query: query }),
}));

type IDefaultValue = {
  description: string;
  name: string;
  sku: string;
  price: number;
  volume: number;
  flavor: string;
  image: string;
  imageId: string;
};

export const useDefaultValue = create<IDefaultValue>((set) => ({
  description:
    "A product is an item or service designed to meet the needs or desires of consumers. It can be physical, like clothing or electronics, or intangible, such as software or consulting services. Products are created to provide value by solving problems or enhancing the customer’s experience.",
  name: "Vape Vanilla",
  sku: "",
  price: 0,
  volume: 0,
  flavor: "",
  image: "",
  imageId: "",
}));

type ICategory = {
  categories: string[];
  setCategories: (categories: string[]) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
};

export const useCategoriesStore = create<ICategory>((set) => ({
  categories: [],
  setCategories: (categories) => set({ categories }),
  loading: true,
  setLoading: (loading) => set({ loading }),
}));
