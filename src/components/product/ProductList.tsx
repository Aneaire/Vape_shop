import ProductCard from "@/components/product/ProductCard";
import { useGetProducts } from "@/lib/react-query/queries";
import { useProductList } from "@/lib/store";
import { IProductDocument } from "@/types/data";
import { useEffect } from "react";

const ProductList = ({
  productsForCategory,
  page,
}: {
  productsForCategory?: IProductDocument[];
  page: "products list" | "category";
}) => {
  const setProducts = useProductList((state) => state.setProducts);
  const products = useProductList((state) => state.products);
  const setLoading = useProductList((state) => state.setLoading);
  const { data, isLoading, isSuccess } = useGetProducts(
    page === "products list"
  );

  useEffect(() => {
    setProducts(data as IProductDocument[]);
    setLoading(isLoading);
  }, [data, setProducts, isSuccess, isLoading]);

  return (
    <>
      {page === "products list" && (
        <>
          {isLoading
            ? null
            : products && products?.length > 0
              ? products?.map((product) => (
                  <ProductCard
                    page="products list"
                    key={product.$id}
                    product={product}
                  />
                ))
              : "No Products Found"}
        </>
      )}
      {page === "category" && (
        <>
          {productsForCategory && productsForCategory?.length > 0
            ? productsForCategory?.map((product) => (
                <ProductCard
                  page="category"
                  key={product.$id}
                  product={product}
                />
              ))
            : "No Products Found"}
        </>
      )}
    </>
  );
};

export default ProductList;
