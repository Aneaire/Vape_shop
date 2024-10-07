import { useSearchProducts } from "@/lib/react-query/queries";
import { useProductList } from "@/lib/store";
import { useEffect } from "react";
import ProductCard from "./ProductCard";

const SearchList = () => {
  const query = useProductList((state) => state.query);
  const setLoading = useProductList((state) => state.setLoading);
  const { data: products, isLoading } = useSearchProducts(query);

  useEffect(() => {
    if (isLoading) setLoading(false);
  }, [isLoading]);

  return (
    <>
      {isLoading ? (
        <p className="text-center mt-10">Loading...</p>
      ) : products && products?.length > 0 ? (
        products?.map((product: any) => (
          <ProductCard key={product.$id} product={product} />
        ))
      ) : (
        "No Products Found"
      )}
    </>
  );
};

export default SearchList;
