import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/beliefs')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/beliefs"!</div>
}
