import { useNavigate } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { GRAMMAR_CATEGORIES, getTensesByCategory } from '../data/grammarContent'

export default function GrammarHome() {
  const navigate = useNavigate()

  return (
    <div className="px-4 pt-14 pb-6 max-w-lg mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold" style={{ color: 'var(--text)' }}>Grammar</h1>
        <p className="text-sm mt-1" style={{ color: 'var(--text2)' }}>Master all 12 English tenses with rules and practice</p>
      </div>

      <div className="space-y-5">
        {GRAMMAR_CATEGORIES.map(cat => {
          const tenses = getTensesByCategory(cat.id)
          return (
            <div key={cat.id}>
              <h2
                className="text-xs font-semibold uppercase tracking-wider mb-2 px-1"
                style={{ color: cat.color }}
              >
                {cat.label}
              </h2>
              <div className="space-y-2">
                {tenses.map(tense => (
                  <button
                    key={tense.id}
                    onClick={() => navigate(`/grammar/${tense.id}`)}
                    className="w-full flex items-center gap-3 p-3.5 rounded-xl border text-left transition-all active:scale-[0.98]"
                    style={{ background: 'var(--card)', borderColor: 'var(--border)' }}
                  >
                    <span className="text-2xl flex-shrink-0">{tense.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold" style={{ color: 'var(--text)' }}>{tense.title}</p>
                      <p className="text-xs mt-0.5 truncate" style={{ color: 'var(--text3)' }}>{tense.definition}</p>
                    </div>
                    <ChevronRight size={16} className="flex-shrink-0" style={{ color: 'var(--text3)' }} />
                  </button>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
