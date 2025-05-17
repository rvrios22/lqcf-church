import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/elders')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/elders"!</div>
}
