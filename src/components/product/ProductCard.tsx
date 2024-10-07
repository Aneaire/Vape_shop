import { useDeleteProduct } from "@/lib/react-query/mutation";
import { useProductList } from "@/lib/store";
import { IProductDocument } from "@/types/data";
import { useState } from "react";
import { MdProductionQuantityLimits, MdShoppingCart } from "react-icons/md";
import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";
import ViewProduct from "./ViewProduct";

const ProductCard = ({
  product,
  page,
}: {
  product: IProductDocument;
  page: "products list" | "category";
}) => {
  const [open, setOpen] = useState(false);
  const generalDescription =
    "A product is an item or service designed to meet the needs or desires of consumers. It can be physical, like clothing or electronics, or intangible, such as software or consulting services. Products are created to provide value by solving problems or enhancing the customer's experience.";
  const removeProduct = useProductList((state) => state.removeProduct);
  const { mutate } = useDeleteProduct();
  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      removeProduct(product.$id);
      mutate(product.$id);
    }
  };
  return (
    <ViewProduct
      key={`${product.$id}-${open}`}
      sku={page === "category" ? product.sku : undefined}
      load={open}
      id={product.$id}
    >
      <Card
        onClick={() => setOpen(true)}
        className="w-48 overflow-hidden z-10 flex flex-col cursor-pointer"
      >
        <div className="relative">
          <img
            className="w-full h-32 object-cover"
            src={product.image}
            alt="asd"
          />
          <Badge className="absolute top-1 right-1 text-xs bg-primary text-primary-foreground">
            ₱{product.price}
          </Badge>
        </div>
        <CardContent className="p-2 flex-1 flex flex-col">
          <h3 className="text-sm font-semibold mb-1 line-clamp-1">
            {product.name}
          </h3>
          <div className="flex justify-between items-center mb-1">
            <p className="text-xs text-muted-foreground">SKU: {product.sku}</p>
            <div className="flex items-center gap-1">
              <MdProductionQuantityLimits
                size={12}
                className="text-muted-foreground"
              />
              <p className="text-xs font-medium">
                {product.inventory?.quantity ?? "N/A"}
              </p>
            </div>
          </div>
          <p className="text-xs line-clamp-2 mb-2">
            {product.description ? product.description : generalDescription}
          </p>
          <div className="mt-auto">
            <button className="mt-auto w-full py-1 px-2 bg-primary text-primary-foreground text-xs rounded-sm flex items-center justify-center gap-1 hover:bg-primary/90 transition-colors">
              <MdShoppingCart size={12} />
              View Stock
            </button>
          </div>
        </CardContent>
      </Card>
    </ViewProduct>
  );
};

export default ProductCard;
