import { useState } from 'react'
import { Search, Trash2, Star } from 'lucide-react'
import { useApp } from '../context/AppContext'

export default function Vocabulary() {
  const { vocabulary, deleteWord, clearVocabulary, showToast } = useApp()
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('latest')

  const filtered = vocabulary
    .filter(v => v.word.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => sort === 'alpha' ? a.word.localeCompare(b.word) : new Date(b.date) - new Date(a.date))

  function handleClearAll() {
    if (window.confirm('Clear all saved vocabulary? This cannot be undone.')) {
      clearVocabulary()
      showToast('Vocabulary cleared.')
    }
  }

  function formatDate(iso) {
    return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  return (
    <div className="px-4 pt-14 pb-6 max-w-lg mx-auto">
      <div className="flex items-start justify-between mb-5">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: 'var(--text)' }}>Vocabulary</h1>
          <p className="text-sm mt-0.5" style={{ color: 'var(--text2)' }}>
            {vocabulary.length} saved {vocabulary.length === 1 ? 'word' : 'words'}
          </p>
        </div>
        {vocabulary.length > 0 && (
          <button onClick={handleClearAll} className="text-xs font-medium mt-1" style={{ color: '#ef4444' }}>
            Clear All
          </button>
        )}
      </div>

      {vocabulary.length > 0 && (
        <>
          <div className="relative mb-3">
            <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: 'var(--text3)' }} />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search words..."
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border text-sm focus:outline-none"
              style={{ background: 'var(--card)', borderColor: 'var(--border)', color: 'var(--text)', caretColor: '#a78bfa' }}
              onFocus={e => (e.target.style.borderColor = '#7c3aed55')}
              onBlur={e => (e.target.style.borderColor = 'var(--border)')}
            />
          </div>

          <div className="flex gap-2 mb-5">
            {[['latest', 'Latest'], ['alpha', 'A–Z']].map(([val, label]) => (
              <button
                key={val}
                onClick={() => setSort(val)}
                className="px-3 py-1.5 rounded-xl text-xs font-medium border transition-all"
                style={{
                  background: sort === val ? 'rgba(124,58,237,0.15)' : 'var(--card)',
                  borderColor: sort === val ? 'rgba(124,58,237,0.4)' : 'var(--border)',
                  color: sort === val ? '#a78bfa' : 'var(--text2)',
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </>
      )}

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <Star size={44} style={{ color: 'var(--border)', marginBottom: '12px' }} />
          <p className="text-sm font-medium" style={{ color: 'var(--text2)' }}>
            {vocabulary.length === 0 ? 'No vocabulary saved yet.' : 'No words match your search.'}
          </p>
          {vocabulary.length === 0 && (
            <p className="text-xs mt-2" style={{ color: 'var(--text3)' }}>
              Select a word while reading to save it here.
            </p>
          )}
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map(item => (
            <div
              key={item.id}
              className="flex items-center gap-3 px-4 py-3 rounded-xl border"
              style={{ background: 'var(--card)', borderColor: 'var(--border)' }}
            >
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold" style={{ color: 'var(--text)' }}>{item.word}</p>
                {item.hindiMeaning && (
                  <p className="text-xs mt-0.5 font-medium" style={{ color: '#a78bfa' }}>{item.hindiMeaning}</p>
                )}
                <p className="text-xs mt-0.5" style={{ color: 'var(--text3)' }}>
                  {item.category} · {formatDate(item.date)}
                </p>
              </div>
              <button
                onClick={() => deleteWord(item.id)}
                className="p-1.5 rounded-lg transition-colors"
                style={{ color: 'var(--text3)' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#ef4444')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--text3)')}
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
