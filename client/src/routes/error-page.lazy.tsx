import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/error-page')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/error-page"!</div>
}
