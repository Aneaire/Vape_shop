import { IInventory, IProduct, IProductDocument } from "@/types/data";
import { ID, Query } from "appwrite";
import { config, database, storage } from "./config";

export const addProduct = async (
  product: Omit<IProduct, "image"> & { image?: File | undefined }
) => {
  try {
    let imageUrl;

    if (product.image) {
      const imageUpload = await fileUpload(product.image);
      product.imageId = imageUpload.$id;

      if (!imageUpload) {
        throw new Error("Failed to upload image");
      }

      const imagePreview = await filePreview(imageUpload.$id);
      imageUrl = imagePreview.href;
    }

    const added = await database.createDocument(
      config.databaseId,
      config.productsId,
      ID.unique(),
      {
        name: product.name,
        description: product.description,
        sku: product.sku,
        price: product.price,
        nicotineStrength: product.nicotineStrength,
        flavor: product.flavor,
        volume: product.volume,
        image: imageUrl || null,
        imageId: product.imageId || "",
      }
    );

    if (!added) {
      throw new Error("Failed to add product");
    }

    return added;
  } catch (error) {
    console.log(error);
  }
};

export const getProducts = async () => {
  const response = await database.listDocuments(
    config.databaseId,
    config.productsId,
    [Query.orderDesc("$updatedAt")]
  );

  if (!response) {
    throw new Error("Failed to get products");
  }

  return response.documents;
};

export const getProduct = async (id: string) => {
  const response = await database.getDocument(
    config.databaseId,
    config.productsId,
    id
  );

  if (!response) {
    throw new Error("Failed to get product");
  }

  return response as IProductDocument;
};

export const searchProducts = async (query: string) => {
  const response = await database.listDocuments(
    config.databaseId,
    config.productsId,
    [Query.or([Query.search("name", query), Query.search("sku", query)])]
  );

  if (!response) {
    throw new Error("Failed to search products");
  }

  return response.documents;
};

export const deleteProduct = async (id: string) => {
  const response = await database.deleteDocument(
    config.databaseId,
    config.productsId,
    id
  );

  if (!response) {
    throw new Error("Failed to delete product");
  }

  return response;
};

export const createInventory = async (inventory: IInventory) => {
  const response = await database.createDocument(
    config.databaseId,
    config.inventoryId,
    ID.unique(),
    {
      product: inventory.productId,
      productId: inventory.productId,
      quantity: inventory.quantity,
      lowStockThreshold:
        inventory.lowStockThreshold == 0 ? null : inventory.lowStockThreshold,
    } as IInventory
  );

  if (!response) {
    throw new Error("Failed to create inventory");
  }

  return response;
};

export const updateInventory = async (inventory: IInventory) => {
  const response = await database.updateDocument(
    config.databaseId,
    config.inventoryId,
    inventory.product!,
    {
      quantity: inventory.quantity,
      lowStockThreshold: inventory.lowStockThreshold,
    } as IInventory
  );

  if (!response) {
    throw new Error("Failed to update inventory");
  }

  return response;
};

export const getInventory = async () => {
  const response = await database.listDocuments(
    config.databaseId,
    config.inventoryId
  );

  if (!response) {
    throw new Error("Failed to get inventory");
  }

  return response.documents;
};

export const fileUpload = async (file: File) => {
  const response = await storage.createFile(
    config.productBucketId,
    ID.unique(),
    file
  );
  console.log(response);

  if (!response) {
    throw new Error("Failed to upload Image");
  }

  return response;
};

export const filePreview = async (fileId: string) => {
  const response = await storage.getFilePreview(config.productBucketId, fileId);

  if (!response) {
    throw new Error("Failed to get file preview");
  }

  return response;
};
