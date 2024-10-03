import { Link, Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <main className=" dark">
      <section className="flex bg-background min-h-screen">
        <div className=" p-2 w-1/6 bg-gray-900">
          <Link
            to="/"
            activeProps={{
              className: "font-bold",
            }}
            activeOptions={{ exact: true }}
          >
            Home
          </Link>
        </div>
        <Outlet />
      </section>
      <TanStackRouterDevtools position="bottom-right" />
    </main>
  );
}
