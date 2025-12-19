import { useNavigate } from '@tanstack/solid-router'

interface BottomNavProps {
  activeTab?: 'home' | 'game' | 'account'
}

export function BottomNav(props: BottomNavProps) {
  const navigate = useNavigate()

  const iconColor = (tab: 'home' | 'game' | 'account') =>
    props.activeTab === tab ? '#B8DFFF' : '#4C6477'

  return (
    <nav class="h-16 w-full shrink-0 py-2">
      <div class="flex w-full mx-auto h-full items-center justify-between px-10">
        <button
          class="hover:opacity-80 transition-opacity"
          onClick={() => navigate({ to: '/' })}
        >
          <svg viewBox="0 0 24 24" width="36" height="36" fill={iconColor('home')}>
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
          </svg>
        </button>
        <button
          class="hover:opacity-80 transition-opacity"
          onClick={() => navigate({ to: '/games' })}
        >
          <svg viewBox="0 0 24 24" width="36" height="36" fill={iconColor('game')}>
            <path d="M21 6H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-10 7H8v3H6v-3H3v-2h3V8h2v3h3v2zm4.5 2c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm4-3c-.83 0-1.5-.67-1.5-1.5S18.67 9 19.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
          </svg>
        </button>
        <button
          class="hover:opacity-80 transition-opacity"
          onClick={() => {}}
        >
          <svg viewBox="0 0 24 24" width="36" height="36" fill={iconColor('account')}>
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
          </svg>
        </button>
      </div>
    </nav>
  )
}
