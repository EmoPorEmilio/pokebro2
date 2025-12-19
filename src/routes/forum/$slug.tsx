import { createFileRoute, Outlet } from '@tanstack/solid-router'

export const Route = createFileRoute('/forum/$slug')({
  component: ForumLayout,
})

function ForumLayout() {
  return <Outlet />
}
