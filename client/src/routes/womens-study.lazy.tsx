import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/womens-study')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/womens-study"!</div>
}
