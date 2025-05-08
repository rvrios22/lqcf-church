import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/prayer-chain')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/prayer-chain"!</div>
}
