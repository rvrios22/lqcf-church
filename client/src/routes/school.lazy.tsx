import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/school')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/school"!</div>
}
