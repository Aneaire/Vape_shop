import { Account, Client, Databases, Storage } from "appwrite";

export const config = {
  projectId: process.env.VITE_PROJECT_ID!,
  url: process.env.VITE_URL!,
  databaseId: process.env.VITE_DATABASE_ID!,
  productsId: process.env.VITE_PRODUCTS_ID!,
  categoriesId: process.env.VITE_CATEGORIES_ID!,
  brandsId: process.env.VITE_BRANDS_ID!,
  inventoryId: process.env.VITE_INVENTORY_ID!,
  suppliersId: process.env.VITE_SUPPLIERS_ID!,
  salesId: process.env.VITE_SALES_ID!,

  // Buckets
  productBucketId: process.env.VITE_PRODUCT_STORAGE!,
};

export const client = new Client();

client.setEndpoint(config.url).setProject(config.projectId); // Replace with your project ID

export const account = new Account(client);
export const database = new Databases(client);
export const storage = new Storage(client);

export { ID } from "appwrite";
