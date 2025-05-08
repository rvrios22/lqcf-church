import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/identity-youth')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/identity-youth"!</div>
}
