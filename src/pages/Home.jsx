import { useNavigate } from 'react-router-dom'
import { BookOpen, FileText, Zap, Star, Settings, GraduationCap, ChevronRight } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { CATEGORIES } from '../data/categories'
import { GRAMMAR_CATEGORIES, getTensesByCategory } from '../data/grammarContent'
import logo from '../assets/logo.png'

const features = [
  { icon: BookOpen,      title: 'Reading Challenge', desc: '40-day fluency program',  route: '/challenge',  color: '#7c3aed', bg: 'rgba(124,58,237,0.12)' },
  { icon: GraduationCap, title: 'Grammar',           desc: 'Learn all 12 tenses',     route: '/grammar',    color: '#e11d48', bg: 'rgba(225,29,72,0.12)'  },
  { icon: FileText,      title: 'Custom Reader',     desc: 'Paste any content',       route: '/custom',     color: '#0891b2', bg: 'rgba(8,145,178,0.12)'  },
  { icon: Zap,           title: 'WPM Challenge',     desc: 'Improve reading speed',   route: '/wpm',        color: '#f59e0b', bg: 'rgba(245,158,11,0.12)' },
  { icon: Star,          title: 'Vocabulary',        desc: 'Your saved words',        route: '/vocabulary', color: '#059669', bg: 'rgba(5,150,105,0.12)'  },
  { icon: Settings,      title: 'Settings',          desc: 'Customize your app',      route: '/settings',   color: '#8b8ba8', bg: 'rgba(139,139,168,0.12)'},
]

export default function Home() {
  const navigate = useNavigate()
  const { progress, vocabulary, achievements, getCategoryProgress } = useApp()

  const totalDays = CATEGORIES.reduce((sum, cat) => sum + getCategoryProgress(cat.id).completed, 0)
  const bestWpm = achievements.length > 0 ? Math.max(...achievements.map(a => a.wpm || 0)) : null

  const currentCat = CATEGORIES.find(c => c.id === progress.currentCategory) || CATEGORIES[0]
  const catProgress = getCategoryProgress(progress.currentCategory)
  const hasProgress = catProgress.completed > 0

  return (
    <div className="px-4 pt-14 pb-6 max-w-lg mx-auto">
      {/* Logo */}
      <div className="mb-6">
        <img src={logo} alt="Fluenex" className="h-12 w-auto" />
      </div>

      {/* Stats row */}
      {(totalDays > 0 || vocabulary.length > 0 || bestWpm) && (
        <div className="flex rounded-2xl border mb-5 overflow-hidden" style={{ background: 'var(--card)', borderColor: 'var(--border)' }}>
          {[
            { label: 'Days Done',   value: totalDays,        show: totalDays > 0      },
            { label: 'Words Saved', value: vocabulary.length, show: vocabulary.length > 0 },
            { label: 'Best WPM',   value: bestWpm,          show: !!bestWpm          },
          ]
            .filter(s => s.show)
            .map((stat, idx, arr) => (
              <div
                key={stat.label}
                className="flex-1 flex flex-col items-center py-3"
                style={{ borderRight: idx < arr.length - 1 ? '1px solid var(--border)' : 'none' }}
              >
                <span className="text-xl font-bold tabular-nums" style={{ color: '#a78bfa' }}>{stat.value}</span>
                <span className="text-xs mt-0.5" style={{ color: 'var(--text3)' }}>{stat.label}</span>
              </div>
            ))}
        </div>
      )}

      {/* Current challenge progress */}
      {hasProgress && (
        <div className="mb-5 rounded-2xl p-4 border" style={{ background: 'var(--card)', borderColor: 'var(--border)' }}>
          <div className="flex items-start justify-between mb-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text3)' }}>
                Current Challenge
              </p>
              <p className="font-semibold mt-0.5" style={{ color: 'var(--text)' }}>{currentCat.name}</p>
            </div>
            <div className="text-right">
              <span className="text-2xl font-bold" style={{ color: '#a78bfa' }}>{catProgress.completed}</span>
              <span className="text-sm" style={{ color: 'var(--text3)' }}>/40</span>
            </div>
          </div>
          <div className="h-1.5 rounded-full" style={{ background: 'var(--border)' }}>
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{ width: `${catProgress.percentage}%`, background: '#7c3aed' }}
            />
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-xs" style={{ color: 'var(--text3)' }}>Day {progress.currentDay}</span>
            <span className="text-xs" style={{ color: 'var(--text3)' }}>{catProgress.percentage}% complete</span>
          </div>
        </div>
      )}

      {/* WPM achievement badges */}
      {achievements.length > 0 && (
        <div className="flex gap-2 mb-5 overflow-x-auto pb-1">
          {achievements.map(a => (
            <div key={a.id} className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl border"
              style={{ background: 'var(--card)', borderColor: 'var(--border)' }}>
              <span>{a.icon}</span>
              <span className="text-xs font-semibold tabular-nums" style={{ color: '#a78bfa' }}>{a.wpm} WPM</span>
            </div>
          ))}
        </div>
      )}

      {/* Grammar / Tenses section */}
      <div className="mb-5">
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-semibold" style={{ color: 'var(--text)' }}>Tenses</p>
          <button onClick={() => navigate('/grammar')} className="flex items-center gap-0.5 text-xs" style={{ color: '#a78bfa' }}>
            View all <ChevronRight size={14} />
          </button>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {GRAMMAR_CATEGORIES.map(cat => {
            const tenses = getTensesByCategory(cat.id)
            return tenses.map(t => (
              <button
                key={t.id}
                onClick={() => navigate(`/grammar/${t.id}`)}
                className="flex-shrink-0 flex items-center gap-2 px-3 py-2.5 rounded-xl border transition-all active:scale-95"
                style={{ background: 'var(--card)', borderColor: 'var(--border)' }}
              >
                <span className="text-lg">{t.icon}</span>
                <span className="text-xs font-medium whitespace-nowrap" style={{ color: 'var(--text)' }}>{t.title}</span>
              </button>
            ))
          })}
        </div>
      </div>

      {/* Feature grid */}
      <div className="grid grid-cols-2 gap-3">
        {features.map(({ icon: Icon, title, desc, route, color, bg }) => (
          <button
            key={route}
            onClick={() => navigate(route)}
            className="flex flex-col items-start p-4 rounded-2xl border text-left transition-all active:scale-95"
            style={{ background: 'var(--card)', borderColor: 'var(--border)' }}
          >
            <div className="p-2.5 rounded-xl mb-3" style={{ background: bg }}>
              <Icon size={20} style={{ color }} />
            </div>
            <p className="text-sm font-semibold leading-tight" style={{ color: 'var(--text)' }}>{title}</p>
            <p className="text-xs mt-1" style={{ color: 'var(--text3)' }}>{desc}</p>
          </button>
        ))}
      </div>
    </div>
  )
}
