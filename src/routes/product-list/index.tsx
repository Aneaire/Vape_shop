import Search from "@/components/common/Search";
import AddProduct from "@/components/product/AddProduct";
import ProductList from "@/components/product/ProductList";
import SearchList from "@/components/product/SearchList";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useProductList } from "@/lib/store";
import autoAnimate from "@formkit/auto-animate";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { MdAdd, MdDownloading, MdFilterDrama } from "react-icons/md";

export const Route = createFileRoute("/product-list/")({
  component: () => {
    const parent = useRef<HTMLDivElement>(null);
    const query = useProductList((state) => state.query);
    const loading = useProductList((state) => state.loading);

    useEffect(() => {
      if (parent.current) {
        autoAnimate(parent.current, {
          duration: 300,
          easing: "ease-in-out",
        });
      }
    }, [parent]);

    return (
      <div className="container h-full max-h-screen ">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex justify-between">
            <div>
              <span className=" main-title-wrapper main-title">
                <h1>Product List</h1> <MdFilterDrama />
              </span>
              <AddProduct>
                <Button className=" font-mregular flex-center gap-2 mt-5">
                  Add Product <MdAdd />
                </Button>
              </AddProduct>
            </div>

            {/* Search */}
            <Search placeholder="Search Products" />
          </div>

          <ScrollArea className=" flex-1 mt-10 w-full rounded-md border ">
            {loading && (
              <div className=" w-full h-full flex-center">
                <MdDownloading className="animate-bounce text-8xl" />
              </div>
            )}
            <div
              ref={parent}
              className={`${loading && "hidden"} p-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4`}
            >
              {query ? <SearchList /> : <ProductList />}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
      </div>
    );
  },
});
