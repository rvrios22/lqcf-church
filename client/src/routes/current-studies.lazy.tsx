import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/current-studies')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/current-studies"!</div>
}
