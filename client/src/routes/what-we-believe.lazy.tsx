import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/what-we-believe')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/what-we-believe"!</div>
}
