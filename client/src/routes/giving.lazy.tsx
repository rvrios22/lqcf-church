import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/giving')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/giving"!</div>
}
