import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/suppliers/")({
  component: () => <div>Hello /suppliers/!</div>,
});
