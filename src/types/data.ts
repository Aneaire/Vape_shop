import { Models } from "appwrite";

export type IProduct = {
  name: string;
  description?: string;
  sku: string;
  price: number;
  nicotineStrength?: number;
  flavor?: string;
  volume?: number;
  image?: string;
  imageId?: string;
  inventory?: IInventoryDocument;
  categories?: ICategoryDocument[];
};

export type IProductDocument = Models.Document & IProduct;

export type IInventory = {
  quantity: number;
  lowStockThreshold?: number;
  product?: string;
  productId: string;
};

export type IInventoryDocument = Models.Document & IInventory;

export type ICategory = {
  name: string;
  description: string;
  products?: IProductDocument[];
};

export type ICategoryDocument = Models.Document & ICategory;
