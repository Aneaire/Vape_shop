import imageVape from "@/assets/images/vape.jpg";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Link, Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const queryClient = new QueryClient();

  return (
    <main className="dark">
      <QueryClientProvider client={queryClient}>
        <ResizablePanelGroup
          direction="horizontal"
          className="flex bg-background h-screen"
        >
          <ResizablePanel
            defaultSize={20}
            className="p-2 min-w-[300px] max-w-[500px] bg-gray-900 text-white overflow-y-scroll min-h-screen"
          >
            {/* Make this div sticky on top */}
            <div className="w-full top-0">
              {/* Image */}
              <img className="rounded-xl" src={imageVape} alt="Vape Shop" />

              {/* Links */}
              <div className="flex flex-col gap-2 w-full mt-20">
                <Link
                  to="/"
                  className="main-link"
                  activeProps={{
                    className: "main-link-active",
                  }}
                  activeOptions={{ exact: true }}
                >
                  Dashboard
                </Link>
                <Link
                  to="/product-list"
                  className="main-link"
                  activeProps={{
                    className: "main-link-active",
                  }}
                >
                  Product List
                </Link>
                <Link
                  to="/categories"
                  className="main-link"
                  activeProps={{
                    className: "main-link-active",
                  }}
                >
                  Categories
                </Link>
                <Link
                  to="/suppliers"
                  className="main-link"
                  activeProps={{
                    className: "main-link-active",
                  }}
                >
                  Suppliers
                </Link>
              </div>
            </div>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel className="overflow-y-scroll">
            <Outlet />
          </ResizablePanel>
        </ResizablePanelGroup>
        <Toaster />
        <TanStackRouterDevtools position="bottom-right" />
      </QueryClientProvider>
    </main>
  );
}
