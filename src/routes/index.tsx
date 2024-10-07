import EventCards from "@/components/product/AddingTest";
import { createFileRoute } from "@tanstack/react-router";
import { MdDashboard } from "react-icons/md";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

function HomeComponent() {
  return (
    <div className="container font-pregular">
      <span className=" main-title-wrapper main-title">
        <h1>Dashboard</h1>
        <MdDashboard />
      </span>
      <div>
        <EventCards />
      </div>
    </div>
  );
}
