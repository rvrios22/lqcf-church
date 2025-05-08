import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/prayer')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/prayer"!</div>
}
