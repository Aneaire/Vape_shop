import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/product-detail/')({
  component: () => <div>Hello /product-detail/!</div>,
})
