import { Button } from "@/components/ui/button";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

function HomeComponent() {
  return (
    <div className=" p-5">
      <h3 className="text-2xl">Welcome Home!</h3>
      <Button>Henlo</Button>
    </div>
  );
}
