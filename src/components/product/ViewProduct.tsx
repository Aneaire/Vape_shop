import { useGetProduct } from "@/lib/react-query/queries";
import { useDefaultValue } from "@/lib/store";
import { useState } from "react";
import InventoryForm from "../inventory/InventoryForm";
import { Badge } from "../ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";

const ViewProduct = ({
  children,
  id,
  load = false,
}: {
  children: React.ReactNode;
  id: string;
  load: any;
}) => {
  if (!load) return children;
  const name = useDefaultValue((state) => state.description);
  const description = useDefaultValue((state) => state.description);
  const { data: product, isLoading } = useGetProduct(id);
  const [open, setOpen] = useState(load);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild onClick={() => setOpen(true)}>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-scroll w-full">
        <ScrollArea>
          <DialogHeader>
            <DialogTitle className="text-2xl font-pbold">
              {product?.name || name}
            </DialogTitle>
            {product?.sku && (
              <h5 className="opacity-75 font-mbold">#{product.sku}</h5>
            )}
            {product?.image && (
              <img
                src={product.image}
                alt={product.name}
                className="w-full max-h-50 object-cover"
              />
            )}
            <div className="flex gap-2 flex-wrap">
              {product?.price && (
                <Badge className="w-fit text-md bg-green-700 text-white">
                  ₱{product.price}
                </Badge>
              )}
            </div>
            <div className=" text-sm">
              {product?.inventory && (
                <DialogDescription>
                  Total stock price :{" "}
                  {product?.price * product?.inventory?.quantity}
                </DialogDescription>
              )}
              <DialogDescription>Flavor : {product?.flavor}</DialogDescription>
              <DialogDescription>
                Nicotine Strength : {product?.nicotineStrength}
              </DialogDescription>
            </div>
            <Separator />
            <DialogDescription>
              {product?.description || description}
            </DialogDescription>
            <div className="w-full pr-2">
              <h1 className="font-pbold py-2">Inventory Info</h1>
              <InventoryForm
                productId={id}
                existingInventory={!!product?.inventory}
                inventory={product?.inventory}
              />
            </div>
            {/* <div className="w-full pr-2">
              <ManageStock/>
              />
            </div> */}
          </DialogHeader>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default ViewProduct;
