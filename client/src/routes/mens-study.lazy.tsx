import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/mens-study')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/mens-study"!</div>
}
