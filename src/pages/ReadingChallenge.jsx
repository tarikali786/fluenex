import { useNavigate } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { CATEGORIES } from '../data/categories'

export default function ReadingChallenge() {
  const navigate = useNavigate()
  const { getCategoryProgress } = useApp()

  return (
    <div className="px-4 pt-14 pb-6 max-w-lg mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold" style={{ color: 'var(--text)' }}>Reading Challenge</h1>
        <p className="text-sm mt-1" style={{ color: 'var(--text2)' }}>40-day structured fluency program</p>
      </div>

      <div className="space-y-3">
        {CATEGORIES.map(cat => {
          const prog = getCategoryProgress(cat.id)
          return (
            <button
              key={cat.id}
              onClick={() => navigate(`/challenge/${cat.id}`)}
              className="w-full flex items-center gap-4 p-4 rounded-2xl border text-left transition-all active:scale-[0.98]"
              style={{ background: 'var(--card)', borderColor: 'var(--border)' }}
            >
              <span className="text-3xl flex-shrink-0">{cat.icon}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold" style={{ color: 'var(--text)' }}>{cat.name}</p>
                <p className="text-xs mt-0.5 truncate" style={{ color: 'var(--text3)' }}>{cat.description}</p>
                <div className="mt-2.5 h-1 rounded-full" style={{ background: 'var(--border)' }}>
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${prog.percentage}%`, background: cat.color }}
                  />
                </div>
              </div>
              <div className="flex flex-col items-end flex-shrink-0 gap-1">
                <span className="text-xs font-medium" style={{ color: 'var(--text2)' }}>{prog.completed}/40</span>
                <ChevronRight size={16} style={{ color: 'var(--text3)' }} />
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
