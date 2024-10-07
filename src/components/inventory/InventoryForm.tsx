import {
  useCreateInventory,
  useUpdateInventory,
} from "@/lib/react-query/mutation";
import { useGetProducts } from "@/lib/react-query/queries";
import { IInventoryDocument } from "@/types/data";
import { inventorySchema } from "@/validator/product";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

const InventoryForm = ({
  existingInventory,
  productId,
  inventory,
}: {
  existingInventory: boolean;
  productId?: string;
  inventory?: IInventoryDocument;
}) => {
  const [attemptToUpdate, setAttemptToUpdate] = useState(false);

  const { refetch: refreshList } = useGetProducts();
  const { mutateAsync: createInventory } = useCreateInventory(productId!);
  const { mutateAsync: updateInventory } = useUpdateInventory(productId!);

  const form = useForm<z.infer<typeof inventorySchema>>({
    resolver: zodResolver(inventorySchema),
    defaultValues: {
      productId: productId,
      quantity: inventory?.quantity || 0,
      lowStockThreshold: inventory?.lowStockThreshold || 0,
    },
  });

  async function onSubmit(data: z.infer<typeof inventorySchema>) {
    if (existingInventory) {
      setAttemptToUpdate(true);
      updateInventory({ ...data, product: inventory?.$id })
        .then((data) => {
          form.reset();
          refreshList();
        })
        .catch(console.error);
      return;
    }

    setAttemptToUpdate(false);
    createInventory(data)
      .then((data) => {
        form.reset();
        refreshList();
      })
      .catch(console.error);
    return;
  }

  // rerender if inventory change
  const prevInventory = React.useRef<IInventoryDocument | undefined>(undefined);
  React.useEffect(() => {
    if (prevInventory.current !== inventory) {
      form.reset({
        productId: productId,
        quantity: inventory?.quantity || 0,
        lowStockThreshold: inventory?.lowStockThreshold || 0,
      });
      prevInventory.current = inventory;
    }
  }, [form, inventory, prevInventory, productId]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className=" w-full flex gap-4 items-center pb-2"
      >
        {/* FIELDS */}
        <div className=" flex gap-2">
          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantity</FormLabel>
                <FormControl>
                  <Input
                    className="ml-[1px]"
                    disabled={!attemptToUpdate}
                    type="number"
                    placeholder="Type the amount"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lowStockThreshold"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Low Stock Threshold</FormLabel>
                <FormControl>
                  <Input
                    className={
                      Number(form?.getValues("quantity")) <=
                      Number(form?.getValues("lowStockThreshold")!)
                        ? "focus-visible:ring-red-500"
                        : ""
                    }
                    disabled={!attemptToUpdate}
                    type="number"
                    placeholder="Type the limit here"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* BUTTONS */}
        <Button
          onClick={() => setAttemptToUpdate(!attemptToUpdate)}
          type={!attemptToUpdate ? "submit" : "button"}
          className="flex-1 mt-auto"
        >
          {attemptToUpdate ? "Update" : "Edit"}
        </Button>
      </form>
    </Form>
  );
};

export default InventoryForm;
