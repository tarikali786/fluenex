import { NavLink } from 'react-router-dom'
import { Home, BookOpen, FileText, Star, Settings } from 'lucide-react'

const tabs = [
  { to: '/', icon: Home, label: 'Home' },
  { to: '/challenge', icon: BookOpen, label: 'Challenge' },
  { to: '/custom', icon: FileText, label: 'Reader' },
  { to: '/vocabulary', icon: Star, label: 'Vocabulary' },
  { to: '/settings', icon: Settings, label: 'Settings' },
]

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 safe-bottom"
      style={{ background: 'var(--bg-t95)', backdropFilter: 'blur(16px)', borderTop: '1px solid var(--border)' }}>
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto px-2">
        {tabs.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center gap-0.5 flex-1 py-2 rounded-xl transition-all duration-200 ${
                isActive ? 'text-accent-light' : 'text-muted'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <div className={`p-1.5 rounded-xl transition-all duration-200 ${isActive ? 'bg-accent-dim' : ''}`}>
                  <Icon size={20} strokeWidth={isActive ? 2.5 : 1.8} />
                </div>
                <span className="text-[10px] font-medium leading-none">{label}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
