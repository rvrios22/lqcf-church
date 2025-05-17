import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/error-page')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/error-page"!</div>
}
