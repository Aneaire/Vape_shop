import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useAddProduct } from "@/lib/react-query/mutation";
import { useProductList } from "@/lib/store";
import { IProductDocument } from "@/types/data";
import { productSchema } from "@/validator/product";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";

const AddProduct = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  const addProductToList = useProductList((state) => state.addProduct);
  const products = useProductList((state) => state.products);
  const skuValue = useRef<string>(
    `P${Math.floor(100000 + Math.random() * 900000)}`
  );

  const { mutateAsync: addProduct, data: product } = useAddProduct();

  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "Vanilla Custard Vape",
      description: "Vanilla Custard",
      sku: skuValue.current,
      price: 250,
      nicotineStrength: 2,
      flavor: "Vanilla ",
      volume: 0,
      image: undefined,
    },
  });

  async function onSubmit(values: z.infer<typeof productSchema>) {
    toast("Adding product...");
    console.log(values);
    await addProduct(values)
      .then((data) => {
        form.reset();
        setOpen(false);
        console.log("data", data);
        console.log("products", products);
        addProductToList(data as IProductDocument);
        toast.success("Product added successfully");
      })
      .catch(console.error);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild onClick={() => setOpen(true)}>
        {children}
      </DialogTrigger>
      <DialogContent className=" ">
        <DialogHeader>
          <DialogTitle>Add Product</DialogTitle>
          <DialogDescription>
            Adding a new product will help you keep track of your inventory.
            Click add to continue.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            {/* FIELDS */}
            <section className="grid grid-cols-2 gap-5">
              <div className="space-y-3">
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Image to upload</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            console.log(file);
                            if (file) {
                              field.onChange(file);
                            }
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Strawberries" {...field} />
                      </FormControl>
                      <FormDescription>
                        This is your product name.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product Description</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="A sweet and juicy strawberry flavor"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="1000" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-3">
                <FormField
                  control={form.control}
                  name="flavor"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Flavor</FormLabel>
                      <FormControl>
                        <Input placeholder="Strawberry" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="nicotineStrength"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nicotine Strength</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="" {...field} />
                      </FormControl>
                      <FormDescription>In mg of Nicotine</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="sku"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Stock Keeping Unit (SKU)</FormLabel>
                      <FormControl>
                        <Input disabled {...field} />
                      </FormControl>
                      <FormDescription>
                        This will be use to find the product
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </section>

            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddProduct;
