import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/events')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/events"!</div>
}
