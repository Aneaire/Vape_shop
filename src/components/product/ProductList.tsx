import ProductCard from "@/components/product/ProductCard";
import { useGetProducts } from "@/lib/react-query/queries";
import { useProductList } from "@/lib/store";
import { IProductDocument } from "@/types/data";
import { useEffect } from "react";

const ProductList = () => {
  const setProducts = useProductList((state) => state.setProducts);
  const products = useProductList((state) => state.products);
  const setLoading = useProductList((state) => state.setLoading);
  const { data, isLoading, isSuccess } = useGetProducts();

  useEffect(() => {
    setProducts(data as IProductDocument[]);
    setLoading(isLoading);
  }, [data, setProducts, isSuccess, isLoading]);

  return (
    <>
      {isLoading
        ? null
        : products && products?.length > 0
          ? products?.map((product) => (
              <ProductCard key={product.$id} product={product} />
            ))
          : "No Products Found"}
    </>
  );
};

export default ProductList;
