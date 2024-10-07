import AddCategory from "@/components/category/AddCategory";
import CategoryList from "@/components/category/CategoryList";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useCategoriesStore } from "@/lib/store";
import autoAnimate from "@formkit/auto-animate";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { MdCategory, MdDownloading } from "react-icons/md";

export const Route = createFileRoute("/categories/")({
  component: () => {
    const loading = useCategoriesStore((state) => state.loading);
    const parent = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (parent.current) {
        autoAnimate(parent.current, {
          duration: 300,
          easing: "ease-in-out",
        });
      }
    }, [parent]);

    return (
      <div className="container font-pregular h-full max-h-screen">
        <div className="flex flex-col h-full">
          <div className=" flex flex-col">
            <span className=" main-title-wrapper main-title h-full">
              <h1>Categories</h1>
              <MdCategory />
            </span>
            <p className="mt-4 max-w-5xl">
              Categories will help you to sort things out, and better keep track
              of your products. You can create categories for different product
              types, and assign products to them. This way, you can easily find
              the products you need, and get a better overview of your
              inventory.
            </p>
            <div className=" w-full mb-5">
              <AddCategory />
            </div>
          </div>

          <ScrollArea className="flex-1 w-full rounded-md border">
            {false && (
              <div className=" w-full h-full flex-center">
                <MdDownloading className="animate-bounce text-8xl" />
              </div>
            )}
            <div
              ref={parent}
              className={`${loading && "hidden"} p-5 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4`}
            >
              {/* {query ? <SearchList /> : <ProductList />} */}
              <CategoryList />
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
      </div>
    );
  },
});
